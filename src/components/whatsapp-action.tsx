import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function WhatsAppAction({ title = "a BariGhor home", floating = false }: { title?: string; floating?: boolean }) {
  const message = encodeURIComponent(`Hi, I'm interested in ${title}. Please share more details.`);
  return (
    <Button asChild variant="whatsapp" size={floating ? "lg" : "default"} className={floating ? "fixed bottom-5 left-1/2 z-50 -translate-x-1/2 shadow-xl md:bottom-7 md:left-auto md:right-7 md:translate-x-0" : ""}>
      <a href={`https://wa.me/?text=${message}`} target="_blank" rel="noreferrer"><MessageCircle className="size-5" />Enquire on WhatsApp</a>
    </Button>
  );
}
