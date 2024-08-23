import { appConfig } from "@/config";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const canonicalLink = (domain: string, pathname: string) => {
  const isProduction = process.env.NODE_ENV === 'production';
  return `${isProduction ? "https" : "http"}://${domain}${pathname}`;
}

export const getOrigin = ({ headers }: { headers: Headers }) => {
  const host = headers.get('host') || appConfig.appDomain;

  const protocol = ['localhost', '127.0.0.1'].includes(host.split(":")[0]) ? 'http' : 'https';
  return `${protocol}://${host}`;
}
