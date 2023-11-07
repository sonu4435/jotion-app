import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import lightImg from "../public/logo.svg";
import { Toaster } from "sonner";
import DarkImg from "../public/logo-dark.svg";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProviser } from "@/components/provider/convex-provider";
import { Modelprovider } from "@/components/provider/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jotion : Data Base for your content notes",
  description:
    "This is a Jotion app which is just a clone of Notion application & this application is created using Next.js library",
  icons: {
    icon: [
      {
        media: "prefers-color-schema:  light",
        url: lightImg,
        href: "/logo.svg"
      },
      {
        media: "prefers-color-scheme: dark",
        url: DarkImg,
        href: "/logo-dark.svg"
      }
    ]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProviser>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster position="bottom-center" />
              <Modelprovider />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProviser>
      </body>
    </html>
  );
}
