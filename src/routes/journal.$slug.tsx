import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Clock, Share2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { WhatsAppAction } from "@/components/whatsapp-action";
import { getJournalBySlug, journalArticles } from "@/lib/data";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    if (params.slug === "understanding-wbhira-wbrera") {
      throw redirect({
        to: "/journal/$slug",
        params: { slug: "understanding-wbrera" },
        replace: true,
      });
    }

    const article = getJournalBySlug(params.slug);
    if (!article) {
      throw notFound();
    }
    return { article };
  },
  head: ({ loaderData }) => {
    const art = loaderData?.article;
    return {
      meta: [
        { title: `${art ? art.title : "Journal Article"} — BariGhor` },
        {
          name: "description",
          content: art ? art.excerpt : "Real estate legal and field advice in Kolkata.",
        },
      ],
    };
  },
  component: JournalDetailPage,
});

function JournalDetailPage() {
  const { article } = Route.useLoaderData();
  const { language } = useAppStore();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader sticky />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-card/60">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-3 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link to="/journal" className="hover:text-primary">
              Journal
            </Link>
            <span>/</span>
            <span className="font-semibold text-foreground truncate max-w-[200px] sm:max-w-none">
              {article.title}
            </span>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-xs">
            <Link to="/journal">
              <ArrowLeft className="mr-1 size-3.5" /> All articles
            </Link>
          </Button>
        </div>
      </div>

      {/* Article Content */}
      <article className="mx-auto max-w-4xl px-5 py-12 lg:px-8 lg:py-16">
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-accent">
            <span>{article.category}</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock className="size-3" /> {article.readTime}
            </span>
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            {language === "en" ? article.title : article.bengaliTitle}
          </h1>

          <div className="flex items-center gap-4 border-y border-border py-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium text-foreground">
              <User className="size-3.5 text-accent" /> {article.author}
            </span>
            <span>·</span>
            <span>Published {article.date}</span>
          </div>
        </div>

        {/* Lead Excerpt */}
        <p className="mt-8 border-l-2 border-accent pl-5 font-display text-xl italic leading-relaxed text-foreground/90">
          "{article.excerpt}"
        </p>

        {/* Article Body Paragraphs */}
        <div className="mt-10 space-y-6 text-base leading-8 text-foreground/90 font-sans">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* Key Takeaways Box */}
        <div className="mt-12 rounded-sm border border-black/5 bg-secondary/50 p-8">
          <h3 className="font-display text-2xl font-bold text-foreground">
            Essential Buyer Checklist
          </h3>
          <div className="mt-5 space-y-3">
            {article.keyTakeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 text-accent shrink-0" />
                <span className="leading-6">{takeaway}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Author & Advisory Callout */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 sm:flex-row">
          <div>
            <p className="font-display text-lg font-bold">
              Have legal questions on a Kolkata property?
            </p>
            <p className="text-xs text-muted-foreground">
              Our in-house legal desk provides independent title diligence.
            </p>
          </div>
          <WhatsAppAction context="journal" label="Ask Legal Advisory" size="default" />
        </div>
      </article>

      {/* Read Next Section */}
      <section className="border-t border-border bg-card/60 py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h3 className="font-display text-2xl font-bold">More from the BariGhor Journal</h3>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {journalArticles
              .filter((a) => a.slug !== article.slug)
              .map((a) => (
                <div key={a.slug} className="border border-border bg-card p-6">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-accent">
                    {a.category}
                  </span>
                  <h4 className="mt-2 font-display text-xl font-bold">
                    <Link
                      to="/journal/$slug"
                      params={{ slug: a.slug }}
                      className="hover:text-primary"
                    >
                      {a.title}
                    </Link>
                  </h4>
                  <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{a.excerpt}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppAction floating context="journal" />
    </main>
  );
}
