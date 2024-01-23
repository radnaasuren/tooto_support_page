import MainLayout from "@/components/layout/mainLayout";
import "./globals.css";
import { Commissioner } from "next/font/google";

const commissioner = Commissioner({ subsets: ["latin"] });

export const metadata = {
  title: "Tooto support",
  description: "Developed by Blueprint solitions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Tooto Support</title>
      </head>
      <body className={commissioner.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
