import { Browser } from "@capacitor/browser";
import { Capacitor } from "@capacitor/core";
import type { AnchorHTMLAttributes, MouseEvent } from "react";

export function ExternalLink({
  href,
  children,
  onClick,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (!href || !Capacitor.isNativePlatform()) return;
    e.preventDefault();
    try {
      await Browser.open({ url: href });
    } catch (err) {
      console.error("Browser.open failed:", err);
    }
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      {...rest}
    >
      {children}
    </a>
  );
}
