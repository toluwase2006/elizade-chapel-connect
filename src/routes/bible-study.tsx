import { useEffect, useState } from "react";
import { BookOpen, CalendarDays, Clock3 } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import { bibleStudySessions, type BibleStudySession } from "@/lib/chapel-content";
import { loadBibleStudySessions } from "@/lib/published-content";

export const Route = createFileRoute("/bible-study")({
  head: () => ({
    meta: [
      { title: "Bible Study — Elizade University Chapel" },
      { name: "description", content: "Join weekly Bible study sessions at Elizade University Chapel every Sunday, Tuesday, and Thursday." },
      { property: "og:title", content: "Bible Study — Elizade University Chapel" },
      { property: "og:description", content: "Join weekly Bible study sessions at Elizade University Chapel every Sunday, Tuesday, and Thursday." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BibleStudyPage,
});

function BibleStudyPage() {
  const [sessions, setSessions] = useState<BibleStudySession[]>(() => [...bibleStudySessions]);

  useEffect(() => {
    void loadBibleStudySessions().then(setSessions).catch(() => undefined);
  }, []);

  return (
    <div>
      <section className="bg-navy py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Study the Word</p>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-medium leading-tight sm:text-6xl">Bible study for every season of campus life.</h1>
          <p className="mt-7 max-w-2xl text-pretty leading-relaxed text-primary-foreground/70">Come ready to ask honest questions, listen well, and grow together in the knowledge of Christ.</p>
        </div>
      </section>

      <section className="bg-sky py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Weekly gatherings</p>
            <h2 className="mt-4 text-3xl font-medium text-navy sm:text-4xl">Three opportunities to go deeper.</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">Our latest Bible study sessions and notes will be published here as they are uploaded by the Chapel team.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {sessions.map((session) => (
              <article key={session.id} className="rounded-lg bg-card p-7 shadow-[0_12px_30px_-24px_var(--navy)] ring-1 ring-navy/5">
                <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.14em] text-gold">
                  <span className="inline-flex items-center gap-2"><CalendarDays className="size-4" />{session.day}</span>
                  <span className="inline-flex items-center gap-1 text-muted-foreground"><Clock3 className="size-3.5" />{session.time}</span>
                </div>
                <div className="mt-8 grid size-11 place-items-center rounded-sm bg-navy/5 text-navy"><BookOpen className="size-5" /></div>
                <h3 className="mt-6 text-xl font-medium text-navy">{session.title}</h3>
                <p className="mt-2 text-sm font-semibold text-gold">{session.scripture}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{session.summary}</p>
                {session.documentDataUrl && session.documentName ? <a href={session.documentDataUrl} download={session.documentName} target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm font-semibold text-navy underline decoration-gold underline-offset-4 hover:text-navy-light">Open study document</a> : null}
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}