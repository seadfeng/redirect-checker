import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const canonicalLink = (domain: string, pathname: string) => {
  const isProduction = process.env.NODE_ENV === 'production';
  return `${isProduction ? "https" : "http"}://${domain}${pathname}`;
}