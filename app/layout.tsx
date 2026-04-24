import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "100 Days of Listen Labs",
  description: "Generate your weird little dudes and dudettes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
