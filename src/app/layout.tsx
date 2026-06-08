import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ColorThemeProvider } from "@/components/providers/color-theme-provider";
import { LenisProvider } from "@/components/providers/lenis-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://v1ynlee.vercel.app";
const siteName = "v1ynlee";
const siteDescription =
  "A hobby-focused personal portfolio of v1ynlee — a passionate reader of manhwa, manhua, and manga. Discover favorite titles, genre picks, and mood playlists.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "v1ynlee · just a hobbyist",
    template: "%s · v1ynlee",
  },
  description: siteDescription,
  keywords: [
    "manhwa",
    "manga",
    "manhua",
    "webtoon",
    "comics",
    "hobbyist",
    "v1ynlee",
    "Solo Leveling",
    "Tower of God",
    "Omniscient Reader",
  ],
  authors: [{ name: "v1ynlee" }],
  creator: "v1ynlee",
  publisher: "v1ynlee",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "v1ynlee · just a hobbyist",
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "v1ynlee – a hobby portfolio for manhwa, manhua and manga readers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@v1ynlee",
    creator: "@v1ynlee",
    title: "v1ynlee · just a hobbyist",
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <ColorThemeProvider>
            <LenisProvider>
              {children}
            </LenisProvider>
          </ColorThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
