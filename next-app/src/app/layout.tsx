import TopLoader from "@/components/TopLoader";
import { ThemeProvider } from "@/providers/ThemeProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import NotificationToaster from "@/components/NotificationToaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "X",
  description: "X",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class">
          <Toaster
            position="top-right"
            toastOptions={{
              success: {
                style: {
                  background: "white",
                  // background: "#16a34a",
                  // color: "white",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                },
              },
              error: {
                style: {
                  background: "white",
                  // background: "#e11d48",
                  // color: "white",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                },
              },
            }}
          />
          <TopLoader />
          <NotificationToaster />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
