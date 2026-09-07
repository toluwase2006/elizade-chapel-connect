import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen, HeartHandshake, Sparkles, Users } from "lucide-react";
import heroImage from "@/assets/Rectangle 24.png";
import { Button } from "@/components/ui/button";
import galleryItems1  from "@/assets/Rectangle 44.png"
import galleryItems2  from "@/assets/Screenshot 2026-09-07 120042.png"
import { activityItems, galleryItems, purposeItems } from "@/lib/chapel-content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — Elizade University Chapel" },
      { name: "description", content: "Discover worship, fellowship, and spiritual growth at Elizade University Chapel in Ilara-Mokin." },
      { property: "og:title", content: "Home — Elizade University Chapel" },
      { property: "og:description", content: "Discover worship, fellowship, and spiritual growth at Elizade University Chapel in Ilara-Mokin." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      <section className="bg-site py-12 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-12 lg:gap-10">
          <div className="animate-chapel-rise lg:col-span-6">
            <h1 className="max-w-xl text-balance text-4xl font-medium leading-tight text-navy sm:text-5xl lg:text-6xl">
              Welcome to Elizade University Chapel
            </h1>
            <p className="mt-7 max-w-[48ch] text-pretty text-base leading-relaxed text-muted-foreground">
              A community of students growing in faith, fellowship, and the knowledge of Christ within our campus walls and beyond.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild className="h-11 rounded-sm bg-navy px-6 text-primary-foreground shadow-none hover:bg-navy-light">
                <a href="#welcome">About our Chapel</a>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-sm border-navy/20 px-6 text-navy shadow-none hover:bg-navy/5 hover:text-navy">
                <a href="#moments">Explore gallery</a>
              </Button>
            </div>
          </div>
          <div className="animate-chapel-rise relative lg:col-span-6 lg:[animation-delay:120ms]">
            <div className="overflow-hidden rounded-lg bg-sky shadow-[0_20px_60px_-30px_var(--navy)]">
              <img src={heroImage} alt="Students walking near a modern university chapel at sunrise" width={1600} height={1200} className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 -left-5 -z-10 size-28 rounded-lg bg-gold/20 sm:size-32" />
          </div>
        </div>
      </section>

      <section id="welcome" className="bg-card py-20 sm:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 sm:px-6 md:flex-row md:items-center md:gap-20">
          <div className="md:w-1/2">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Our community</p>
            <h2 className="mt-4 max-w-xl text-balance text-3xl font-medium text-navy sm:text-4xl">A spiritual home for every student</h2>
            <p className="mt-7 max-w-[56ch] text-pretty leading-relaxed text-muted-foreground">
              The Elizade University Chapel is a spiritual community where students come together to worship God, grow in spiritual maturity, and build lifelong relationships grounded in the love of Christ.
            </p>
            <p className="mt-5 max-w-[56ch] text-pretty leading-relaxed text-muted-foreground">
              Whether you are looking for a place to serve, a community to pray with, or simply a quiet space to reflect, there is room for you here.
            </p>
            <Button asChild variant="link" className="mt-7 h-auto gap-2 px-0 text-navy hover:text-navy-light">
              <a href="/about">Learn more about us <ArrowRight className="size-4" /></a>
            </Button>
          </div>
          <div className="grid gap-4 md:w-1/2 md:grid-cols-2">
            <img src={galleryItems1} alt="Students praying together in the chapel" width={900} height={1125} loading="lazy" className="aspect-[4/5] w-full rounded-lg object-cover" />
            <img src={galleryItems2} alt="Student playing piano during worship" width={900} height={1125} loading="lazy" className="mt-10 aspect-[4/5] w-full rounded-lg object-cover md:mt-12" />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-sky py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Our purpose</p>
            <h2 className="mt-4 text-balance text-3xl font-medium text-navy sm:text-4xl">Growing together in Christ</h2>
            <div className="mx-auto mt-6 h-px w-12 bg-gold" />
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {purposeItems.map((item) => (
              <article key={item.number} className="group rounded-lg bg-card p-7 shadow-[0_12px_30px_-24px_var(--navy)] ring-1 ring-navy/5 transition-transform duration-200 hover:-translate-y-1">
                <div className="mb-6 grid size-10 place-items-center rounded-sm bg-navy/5 text-xs font-bold text-navy">{item.number}</div>
                <h3 className="text-lg font-medium text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-20 text-primary-foreground sm:py-24">
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-6">
          <p className="mx-auto max-w-3xl text-balance text-2xl font-medium italic leading-tight sm:text-3xl">
            “Let the word of Christ dwell in you richly, teaching and admonishing one another in all wisdom.”
          </p>
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Colossians 3:16</p>
        </div>
      </section>

      <section className="bg-card py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Life together</p>
              <h2 id="moments" className="mt-3 text-3xl font-medium text-navy sm:text-4xl">Moments with us</h2>
              <p className="mt-3 text-sm text-muted-foreground">Explore our fellowship through the lens.</p>
            </div>
            <Button asChild variant="link" className="h-auto justify-start px-0 text-xs font-bold uppercase tracking-[0.14em] text-navy hover:text-navy-light sm:justify-center">
              <a href="/gallery">Full gallery <ArrowRight className="size-4" /></a>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {galleryItems.map((item) => (
              <a key={item.title} href="/gallery" className="group relative overflow-hidden rounded-lg bg-sky">
                <img src={item.image} alt={item.title} width={900} height={900} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/80 to-transparent p-4 pt-10 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground">{item.category}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <div className="rounded-lg bg-card p-8 shadow-[0_16px_50px_-34px_var(--navy)] ring-1 ring-navy/5 sm:p-12">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Support the work</p>
              <h2 className="mt-4 text-3xl font-medium text-navy">Give with purpose</h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">Your generosity helps support the activities and ministry of Elizade University Chapel.</p>
            </div>
            <div className="mt-9 flex justify-center">
              <Button asChild className="rounded-sm bg-navy text-primary-foreground shadow-none hover:bg-navy-light"><a href="/giving">View giving details <ArrowRight className="size-4" /></a></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-12 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Ways to connect</p>
            <h2 className="mt-4 text-3xl font-medium text-navy sm:text-4xl">Make room for community</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {activityItems.map((activity, index) => (
              <article key={activity.title} className="overflow-hidden rounded-lg bg-site ring-1 ring-line transition-shadow hover:shadow-lg">
                <img src={activity.image} alt={activity.title} width={900} height={900} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-gold"><span>0{index + 1}</span><span className="h-px w-7 bg-gold/60" /></div>
                  <h3 className="text-lg font-medium text-navy">{activity.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{activity.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
