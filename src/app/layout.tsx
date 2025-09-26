import ConvexClientProvider from "@/components/ConvexClientProvider";
import { ClerkLoaded, ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const font = Josefin_Sans({
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Meshi",
  description: "A portfolio for 3d artists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <ClerkProvider>
          <ClerkLoaded>
            <ConvexClientProvider>
              {children}
              <SpeedInsights />
              <Analytics />
            </ConvexClientProvider>
          </ClerkLoaded>
        </ClerkProvider>
      </body>
    </html>
  );
}
