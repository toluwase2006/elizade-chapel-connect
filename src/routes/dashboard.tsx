import { useEffect, useState, type FormEvent } from "react";
import { BookOpen, CalendarDays, LayoutDashboard, Lightbulb, Save, Trash2 } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bibleStudySessions, proverbialDigests, type BibleStudySession, type ProverbialDigest } from "@/lib/chapel-content";
import {
  createBibleStudySession,
  createProverbialDigest,
  deleteBibleStudySession,
  deleteProverbialDigest,
  loadBibleStudySessions,
  loadProverbialDigests,
} from "@/lib/published-content";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — Elizade University Chapel" },
      { name: "description", content: "Publish Bible Study and Proverbial Digest content for Elizade University Chapel." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardPage,
});

const studyDays = ["Sunday", "Tuesday", "Thursday"];
const digestDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function DashboardPage() {
  const [sessions, setSessions] = useState<BibleStudySession[]>(() => [...bibleStudySessions]);
  const [digests, setDigests] = useState<ProverbialDigest[]>(() => [...proverbialDigests]);
  const [notice, setNotice] = useState("");
  const [isPublishingStudy, setIsPublishingStudy] = useState(false);
  const [isPublishingDigest, setIsPublishingDigest] = useState(false);

  useEffect(() => {
    void Promise.all([loadBibleStudySessions(), loadProverbialDigests()]).then(([nextSessions, nextDigests]) => {
      setSessions(nextSessions);
      setDigests(nextDigests);
    }).catch((error: Error) => setNotice(error.message));
  }, []);

  const publishStudy = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(event.currentTarget);
    const documentFiles = form.getAll("study-document").filter((value): value is File => value instanceof File && value.size > 0);
    if (documentFiles.length === 0) {
      const message = "Choose at least one Bible Study document before publishing.";
      setNotice(message);
      toast.error(message);
      return;
    }
    try {
      setIsPublishingStudy(true);
      const day = String(form.get("study-day"));
      const newSessions = await Promise.all(documentFiles.map(async (documentFile) => createBibleStudySession({
        id: `bible-study-${day.toLowerCase()}-${createEntryId()}`,
        day,
        time: String(form.get("study-time")),
        title: String(form.get("study-title")),
        scripture: String(form.get("study-scripture")),
        summary: String(form.get("study-summary")),
        documentName: documentFile.name,
        documentDataUrl: await fileToDataUrl(documentFile),
      } satisfies BibleStudySession)));
      const nextSessions = [...sessions, ...newSessions].sort((a, b) => studyDays.indexOf(a.day) - studyDays.indexOf(b.day));
      setSessions(nextSessions);
      const message = `${documentFiles.length} ${day} Bible Study document${documentFiles.length === 1 ? "" : "s"} published.`;
      setNotice(message);
      toast.success(message);
      formElement.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to publish the Bible Study.";
      setNotice(message);
      toast.error(message);
    } finally {
      setIsPublishingStudy(false);
    }
  };

  const publishDigest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(event.currentTarget);
    const documentFiles = form.getAll("digest-document").filter((value): value is File => value instanceof File && value.size > 0);
    if (documentFiles.length === 0) {
      const message = "Choose at least one Proverbial Digest document before publishing.";
      setNotice(message);
      toast.error(message);
      return;
    }
    try {
      setIsPublishingDigest(true);
      const day = String(form.get("digest-day"));
      const newDigests = await Promise.all(documentFiles.map(async (documentFile) => createProverbialDigest({
        id: `digest-${day.toLowerCase()}-${createEntryId()}`,
        day,
        proverb: String(form.get("digest-proverb")),
        reflection: String(form.get("digest-reflection")),
        documentName: documentFile.name,
        documentDataUrl: await fileToDataUrl(documentFile),
      } satisfies ProverbialDigest)));
      const nextDigests = [...digests, ...newDigests].sort((a, b) => digestDays.indexOf(a.day) - digestDays.indexOf(b.day));
      setDigests(nextDigests);
      const message = `${documentFiles.length} ${day} Proverbial Digest document${documentFiles.length === 1 ? "" : "s"} published.`;
      setNotice(message);
      toast.success(message);
      formElement.reset();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to publish the Proverbial Digest.";
      setNotice(message);
      toast.error(message);
    } finally {
      setIsPublishingDigest(false);
    }
  };

  const removeStudy = (id: string) => {
    void deleteBibleStudySession(id).then(() => {
      setSessions((current) => current.filter((session) => session.id !== id));
      const message = "Bible Study entry removed.";
      setNotice(message);
      toast.success(message);
    }).catch((error: Error) => {
      setNotice(error.message);
      toast.error(error.message);
    });
  };

  const removeDigest = (id: string) => {
    void deleteProverbialDigest(id).then(() => {
      setDigests((current) => current.filter((digest) => digest.id !== id));
      const message = "Digest entry removed.";
      setNotice(message);
      toast.success(message);
    }).catch((error: Error) => {
      setNotice(error.message);
      toast.error(error.message);
    });
  };

  return (
    <div className="bg-sky py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mb-12 flex items-start gap-4">
          <div className="grid size-12 shrink-0 place-items-center rounded-sm bg-navy text-primary-foreground"><LayoutDashboard className="size-5" /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Content dashboard</p>
            <h1 className="mt-3 text-3xl font-medium leading-tight text-navy sm:text-5xl">Publish Chapel updates.</h1>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Add the Bible Study schedule and daily Proverbial Digest here. Published content appears on the public pages immediately in this browser.</p>
          </div>
        </div>

        {notice ? <p className="mb-8 break-words rounded-md border border-gold/40 bg-gold/10 px-4 py-3 text-sm font-medium text-navy" role="status">{notice}</p> : null}

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-lg bg-card p-5 shadow-[0_12px_30px_-24px_var(--navy)] ring-1 ring-navy/5 sm:p-9">
            <div className="flex items-center gap-3"><BookOpen className="size-5 text-gold" /><h2 className="text-2xl font-medium text-navy">Bible Study</h2></div>
            <p className="mt-2 text-sm text-muted-foreground">Publish or replace a Sunday, Tuesday, or Thursday study.</p>
            <form className="mt-7 grid gap-5" onSubmit={publishStudy}>
              <div className="grid gap-2"><Label htmlFor="study-day">Day</Label><select id="study-day" name="study-day" defaultValue="Sunday" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground"><option>Sunday</option><option>Tuesday</option><option>Thursday</option></select></div>
              <div className="grid gap-2"><Label htmlFor="study-time">Time</Label><Input id="study-time" name="study-time" required placeholder="5:00 PM" /></div>
              <div className="grid gap-2"><Label htmlFor="study-title">Title</Label><Input id="study-title" name="study-title" required placeholder="Study title" /></div>
              <div className="grid gap-2"><Label htmlFor="study-scripture">Scripture</Label><Input id="study-scripture" name="study-scripture" required placeholder="John 15:1-11" /></div>
              <div className="grid gap-2"><Label htmlFor="study-summary">Description</Label><Textarea id="study-summary" name="study-summary" required placeholder="What will students explore?" /></div>
              <div className="grid gap-2"><Label htmlFor="study-document">Study documents</Label><Input id="study-document" name="study-document" type="file" accept=".pdf,.doc,.docx,.txt,.md" multiple required /><p className="text-xs text-muted-foreground">Upload one or more study notes as PDF, Word, Markdown, or text documents.</p></div>
              <Button type="submit" disabled={isPublishingStudy} className="w-full rounded-sm bg-navy text-primary-foreground shadow-none hover:bg-navy-light sm:w-auto"><Save className="size-4" />{isPublishingStudy ? "Publishing..." : "Publish Bible Study"}</Button>
            </form>
            <div className="mt-9 border-t border-line pt-6"><p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">Published studies</p><div className="mt-4 grid gap-3">{sessions.map((session) => <PublishedRow key={session.id} label={`${session.day} · ${session.title}`} onRemove={() => removeStudy(session.id)} />)}</div></div>
          </section>

          <section className="rounded-lg bg-card p-5 shadow-[0_12px_30px_-24px_var(--navy)] ring-1 ring-navy/5 sm:p-9">
            <div className="flex items-center gap-3"><Lightbulb className="size-5 text-gold" /><h2 className="text-2xl font-medium text-navy">Proverbial Digest</h2></div>
            <p className="mt-2 text-sm text-muted-foreground">Publish or replace one digest for each day of the week.</p>
            <form className="mt-7 grid gap-5" onSubmit={publishDigest}>
              <div className="grid gap-2"><Label htmlFor="digest-day">Day</Label><select id="digest-day" name="digest-day" defaultValue="Monday" className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground">{digestDays.map((day) => <option key={day}>{day}</option>)}</select></div>
              <div className="grid gap-2"><Label htmlFor="digest-proverb">Proverb</Label><Textarea id="digest-proverb" name="digest-proverb" required placeholder="Write the day's proverb" /></div>
              <div className="grid gap-2"><Label htmlFor="digest-reflection">Reflection</Label><Textarea id="digest-reflection" name="digest-reflection" required placeholder="Add a short reflection" /></div>
              <div className="grid gap-2"><Label htmlFor="digest-document">Digest images</Label><Input id="digest-document" name="digest-document" type="file" accept="image/*" multiple required /><p className="text-xs text-muted-foreground">Upload one or more daily digest images.</p></div>
              <Button type="submit" disabled={isPublishingDigest} className="w-full rounded-sm bg-navy text-primary-foreground shadow-none hover:bg-navy-light sm:w-auto"><Save className="size-4" />{isPublishingDigest ? "Publishing..." : "Publish Digest"}</Button>
            </form>
            <div className="mt-9 border-t border-line pt-6"><p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">Published digest</p><div className="mt-4 grid gap-3">{digests.map((digest) => <PublishedRow key={digest.id} label={`${digest.day} · ${digest.proverb}`} onRemove={() => removeDigest(digest.id)} />)}</div></div>
          </section>
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-md border border-navy/10 bg-card px-5 py-4 text-sm text-muted-foreground"><CalendarDays className="mt-0.5 size-4 shrink-0 text-gold" /><p>Published content is stored in the Chapel backend and appears on the public pages after a successful upload.</p></div>
      </div>
    </div>
  );
}

function PublishedRow({ label, onRemove }: { label: string; onRemove: () => void }) {
  return <div className="flex min-w-0 items-start justify-between gap-3 rounded-md bg-site px-3 py-3 text-sm text-navy ring-1 ring-line sm:px-4"><span className="min-w-0 flex-1 break-words leading-5">{label}</span><Button type="button" variant="ghost" size="icon" className="size-8 shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive" aria-label={`Remove ${label}`} title={`Remove ${label}`} onClick={onRemove}><Trash2 className="size-4" /></Button></div>;
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result)));
    reader.addEventListener("error", () => reject(new Error("Unable to read the selected document.")));
    reader.readAsDataURL(file);
  });
}

function createEntryId() {
  return typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}