import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Instagram, Menu, X } from "lucide-react";

import logoAsset from "@/assets/elizade-university-chapel-logo.png.asset.json";
import { Button } from "@/components/ui/button";

const navigation = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Gallery", to: "/gallery" },
  { label: "Giving", to: "/giving" },
] as const;

export function ChapelNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-site/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
        <Link to="/" aria-label="Elizade University Chapel home" onClick={() => setIsOpen(false)}>
          <img src={logoAsset.url} alt="Elizade University Chapel" width={142} height={58} className="h-11 w-auto object-contain" />
        </Link>

        <nav className="hidden items-center gap-8 sm:flex" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              activeProps={{ className: "text-navy" }}
              inactiveProps={{ className: "text-muted-foreground hover:text-navy" }}
              className="relative text-sm font-medium transition-colors after:absolute after:-bottom-6 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform data-[status=active]:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="text-navy sm:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          title={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {isOpen ? (
        <nav className="border-t border-line bg-site px-5 py-5 shadow-lg sm:hidden" aria-label="Mobile navigation">
          <div className="mx-auto grid max-w-7xl gap-1">
            {navigation.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setIsOpen(false)}
                activeProps={{ className: "bg-navy/5 text-navy" }}
                className="rounded-md px-3 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-navy/5 hover:text-navy"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

export function ChapelFooter() {
  return (
    <footer className="border-t border-line bg-navy py-16 text-primary-foreground sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 md:grid-cols-[1.4fr_0.7fr_0.9fr] md:gap-16">
        <div className="max-w-sm">
          <img src={logoAsset.url} alt="Elizade University Chapel" width={150} height={62} className="h-14 w-auto object-contain object-left" />
          <p className="mt-7 text-sm leading-relaxed text-primary-foreground/65">
            Building a community of students who know Christ, grow in faith and serve with purpose.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <Button variant="outline" size="icon" className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" aria-label="Instagram placeholder" title="Instagram">
              <Instagram />
            </Button>
            <span className="text-xs text-primary-foreground/45">Follow the Chapel community</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Chapel</p>
          <nav className="mt-6 grid gap-3" aria-label="Footer navigation">
            {navigation.map((item) => (
              <Link key={item.label} to={item.to} className="text-sm text-primary-foreground/65 transition-colors hover:text-primary-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">Visit us</p>
          <address className="mt-6 not-italic text-sm leading-7 text-primary-foreground/65">
            Elizade University<br />
            Ilara-Mokin, Ondo State<br />
            Nigeria
          </address>
          <Link to="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground transition-colors hover:text-gold">
            Learn about us <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-7xl flex-col gap-3 border-t border-primary-foreground/10 px-5 pt-6 text-xs text-primary-foreground/40 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© 2026 Elizade University Chapel. All rights reserved.</p>
        <p>Ilara-Mokin, Ondo State, Nigeria</p>
      </div>
    </footer>
  );
}