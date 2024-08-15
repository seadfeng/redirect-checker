import { ResponseInfo } from '@/types';
import type { NextRequest } from 'next/server';
import z from 'zod';

export const runtime = 'edge';

const BodySchema = z.object({
  url: z.string().url()
})

const fetchUrl = async ({ url, headers }: { url: string, headers: HeadersInit }): Promise<ResponseInfo> => {
  const startTime = Date.now();
  const newUrl = new URL(url);
  const response = await fetch(url, {
    method: "GET",
    redirect: "manual",
    headers
  });
  const duration = ((Date.now() - startTime) / 1000).toFixed(3);

  const location = response.headers.get('location');
  return {
    url: url,
    host: newUrl.host,
    status: response.status,
    statusText: response.statusText,
    duration: `${duration} s`,
    location
  }
}


export async function POST(request: NextRequest & { cf?: Record<string, any> }) {
  const jsonData = await request.json();
  let url: string;
  try {
    url = BodySchema.parse(jsonData).url;
  } catch (error: any) {
    return new Response(JSON.stringify({ error: { message: error.message } }, null, 2), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      }
    })
  }
  let process = true;
  let data: ResponseInfo[] = [];

  request.headers.delete('Content-Length');

  const maxTry = 10;
  let i = 0;
  while (process && i < maxTry) {
    try {
      const responseInfo = await fetchUrl({ url, headers: request.headers });
      data.push(responseInfo);
      if (responseInfo.location) {
        url = responseInfo.location;
      } else {
        process = false;
      }
      i++;
    } catch (error) {
      console.error(error)
      data.push({
        url,
        host: new URL(url).host,
        status: 0,
        statusText: "Fetch failed",
        duration: "N/A",
        location: null
      });
      process = false;
    }
  }

  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })


}
