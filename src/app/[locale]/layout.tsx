// layout.tsx
import type { Metadata } from "next";
import "./globals.scss";
import Navigation from "@/components/Navigation/Navigation";
import TopMenu from "@/components/TopMenu/TopMenu";
import StoreProvider from "./StoreProvider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: "Inventory App",
  description: "Test task for dZENcode",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const messages = await getMessages();
  const { locale } = await params;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
        <StoreProvider>
          <div className="d-flex w-100 h-100 p-1">
            <Navigation />
            <TopMenu />
            <div style={{ marginTop: "var(--header-height)", width: "100%", marginLeft: "250px" }}>
              <main className="h-100" style={{ padding: "var(--custom-space) 0 0 24px", height: "100%" }}>
                {children}
              </main>
            </div>
          </div>
        </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
