import '../styles/globals.css';
import { siteConfig } from '@/data/siteConfig';

/**
 * Root Layout
 * ───────────
 * Sets HTML lang, metadata (SEO), and wraps all pages.
 * Edit siteConfig.seo to update title/description/og.
 */
export const metadata = {
  title:       siteConfig.seo.title,
  description: siteConfig.seo.description,
  metadataBase: new URL(siteConfig.seo.url),
  openGraph: {
    title:       siteConfig.seo.title,
    description: siteConfig.seo.description,
    url:         siteConfig.seo.url,
    images: [{ url: siteConfig.seo.ogImage }],
    type: 'website',
  },
  twitter: {
    card:        'summary_large_image',
    title:       siteConfig.seo.title,
    description: siteConfig.seo.description,
    images:      [siteConfig.seo.ogImage],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect to Google Fonts for faster load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
