import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/search")({
  beforeLoad: () => {
    let city = "kolkata";
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("barighor_city");
        if (stored) {
          city = stored;
        }
      } catch {}
    }
    throw redirect({
      to: "/$citySlug/search",
      params: { citySlug: city },
      statusCode: 301,
    });
  },
  component: () => null,
});
