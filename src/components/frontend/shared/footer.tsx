"use client";
import { appConfig } from "@/config";

export function Footer() {
  return (
    <footer className="container py-4 text-center text-sm text-muted-foreground mt-10">
      <div className="my-3 flex items-center justify-center">
        <div className="mr-3">Our Products: </div>
        <a href="https://www.faviconextractor.com/" className="text-primary flex items-center">
          <img alt="Favicon Extractor" src="https://www.faviconextractor.com/favicon/www.faviconextractor.com" className="h-5 w-5 mr-1 rounded-full bg-secondary" width={20} height={20} />
          <span>Favicon Extractor</span>
        </a>
      </div>
      <span>
        © {new Date().getFullYear()} <a href="https://www.redirectchecker.org/">{appConfig.appName}</a>. All rights reserved.
      </span>
    </footer>
  );
}
