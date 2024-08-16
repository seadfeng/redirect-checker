import { ResponseInfo } from '@/types';
import type { NextRequest } from 'next/server';
import z from 'zod';

export const runtime = 'edge'; // Specifies that this function will run in a serverless edge environment

// Define a schema for the request body using Zod for validation
const BodySchema = z.object({
  url: z.string().url(), // 'url' must be a valid URL string
  headers: z.record(z.string()).optional() // 'headers' is an optional object with string keys and string values
});

/**
 * Fetches a URL and returns detailed information about the response.
 *
 * @param {Object} param0 - An object containing the URL to fetch and optional headers.
 * @param {string} param0.url - The URL to fetch.
 * @param {Headers} [param0.headers] - Optional headers to include in the request.
 * @returns {Promise<ResponseInfo>} - A promise that resolves to an object containing response information.
 */
const fetchUrl = async ({ url, headers }: { url: string, headers?: Headers }): Promise<ResponseInfo> => {
  const startTime = Date.now(); // Record the start time for calculating the request duration
  const newUrl = new URL(url); // Create a URL object to extract the host
  let metaRefresh = false;

  // Perform the fetch request with optional headers and no automatic redirection
  const response = await fetch(url, {
    method: "GET",
    redirect: "manual", // Do not follow redirects automatically
    headers
  });

  // Calculate the duration of the fetch request
  const duration = ((Date.now() - startTime) / 1000).toFixed(3);

  let location: string | null;

  if ([301, 302].includes(response.status)) {
    location = response.headers.get('location'); // Get the 'location' header if a redirect is indicated
  } else {
    const body = await response.text();
    const match1 = body.match(/<meta[^>]*?http-equiv=["']refresh["'][^>]*?content=["']\d*;\s*url=([^"']*)["'][^>]*?>/)
    if (match1 && match1[1]) {
      location = match1[1];
      metaRefresh = true;
    } else {
      const match2 = body.match(/<meta[^>]*?content=["']\d*;\s*url=([^"']*)["'][^>]*?http-equiv=["']refresh["'][^>]*?>/);
      if (match2 && match2[1]) {
        location = match2[2];
        metaRefresh = true;
      } else {
        location = null;
      }
    }
  }

  // Return an object containing the details of the response
  return {
    url: url,
    host: newUrl.host,
    status: response.status,
    statusText: response.statusText,
    duration: `${duration} s`,
    metaRefresh,
    location // May be null if there is no redirect
  };
};

/**
 * Handles POST requests by accepting JSON data, validating it, and performing a fetch operation.
 * 
 * The request body should contain a JSON object with the following structure:
 * {
 *   url: string; // The URL to fetch
 *   headers?: Record<string, string> // Optional headers to include in the request
 * }
 * 
 * The function will handle redirects up to 10 times, returning an array of response information objects.
 * 
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<Response>} - A promise that resolves to a response containing the fetch results as JSON.
 */
export async function POST(request: NextRequest) {
  let url: string;
  let headers: Headers | undefined;

  try {
    // Parse and validate the request body using the Zod schema
    const jsonData = await request.json();
    url = BodySchema.parse(jsonData).url;
    headers = BodySchema.parse(jsonData).headers as Headers | undefined;
  } catch (error: any) {
    // If validation fails, return a 400 Bad Request response with an error message
    return new Response(JSON.stringify({ error: { message: error.message } }, null, 2), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }

  let process = true; // Flag to control the loop for handling redirects
  let data: ResponseInfo[] = []; // Array to store response details

  // Initialize headers, merging any provided headers with the original request headers
  headers = new Headers(headers || request.headers);
  headers.delete('Content-Length'); // Remove 'Content-Length' header to avoid potential issues

  const maxTry = 10; // Maximum number of redirects to follow
  let i = 0;

  // Loop to handle possible redirects
  while (process && i < maxTry) {
    try {
      const responseInfo = await fetchUrl({ url, headers });
      data.push(responseInfo); // Store the response information

      if (responseInfo.location) {
        url = responseInfo.location; // Update the URL if a redirect location is provided
      } else {
        process = false; // Stop processing if there's no redirect
      }

      i++; // Increment the counter for the number of redirects handled
    } catch (error) {
      // Handle fetch errors and stop further processing
      console.error(error);
      data.push({
        url,
        host: new URL(url).host,
        status: 0,
        statusText: "Fetch failed",
        duration: "N/A",
        metaRefresh: false,
        location: null
      });
      process = false; // Stop the loop on error
    }
  }

  // Return the collected response information as JSON
  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
