"use client";
import { appConfig } from "@/config";

export function Footer() {
  return (
    <footer className="container py-4 text-center text-sm text-muted-foreground mt-10">
      <span>
        © {new Date().getFullYear()} {appConfig.appName}. All rights reserved.
      </span>
    </footer>
  );
}
