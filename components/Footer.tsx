import Link from "next/link";
import { Mail } from "lucide-react";
import Github from "@/assets/github-brands-solid-full.svg";
import Instagram from "@/assets/instagram-brands-solid-full.svg";
import { Logo } from "./Logo";
import { navLinks, siteConfig } from "@/lib/site";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-soft">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="font-display text-lg font-medium text-foreground">
              {siteConfig.name}
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {siteConfig.description}
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a
              href={siteConfig.social.github}
              className="text-muted transition-colors hover:text-primary"
            >
              <Image src={Github} alt="" className="h-5 w-5" />
            </a>
            <a
              href={siteConfig.social.instagram}
              className="text-muted transition-colors hover:text-primary"
            >
              <Image src={Instagram} alt="" className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-muted transition-colors hover:text-primary"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-medium text-foreground">
            Navigate
          </h3>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-medium text-foreground">
            Contact
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li>{siteConfig.email}</li>
            <li>{siteConfig.phone}</li>
            <li>{siteConfig.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-6 py-6 text-center text-xs text-muted-dim sm:px-8 lg:px-10">
        © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
      </div>
    </footer>
  );
}
