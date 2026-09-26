import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/property/$slug")({
  beforeLoad: ({ params }) => {
    // Redirect /property/:slug to /properties/:slug
    throw redirect({
      to: "/properties/$slug",
      params: {
        slug:
          params.slug === "verandah-residences-new-town" ? "the-verandah-residences" : params.slug,
      },
    });
  },
  component: () => null,
});
