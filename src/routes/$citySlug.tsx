import { createFileRoute, Outlet, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { getCityBySlug } from "@/lib/regions";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/$citySlug")({
  beforeLoad: ({ params }) => {
    const city = getCityBySlug(params.citySlug);
    if (!city) {
      throw notFound();
    }
    return { city };
  },
  component: CityLayout,
});

function CityLayout() {
  const { city } = Route.useRouteContext();
  const setCity = useAppStore((state) => state.setCity);

  useEffect(() => {
    if (city?.slug) {
      setCity(city.slug);
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("barighor_city", city.slug);
        } catch {}
      }
    }
  }, [city?.slug, setCity]);

  return <Outlet />;
}
