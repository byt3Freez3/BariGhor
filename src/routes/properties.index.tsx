import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/properties/")({
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
      to: "/$citySlug/properties",
      params: { citySlug: city },
      statusCode: 301,
    });
  },
  component: () => null,
});
