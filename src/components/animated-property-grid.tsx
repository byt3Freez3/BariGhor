import { AnimatePresence, motion } from "framer-motion";
import { Filter, RotateCcw } from "lucide-react";
import { PropertyCard, PropertyCardSkeleton } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { Property } from "@/lib/data";
import { MOTION_EASINGS, useReducedMotion } from "@/lib/motion";
import { WhatsAppAction } from "@/components/whatsapp-action";

interface AnimatedPropertyGridProps {
  properties: Property[];
  isLoading?: boolean;
  onResetFilters: () => void;
  emptyTitle?: string;
  emptySubtitle?: string;
  showWhatsAppOnEmpty?: boolean;
}

export function AnimatedPropertyGrid({
  properties,
  isLoading = false,
  onResetFilters,
  emptyTitle = "No homes match these filters",
  emptySubtitle = "Try adjusting your query or filter parameters.",
  showWhatsAppOnEmpty = false,
}: AnimatedPropertyGridProps) {
  const prefersReduced = useReducedMotion();

  if (isLoading) {
    return (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <AnimatePresence mode="popLayout" initial={false}>
        {properties.length > 0 ? (
          <motion.div
            key="property-grid-container"
            layout={!prefersReduced ? "position" : false}
            transition={{
              duration: 0.3,
              ease: MOTION_EASINGS.premium,
            }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {properties.map((property, idx) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={idx}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty-state-notice"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{
              duration: 0.3,
              ease: MOTION_EASINGS.premium,
            }}
            className="rounded-md border border-dashed border-border bg-card p-12 text-center sm:p-16"
          >
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-secondary text-muted-foreground">
              <Filter className="size-7 text-accent" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              {emptyTitle}
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {emptySubtitle}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button
                onClick={onResetFilters}
                variant="outline"
                className="gap-2 font-semibold"
              >
                <RotateCcw className="size-3.5 text-accent" />
                Reset Filters
              </Button>
              {showWhatsAppOnEmpty && (
                <WhatsAppAction
                  context="general"
                  variant="primary"
                  label="Enquire on WhatsApp"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
