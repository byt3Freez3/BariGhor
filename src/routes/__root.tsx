import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BariGhor | Premium Real Estate in West Bengal" },
      {
        name: "description",
        content:
          "Discover handpicked residences, verified WBRERA titles, and honest neighbourhood intelligence across Kolkata and West Bengal.",
      },
      { name: "author", content: "BariGhor" },
      { name: "theme-color", content: "#0A3632" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "BariGhor | Premium Real Estate in West Bengal" },
      {
        property: "og:description",
        content:
          "Curated homes, direct title verification, and plain-language neighbourhood dossiers for Kolkata.",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400..800;1,9..40,400..800&family=Outfit:wght@400..800&family=Lora:ital,wght@0,400..700;1,400..700&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: "BariGhor Real Estate Advisory",
          alternateName: "বাড়িঘর",
          url: "https://build-it-better-five.vercel.app",
          logo: "https://build-it-better-five.vercel.app/favicon.svg",
          description: "West Bengal's single-admin real estate publication and physical site audit advisory.",
          telephone: "+91-90735-99355",
          address: {
            "@type": "PostalAddress",
            streetAddress: "14 Camac Street, 7th Floor",
            addressLocality: "Kolkata",
            addressRegion: "West Bengal",
            postalCode: "700017",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 22.5448,
            longitude: 88.3533,
          },
          areaServed: [
            { "@type": "City", name: "Kolkata" },
            { "@type": "City", name: "Howrah" },
            { "@type": "City", name: "New Town" },
            { "@type": "City", name: "Durgapur" },
            { "@type": "City", name: "Asansol" },
            { "@type": "City", name: "Siliguri" },
            { "@type": "City", name: "Bardhaman" },
            { "@type": "City", name: "Habra" },
            { "@type": "City", name: "Kalyani" },
            { "@type": "City", name: "Kharagpur" },
            { "@type": "City", name: "Haldia" },
          ],
          priceRange: "₹20,00,000 - ₹10,00,00,000",
          taxID: "WBRERA/A/KOL/2023/000184",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
