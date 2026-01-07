import createMiddleware from "next-intl/middleware";
import { localePrefix } from "./navigation";

export default createMiddleware({
  locales: ["en", "uk"],

  defaultLocale: "en",
  localePrefix,
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
