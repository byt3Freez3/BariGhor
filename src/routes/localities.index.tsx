import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/localities/")({
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
      to: "/$citySlug/localities",
      params: { citySlug: city },
      statusCode: 301,
    });
  },
  component: () => null,
});
