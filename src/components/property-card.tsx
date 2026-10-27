import { Link } from "@tanstack/react-router";
import { BadgeCheck, BedDouble, Building2, Heart, MapPin, Ruler } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Property } from "@/lib/data";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { useAppStore } from "@/lib/store";
import { MOTION_DURATIONS, MOTION_EASINGS, useReducedMotion } from "@/lib/motion";
import { BlurImage } from "@/components/blur-image";
import { AvailabilityChip, getSoldNotificationMessage } from "@/components/availability-chip";

export function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  const prefersReduced = useReducedMotion();
  const citySlug = property.citySlug || (property.localitySlug === "new-town" ? "new-town" : "kolkata");
  const { isShortlisted, toggleShortlist } = useAppStore();
  const saved = isShortlisted(property.id);
  const isSold = property.availability === "sold";

  return (
    <motion.article
      layout={!prefersReduced ? "position" : false}
      initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={
        prefersReduced
          ? { opacity: 0, transition: { duration: 0.05 } }
          : {
              opacity: 0,
              scale: 0.97,
              transition: {
                duration: MOTION_DURATIONS.fast,
                ease: MOTION_EASINGS.in,
              },
            }
      }
      transition={{
        duration: 0.3,
        delay: prefersReduced ? 0 : Math.min((index % 6) * 0.05, 0.25),
        ease: MOTION_EASINGS.premium,
        layout: { duration: 0.3, ease: MOTION_EASINGS.premium },
      }}
      whileHover={prefersReduced ? undefined : { y: -4 }}
      className={`group flex flex-col overflow-hidden rounded-xs border border-black/5 bg-card shadow-xs transition-shadow duration-base ease-out hover:shadow-xl ${
        isSold ? "opacity-95" : ""
      }`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <BlurImage
          src={property.image_url}
          alt={property.title}
          width={800}
          height={500}
          style={{
            viewTransitionName: `prop-img-${property.slug}`,
            filter: isSold ? "saturate(0.4)" : undefined,
          }}
          className={`size-full object-cover transition-transform duration-base ease-out group-hover:scale-[1.03] ${
            isSold ? "saturate-[0.4]" : ""
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-base ease-out group-hover:opacity-100 pointer-events-none" />

        <div className="absolute left-3 top-3 right-12 flex flex-wrap items-center gap-1.5">
          <AvailabilityChip
            availability={property.availability}
            unitsTotal={property.unitsTotal}
            unitsRemaining={property.unitsRemaining}
            size="sm"
          />
          {property.verified !== false ? (
            <Link
              to="/about/verification"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 rounded-xs bg-primary/95 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-primary-foreground backdrop-blur-xs transition-colors hover:bg-primary"
              title="Verified by BariGhor: Click to read our 4-pillar audit report"
            >
              <BadgeCheck className="size-3 text-emerald-400" />
              WBRERA Verified
            </Link>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-xs bg-amber-800/90 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-xs">
              Audit Pending
            </span>
          )}
          <span className="rounded-xs bg-card/90 px-2 py-0.5 text-[11px] font-semibold text-foreground backdrop-blur-xs">
            {property.tenure_type || property.tenure}
          </span>
        </div>

        {/* Shortlist Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleShortlist(property.id);
          }}
          className={`absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full transition-transform active:scale-90 ${
            saved
              ? "bg-rose-500 text-white shadow-md"
              : "bg-black/40 text-white hover:bg-black/60 backdrop-blur-xs"
          }`}
          aria-label={saved ? "Remove from shortlist" : "Add to shortlist"}
          title={saved ? "Remove from shortlist" : "Save to shortlist"}
        >
          <Heart className={`size-4 ${saved ? "fill-white" : ""}`} />
        </button>

        <div className="absolute bottom-3 right-3 rounded-xs bg-primary/95 px-3 py-1 font-display text-base font-bold text-primary-foreground shadow-md backdrop-blur-xs">
          {property.price}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
          <MapPin className="size-3.5" />
          <Link
            to="/$citySlug/localities/$localitySlug"
            params={{ citySlug, localitySlug: property.localitySlug }}
            className="hover:underline"
          >
            {property.locality}
          </Link>
          <span className="text-muted-foreground/50">·</span>
          <span className="truncate text-muted-foreground font-normal">
            {property.locationDetails}
          </span>
        </div>

        <h3 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          <Link to="/$citySlug/properties/$propertySlug" params={{ citySlug, propertySlug: property.slug }}>
            {property.title}
          </Link>
          {property.bengaliTitle && (
            <span lang="bn" className="block text-xs font-normal text-muted-foreground font-sans mt-0.5">
              {property.bengaliTitle}
            </span>
          )}
        </h3>

        <div className="mt-4 grid grid-cols-3 gap-2 border-y border-border py-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BedDouble className="size-3.5 text-accent shrink-0" />
            <span>{property.bhk}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Ruler className="size-3.5 text-accent shrink-0" />
            <span>{property.sqft.toLocaleString("en-IN")} sq ft</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Building2 className="size-3.5 text-accent shrink-0" />
            <span className="truncate">{property.developer}</span>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-xs leading-5 text-muted-foreground">
          {property.description}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link to="/$citySlug/properties/$propertySlug" params={{ citySlug, propertySlug: property.slug }}>
              Details
            </Link>
          </Button>
          {isSold ? (
            <WhatsAppAction
              customMessage={getSoldNotificationMessage(property)}
              variant="outline"
              size="sm"
              className="border-accent/40 text-accent hover:bg-accent/10 text-xs font-semibold"
              label="Notify me about similar homes"
            />
          ) : (
            <WhatsAppAction
              context="property"
              propertyTitle={property.title}
              variant="accent"
              size="sm"
              label="Enquire"
            />
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col overflow-hidden rounded-xs border border-black/5 bg-card shadow-xs animate-pulse"
    >
      <div className="relative aspect-[16/10] bg-muted/70" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2">
          <div className="h-3.5 w-24 rounded-xs bg-muted/60" />
          <span className="text-muted/40">·</span>
          <div className="h-3 w-32 rounded-xs bg-muted/40" />
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-6 w-4/5 rounded-xs bg-muted/70" />
          <div className="h-3 w-1/2 rounded-xs bg-muted/40" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 border-y border-border py-3">
          <div className="h-3.5 rounded-xs bg-muted/50" />
          <div className="h-3.5 rounded-xs bg-muted/50" />
          <div className="h-3.5 rounded-xs bg-muted/50" />
        </div>
        <div className="mt-3 h-8 w-full rounded-xs bg-muted/30" />
        <div className="mt-6 flex items-center gap-2 pt-2">
          <div className="h-8 flex-1 rounded-xs bg-muted/60" />
          <div className="h-8 w-24 rounded-xs bg-muted/60" />
        </div>
      </div>
    </div>
  );
}
