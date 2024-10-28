import type { Metadata } from "next";
import "./globals.css";

import Layout from "@/components/Layout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Layout>{children}</Layout>
    </html>
  );
}
