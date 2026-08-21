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

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-clip">
      <head>
        {/* Preconnect to Google Fonts for faster load */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Inline script to clear active service workers and cache storage to prevent asset 404s on reload */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Wipe active service workers immediately
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(regs) {
                  for (var i = 0; i < regs.length; i++) {
                    regs[i].unregister();
                  }
                });
              }
              // Clear Cache Storage keys
              if ('caches' in window) {
                caches.keys().then(function(keys) {
                  keys.forEach(function(key) { caches.delete(key); });
                });
              }
              // Intercept ChunkLoadErrors / Stylesheet load errors and force a hard reload
              window.addEventListener('error', function(e) {
                var msg = e.message || '';
                var target = e.target || {};
                var isChunkError = msg.indexOf('ChunkLoadError') !== -1 || 
                                   msg.indexOf('Loading chunk') !== -1 || 
                                   (target.tagName === 'LINK' && target.rel === 'stylesheet') ||
                                   (target.tagName === 'SCRIPT' && target.src && (target.src.indexOf('webpack') !== -1 || target.src.indexOf('chunk') !== -1));
                if (isChunkError) {
                  console.warn('Stale assets detected. Performing force reload...', e);
                  e.preventDefault();
                  window.location.reload(true);
                }
              }, true);
            `
          }}
        />
      </head>
      <body className="antialiased overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
