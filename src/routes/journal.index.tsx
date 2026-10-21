import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { Reveal, RevealGroup } from "@/components/reveal";
import { journalArticles } from "@/lib/data";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "BariGhor Market Journal — Kolkata Real Estate Insights" },
      {
        name: "description",
        content:
          "Plain-language guides to property laws, WBRERA, monsoon drainage, and land tenure in Kolkata.",
      },
    ],
  }),
  component: JournalIndexPage,
});

function JournalIndexPage() {
  const { language } = useAppStore();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader sticky />

      {/* Header */}
      <section className="border-b border-border bg-card/60 py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Field Guides & Analysis
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">
            {language === "en" ? "The BariGhor Market Journal" : "মার্কেট জার্নাল"}
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            In Bengal, property paperwork and micro-geography shape your purchase just as much as
            square footage. Read our curated field dossiers.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <RevealGroup staggerMs={80} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {journalArticles.map((article, idx) => (
            <Reveal
              key={article.slug}
              index={idx}
              as="article"
              className="flex flex-col justify-between border border-black/5 bg-card p-8 shadow-xs transition-shadow duration-base ease-out hover:shadow-xl hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-bold uppercase tracking-wider text-accent">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="size-3" /> {article.readTime}
                  </span>
                </div>

                <h2 className="mt-4 font-display text-2xl font-bold leading-snug tracking-tight text-foreground transition-colors hover:text-primary">
                  <Link to="/journal/$slug" params={{ slug: article.slug }}>
                    {language === "en" ? article.title : article.bengaliTitle}
                  </Link>
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-8 border-t border-border pt-4">
                <Link
                  to="/journal/$slug"
                  params={{ slug: article.slug }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent transition-colors"
                >
                  Read full analysis <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </Reveal>
          ))}
        </RevealGroup>
      </section>

      <SiteFooter />
      <WhatsAppAction floating context="journal" />
    </main>
  );
}
