import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/cities/$slug")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/$citySlug",
      params: { citySlug: params.slug },
      statusCode: 301,
    });
  },
  component: () => null,
});
