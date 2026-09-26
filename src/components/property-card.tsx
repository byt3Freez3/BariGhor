import { Link } from "@tanstack/react-router";
import { BadgeCheck, BedDouble, Building2, MapPin, Ruler } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Property } from "@/lib/data";
import { WhatsAppAction } from "@/components/whatsapp-action";

export function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group flex flex-col overflow-hidden rounded-xs border border-black/5 bg-card shadow-xs transition-shadow duration-300 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={property.image_url}
          alt={property.title}
          width={800}
          height={500}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-xs bg-primary/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground backdrop-blur-xs">
            <BadgeCheck className="size-3 text-emerald-400" />
            WBHIRA Verified
          </span>
          <span className="rounded-xs bg-card/90 px-2.5 py-1 text-[11px] font-semibold text-foreground backdrop-blur-xs">
            {property.tenure_type || property.tenure}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 rounded-xs bg-primary/95 px-3 py-1 font-display text-base font-bold text-primary-foreground shadow-md backdrop-blur-xs">
          {property.price}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
          <MapPin className="size-3.5" />
          <Link
            to="/localities/$slug"
            params={{ slug: property.localitySlug }}
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
          <Link to="/properties/$slug" params={{ slug: property.slug }}>
            {property.title}
          </Link>
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

        <div className="mt-6 flex items-center gap-2 pt-2">
          <Button asChild variant="outline" size="sm" className="flex-1">
            <Link to="/properties/$slug" params={{ slug: property.slug }}>
              Details
            </Link>
          </Button>
          <WhatsAppAction
            context="property"
            propertyTitle={property.title}
            variant="accent"
            size="sm"
            label="Enquire"
          />
        </div>
      </div>
    </motion.article>
  );
}
