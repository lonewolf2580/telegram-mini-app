import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { TonConnectUIProvider } from '@tonconnect/ui-react'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'FortuneTap',
  description: 'Reward for Gameplay. We aim to make Gaming more profitable than it already is through a Token backed by top Gaming Companies including EA, Unity, Unreal Engine, Xbox, Sega.'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
      <TonConnectUIProvider manifestUrl="https://telegram-mini-app-sooty-iota.vercel.app/tonconnect-manifest.json">
        {children}
      </TonConnectUIProvider>
      </body>
    </html>
  );
}
