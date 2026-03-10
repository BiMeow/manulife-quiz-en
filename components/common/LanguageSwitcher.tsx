"use client";

import { memo } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils/main";

interface LanguageSwitcherProps {
  className?: string;
}

function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const src = locale === "vi" ? "/images/flag-vi.png" : "/images/flag-uk.png";
  const alt = locale === "vi" ? "Vietnamese flag" : "US flag";

  const toggleLocale = () => {
    const nextLocale = locale === "vi" ? "en" : "vi";
    const basePath = pathname ?? "/";

    if (nextLocale === "vi") {
      // Switch to Vietnamese: / or /foo -> /vi or /vi/foo
      const newPath = basePath === "/" ? "/vi" : `/vi${basePath}`;
      router.push(newPath);
    } else {
      // Switch to English (default): /vi or /vi/foo -> / or /foo
      const pathWithoutVi = basePath.replace(/^\/vi\/?/, "") || "/";
      router.push(pathWithoutVi);
    }
  };

  return (
    <button
      type="button"
      onClick={toggleLocale}
      className={cn(
        "relative flexCenter h-10 w-10 overflow-hidden rounded-full border border-white/40 bg-black/40 backdrop-blur-sm shadow-sm transition-all duration-300 hover:bg-white/20 cursor-pointer",
        className,
      )}
      aria-label={locale === "vi" ? "Switch to English" : "Chuyển sang tiếng Việt"}
    >
      <Image src={src} alt={alt} fill sizes="40px" className="object-cover" />
    </button>
  );
}

export default memo(LanguageSwitcher);

