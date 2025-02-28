import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import type { ReactNode } from "react";
import { NavBar } from "../components/fhl/Nav";
import { Page } from "@/components/fhl/Page";

// eslint-disable-next-line new-cap
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FHL",
  description: "Fuck Honor League",
  authors: [
    {
      name: "Joey VeggieMedley",
    },
    {
      name: "Ryan Cyb",
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <NavBar>
            <Page>{children}</Page>
          </NavBar>
        </Providers>
      </body>
    </html>
  );
}
