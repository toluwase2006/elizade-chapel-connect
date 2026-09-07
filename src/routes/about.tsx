import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Heart, Landmark, ShieldCheck, Sprout, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import communityImage from "@/assets/Subtract.png"

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Elizade University Chapel" },
      { name: "description", content: "Learn about the vision, mission, values, and community of Elizade University Chapel." },
      { property: "og:title", content: "About — Elizade University Chapel" },
      { property: "og:description", content: "Learn about the vision, mission, values, and community of Elizade University Chapel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const values = [
  { title: "Faith", icon: Sprout, text: "We keep growing in trust, prayer, and the knowledge of Christ." },
  { title: "Love", icon: Heart, text: "We make room for people, listen generously, and care for one another." },
  { title: "Integrity", icon: ShieldCheck, text: "We choose honesty and character in the classroom, Chapel, and community." },
  { title: "Service", icon: Landmark, text: "We use our gifts to make a meaningful difference around us." },
  { title: "Fellowship", icon: Users, text: "We believe faith becomes richer when it is lived together." },
  { title: "Growth", icon: Sprout, text: "We welcome questions and pursue spiritual maturity with humility." },
];

function AboutPage() {
  return (
    <div>
      <section className="bg-navy py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">About the Chapel</p>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-medium leading-tight sm:text-6xl">A community committed to knowing Christ, growing together, and serving others.</h1>
          <p className="mt-7 max-w-2xl text-pretty leading-relaxed text-primary-foreground/70">At Elizade University Chapel, faith and university life meet in a community that welcomes questions, encourages growth, and makes space for every student.</p>
        </div>
        
      </section>

      <section className="bg-card py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Who we are</p>
            <h2 className="mt-4 text-3xl font-medium text-navy sm:text-4xl">A spiritual heartbeat on campus</h2>
          </div>
          <div className="space-y-5 leading-relaxed text-muted-foreground">
            <p>We are a Christian community made up of students, staff, and friends of Elizade University who desire to worship God, study His Word, and serve with purpose.</p>
            <p>Our Chapel is a place of worship, friendship, reflection, and practical service. We want every student to find a community where they can be known, encouraged, and equipped for the life ahead.</p>
          </div>
        </div>
      </section>

      <section className="bg-sky py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-lg bg-navy p-8 text-primary-foreground sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Our vision</p>
              <h2 className="mt-4 text-3xl font-medium">Students shaped by Christ for lives of purpose.</h2>
              <p className="mt-5 leading-relaxed text-primary-foreground/70">We envision a campus community where students are rooted in faith, strengthened by fellowship, and prepared to serve wherever God leads them.</p>
            </div>
            <div className="rounded-lg bg-card p-8 ring-1 ring-line sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Our mission</p>
              <h2 className="mt-4 text-3xl font-medium text-navy">To worship, disciple, connect, and serve.</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">Through worship gatherings, Bible conversations, prayer, fellowship, and service, we help students live out a thoughtful and active Christian faith.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-12 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">What guides us</p>
            <h2 className="mt-4 text-3xl font-medium text-navy sm:text-4xl">Values we live by</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return <article key={value.title} className="rounded-lg bg-site p-7 ring-1 ring-line transition-shadow hover:shadow-lg"><div className="grid size-10 place-items-center rounded-sm bg-navy/5 text-navy"><Icon className="size-5" /></div><h3 className="mt-6 text-lg font-medium text-navy">{value.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{value.text}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="bg-site py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-6 md:grid-cols-2 md:gap-20">
          <div className="overflow-hidden rounded-lg"><img src={communityImage} alt="Students connecting in fellowship on campus" width={900} height={900} loading="lazy" className=" w-full object-cover" /></div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Our community</p>
            <h2 className="mt-4 text-3xl font-medium text-navy sm:text-4xl">There is a place for you here.</h2>
            <p className="mt-6 leading-relaxed text-muted-foreground">Leadership information, ministry teams, and student groups can be added here as the Chapel community continues to grow.</p>
            <Button asChild className="mt-8 rounded-sm bg-navy text-primary-foreground shadow-none hover:bg-navy-light"><Link to="/gallery">See community moments <ArrowRight className="size-4" /></Link></Button>
          </div>
        </div>
      </section>
    </div>
  );
}