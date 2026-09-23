import { useEffect, useState } from "react";
import { CalendarDays, Lightbulb } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import { proverbialDigests, type ProverbialDigest } from "@/lib/chapel-content";
import { loadProverbialDigests } from "@/lib/published-content";

export const Route = createFileRoute("/proverbial-digest")({
  head: () => ({
    meta: [
      { title: "Proverbial Digest — Elizade University Chapel" },
      { name: "description", content: "Read a daily proverb and reflection from Elizade University Chapel." },
      { property: "og:title", content: "Proverbial Digest — Elizade University Chapel" },
      { property: "og:description", content: "Read a daily proverb and reflection from Elizade University Chapel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProverbialDigestPage,
});

function ProverbialDigestPage() {
  const [digests, setDigests] = useState<ProverbialDigest[]>(() => [...proverbialDigests]);

  useEffect(() => {
    void loadProverbialDigests().then(setDigests).catch(() => undefined);
  }, []);

  return (
    <div>
      <section className="bg-navy py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Daily encouragement</p>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-medium leading-tight sm:text-6xl">A little wisdom for each day.</h1>
          <p className="mt-7 max-w-2xl text-pretty leading-relaxed text-primary-foreground/70">Pause for a proverb, reflect on its meaning, and carry one small encouragement into your day.</p>
        </div>
      </section>

      <section className="bg-card py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">The week's digest</p>
            <h2 className="mt-4 text-3xl font-medium text-navy sm:text-4xl">Wisdom to carry with you.</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Daily digest entries will appear here as they are uploaded by the Chapel team.</p>
          </div>
          <div className="grid gap-4">
            {digests.map((digest) => (
              <article key={digest.id} className="grid gap-5 rounded-lg bg-site p-6 ring-1 ring-line sm:grid-cols-[10rem_1fr] sm:items-start sm:p-8">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-gold"><CalendarDays className="size-4" />{digest.day}</div>
                <div>
                  <div className="flex items-start gap-3"><Lightbulb className="mt-1 size-5 shrink-0 text-gold" /><h3 className="text-xl font-medium text-navy">{digest.proverb}</h3></div>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{digest.reflection}</p>
                  {digest.documentDataUrl ? <a href={digest.documentDataUrl} target="_blank" rel="noreferrer" aria-label={`View ${digest.documentName ?? `${digest.day} digest`} in full size`} className="mt-5 block w-full max-w-md cursor-zoom-in"><img src={digest.documentDataUrl} alt={digest.documentName ?? `${digest.day} digest`} className="h-auto max-h-64 w-full rounded-md object-contain object-left shadow-sm" /></a> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}