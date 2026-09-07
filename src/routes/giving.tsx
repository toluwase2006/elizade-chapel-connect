import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/giving")({
  head: () => ({
    meta: [
      { title: "Giving — Elizade University Chapel" },
      { name: "description", content: "Support the work and ministry of Elizade University Chapel through the official giving details." },
      { property: "og:title", content: "Giving — Elizade University Chapel" },
      { property: "og:description", content: "Support the work and ministry of Elizade University Chapel through the official giving details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GivingPage,
});

const accountNumber = "[Account Number]";

function GivingPage() {
  const [copied, setCopied] = useState(false);

  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
    } catch {
      // The confirmation remains useful in browsers where clipboard access is unavailable.
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div>
      <section className="bg-navy py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Give with purpose</p>
          <h1 className="mt-5 max-w-2xl text-4xl font-medium leading-tight sm:text-6xl">Support the work</h1>
          <p className="mt-6 max-w-xl leading-relaxed text-primary-foreground/70">Your generosity helps support the work, activities, and ministry of Elizade University Chapel.</p>
        </div>
      </section>

      <section className="bg-sky py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <div className="rounded-lg bg-card p-7 shadow-[0_18px_60px_-38px_var(--navy)] ring-1 ring-navy/5 sm:p-12">
            <div className="border-b border-line pb-8">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Official bank details</p>
              <h2 className="mt-4 text-2xl font-medium text-navy sm:text-3xl">Thank you for supporting our community.</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">The Chapel does not process online payments. Please use the official account details below when they have been confirmed by the Chapel.</p>
            </div>
            <dl className="mt-8 grid gap-7">
              <div><dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Bank name</dt><dd className="mt-2 text-lg font-medium text-navy">[Bank Name]</dd></div>
              <div><dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Account name</dt><dd className="mt-2 text-lg font-medium text-navy">[Account Name]</dd></div>
              <div className="border-t border-line pt-7"><dt className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Account number</dt><dd className="mt-2 break-all text-2xl font-medium tracking-wide text-navy">{accountNumber}</dd></div>
            </dl>
            <Button type="button" onClick={copyAccountNumber} className="mt-9 w-full rounded-sm bg-navy text-primary-foreground shadow-none hover:bg-navy-light"><span>{copied ? <Check className="size-4" /> : <Copy className="size-4" />}</span>{copied ? "Account number copied!" : "Copy account number"}</Button>
            <p className="mt-4 text-center text-xs text-muted-foreground">Official bank details will be added here once supplied by the Chapel.</p>
          </div>
        </div>
      </section>
    </div>
  );
}