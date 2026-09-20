import { Analytics } from "@vercel/analytics/next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import ScrollToTop from "./components/helper/scroll-to-top";
import Navbar from "./components/navbar";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });
import Script from "next/script";

// Set NEXT_PUBLIC_APP_URL in Vercel project settings to the real production
// domain so OpenGraph/Twitter card URLs resolve correctly.
const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const title = "Youssef Abid — Security Engineer";
const description =
  "Portfolio of Youssef Abid: security engineering, DevSecOps, and applied ML security research.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Youssef Abid",
    images: ["/card.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/card.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTM}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GTM}');
        `}
      </Script>
    </head>

      <body className={inter.className}>
        <ToastContainer />
        <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
          <Navbar />
          {children}
          <ScrollToTop />
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
