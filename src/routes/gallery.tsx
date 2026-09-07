import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import heroImage from "@/assets/chapel-hero.jpg";
import { galleryItems } from "@/lib/chapel-content";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Elizade University Chapel" },
      { name: "description", content: "Explore moments of worship, fellowship, service, and celebration from Elizade University Chapel." },
      { property: "og:title", content: "Gallery — Elizade University Chapel" },
      { property: "og:description", content: "Explore moments of worship, fellowship, service, and celebration from Elizade University Chapel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex === null ? null : galleryItems[selectedIndex];

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") setSelectedIndex((current) => current === null ? 0 : (current + 1) % galleryItems.length);
      if (event.key === "ArrowLeft") setSelectedIndex((current) => current === null ? 0 : (current - 1 + galleryItems.length) % galleryItems.length);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div>
      <section className="bg-navy py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Through the lens</p>
            <h1 className="mt-5 text-4xl font-medium sm:text-6xl">Chapel gallery</h1>
            <p className="mt-6 max-w-xl leading-relaxed text-primary-foreground/70">Moments of worship, fellowship, service, and celebration from our university community.</p>
          </div>
          <div className="overflow-hidden rounded-lg bg-navy-light ring-1 ring-primary-foreground/10">
            <img src={heroImage} alt="Worship gathering at Elizade University Chapel" width={1200} height={900} className="aspect-[4/3] w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-card py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item, index) => (
              <Button key={item.title} variant="ghost" className="group relative block h-auto overflow-hidden rounded-lg bg-sky p-0 text-left hover:bg-sky" onClick={() => setSelectedIndex(index)} aria-label={`Open ${item.title}`}>
                <img src={item.image} alt={item.title} width={900} height={900} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 to-transparent p-5 pt-16 text-primary-foreground">
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-gold">{item.category}</span>
                  <span className="mt-1 block text-base font-medium">{item.title}</span>
                </span>
              </Button>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={selectedIndex !== null} onOpenChange={(open) => !open && setSelectedIndex(null)}>
        <DialogContent className="max-w-5xl border-0 bg-navy p-2 text-primary-foreground sm:p-3">
          <DialogTitle className="sr-only">{selected?.title ?? "Gallery image"}</DialogTitle>
          <DialogDescription className="sr-only">{selected?.category ?? "Chapel gallery"}</DialogDescription>
          {selected ? <div className="relative overflow-hidden rounded-md bg-navy-light"><img src={selected.image} alt={selected.title} width={900} height={900} className="max-h-[78vh] w-full object-contain" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy to-transparent p-6 pt-16"><p className="text-xs font-bold uppercase tracking-[0.14em] text-gold">{selected.category}</p><p className="mt-1 text-lg font-medium">{selected.title}</p></div></div> : null}
          <DialogCloseButton onClick={() => setSelectedIndex(null)} />
          <Button variant="outline" size="icon" className="absolute left-4 top-1/2 z-10 -translate-y-1/2 border-primary-foreground/30 bg-navy/70 text-primary-foreground hover:bg-navy hover:text-primary-foreground" aria-label="Previous image" title="Previous image" onClick={() => setSelectedIndex((current) => current === null ? 0 : (current - 1 + galleryItems.length) % galleryItems.length)}><ChevronLeft /></Button>
          <Button variant="outline" size="icon" className="absolute right-4 top-1/2 z-10 -translate-y-1/2 border-primary-foreground/30 bg-navy/70 text-primary-foreground hover:bg-navy hover:text-primary-foreground" aria-label="Next image" title="Next image" onClick={() => setSelectedIndex((current) => current === null ? 0 : (current + 1) % galleryItems.length)}><ChevronRight /></Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DialogCloseButton({ onClick }: { onClick: () => void }) {
  return <Button variant="outline" size="icon" className="absolute right-4 top-4 z-10 border-primary-foreground/30 bg-navy/70 text-primary-foreground hover:bg-navy hover:text-primary-foreground" aria-label="Close gallery" title="Close gallery" onClick={onClick}><X /></Button>;
}