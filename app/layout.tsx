import "./globals.css";

import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

let title = "ComputerLingo - Learn Computer Science with Fun and Games";
let description =
  "ComputerLingo is a gamified platform for learning computer science through quick lessons, interactive quizzes, and daily challenges. Master coding, algorithms, and tech concepts in a fun, bite-sized way.";

export const metadata = {
  title,
  description,
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  metadataBase: new URL("https://nextjs-postgres-auth.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
