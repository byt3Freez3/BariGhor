import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
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
      to: "/$citySlug",
      params: { citySlug: city },
    });
  },
  component: () => null,
});
