import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhatsAppActionProps {
  context?: "home" | "property" | "locality" | "journal" | "search";
  propertyTitle?: string;
  localityName?: string;
  customMessage?: string;
  floating?: boolean;
  className?: string;
  variant?: "default" | "secondary" | "outline" | "accent" | "whatsapp";
  size?: "default" | "sm" | "lg" | "icon";
  label?: string;
}

export function WhatsAppAction({
  context = "home",
  propertyTitle,
  localityName,
  customMessage,
  floating = false,
  className = "",
  variant = "accent",
  size = "default",
  label = "Enquire on WhatsApp",
}: WhatsAppActionProps) {
  let messageText = "Hi BariGhor, I am looking for properties in Kolkata.";

  if (customMessage) {
    messageText = customMessage;
  } else if (context === "property" && propertyTitle) {
    messageText = `Hi BariGhor, I want to know more about ${propertyTitle}.`;
  } else if (context === "locality" && localityName) {
    messageText = `Hi BariGhor, I am looking for homes in ${localityName}, Kolkata.`;
  } else if (context === "search") {
    messageText =
      "Hi BariGhor, I would like assistance with curated homes in Kolkata matching my requirements.";
  }

  const encodedMessage = encodeURIComponent(messageText);
  const waUrl = `https://wa.me/919073599355?text=${encodedMessage}`;

  if (floating) {
    return (
      <aside
        aria-label="WhatsApp quick enquiry"
        className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 md:bottom-8 md:left-auto md:right-8 md:translate-x-0"
      >
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-2xl transition-[transform,background-color] duration-base ease-premium hover:scale-[1.03] hover:bg-accent focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 md:px-6 md:py-4"
          aria-label="Enquire on WhatsApp"
        >
          <span className="relative flex size-2.5">
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
          </span>
          <MessageCircle className="size-5 transition-transform duration-base ease-premium group-hover:rotate-6" />
          <span className="tracking-wide">Enquire on WhatsApp</span>
        </a>
      </aside>
    );
  }

  return (
    <Button
      asChild
      variant={variant === "accent" ? "default" : variant}
      size={size}
      className={`gap-2 ${className}`}
    >
      <a href={waUrl} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="size-4" />
        {label}
      </a>
    </Button>
  );
}
