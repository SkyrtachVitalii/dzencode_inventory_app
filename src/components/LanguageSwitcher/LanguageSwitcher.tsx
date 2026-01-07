"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/navigation";
import { ChangeEvent, useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="d-flex align-items-center">
      <select
        className="form-select form-select-sm border-0 shadow-none bg-light fw-bold"
        style={{ width: "auto", cursor: "pointer", color: "#455A64" }}
        defaultValue={locale}
        disabled={isPending}
        onChange={onSelectChange}
      >
        <option value="en">EN</option>
        <option value="uk">UA</option>
      </select>
    </div>
  );
}