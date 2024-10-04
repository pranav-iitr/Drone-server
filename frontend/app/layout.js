import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gamma Rotors",
  description: "Gamma Rotors",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
        <meta httpEquiv={metadata.httpEquiv} content={metadata.content} />
      </head>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:slnt,wght@-10..0,100..900&family=Jura:wght@300..700&display=swap"
        rel="stylesheet"
      />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
