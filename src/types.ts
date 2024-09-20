export type ResponseInfo = {
  url: string;
  host: string,
  status: number;
  statusText: string;
  duration: string;
  location: string | null;
  metaRefresh: boolean;
}

export type SelectOptionType = {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}
export const browsers = ["chrome", "edge", "firefox", "safari"] as const;
export const devices = ["desktop", "mobile"] as const;
export const desktopOperatingSystems = ["macos", "windows", "linux"] as const;
export const mobileOperatingSystems = ["ios", "android"] as const;
export const operatingSystems = ["windows", "macos", "linux", "android", "ios"] as const;
export type Device = typeof devices[number];
export type Browser = typeof browsers[number];
export type OperatingSystem = typeof operatingSystems[number];
export type DesktopOperatingSystem = typeof desktopOperatingSystems[number];
export type MobileOperatingSystem = typeof mobileOperatingSystems[number];
