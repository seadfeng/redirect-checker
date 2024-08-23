import { appConfig, LocaleType } from "@/config";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getOrigin = ({ headers }: { headers: Headers }) => {
  const host = headers.get('host') || appConfig.appDomain;

  const protocol = ['localhost', '127.0.0.1'].includes(host.split(":")[0]) ? 'http' : 'https';
  return `${protocol}://${host}`;
}

export const getCanonical = ({ headers }: { headers: Headers }) => {
  const origin = getOrigin({ headers });
  const url = new URL(headers.get("x-request-url")!);
  return `${origin}${url.pathname}`;
}

export const createAlternates = ({ headers }: { headers: Headers; }) => {
  let languages = {} as Record<LocaleType, string>;
  const linkStr = headers.get("Link")!;
  const links = linkStr.split(',');
  links.forEach(alternateStr => {
    const match = alternateStr.match(/<(.*)>;.*hreflang="(.*)"/);
    if (match && match[1]) {
      if (match[2] !== "x-default") {
        languages[match[2] as LocaleType] = match[1];
      } else {
        languages[appConfig.i18n.defaultLocale] = match[1];
      }
    }
  })

  return {
    canonical: getCanonical({ headers }),
    languages
  }
}