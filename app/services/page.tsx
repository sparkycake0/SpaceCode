"use client";

import { motion } from "framer-motion";
import { ShoppingCart, LayoutTemplate, LayoutDashboard, Wrench, Search, Paintbrush } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

const services = [
  {
    icon: LayoutTemplate,
    title: "Simple websites",
    description:
      "A handful of pages — home, about, contact — for businesses that need a solid presence online without the extra complexity.",
    includes: ["Up to 5 pages", "Mobile-friendly layout", "Contact form"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Online stores with product catalogs, checkout and everything needed to take orders directly through your site.",
    includes: ["Product & category pages", "Cart & checkout", "Payment integration"],
  },
  {
    icon: LayoutDashboard,
    title: "Web applications",
    description:
      "Custom-built tools and dashboards for internal use or for your customers — built around your exact workflow.",
    includes: ["Custom features", "User accounts", "Admin dashboard"],
  },
  {
    icon: Paintbrush,
    title: "UI / UX design",
    description:
      "Interface design for a new product or a redesign of an existing one, handed off ready to build.",
    includes: ["Wireframes", "Visual design", "Interactive prototype"],
  },
  {
    icon: Search,
    title: "SEO basics",
    description:
      "Making sure your site is set up to actually get found — structure, metadata and performance fundamentals.",
    includes: ["On-page SEO", "Performance tuning", "Search console setup"],
  },
  {
    icon: Wrench,
    title: "Support & maintenance",
    description:
      "Once your site is live, we keep it running — updates, fixes and small feature additions as you need them.",
    includes: ["Monthly updates", "Bug fixes", "Priority response"],
  },
];

export default function ServicesPage() {
  return (
    <Section className="pt-16">
      <SectionHeading
        title="Services"
        description="A few of the things we build most. If what you need doesn't fit neatly into one of these, tell us about it anyway."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="flex flex-col rounded-2xl border border-border bg-surface p-6"
          >
            <service.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-display text-lg font-medium text-foreground">{service.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
            <ul className="mt-5 space-y-1.5 border-t border-border pt-4">
              {service.includes.map((item) => (
                <li key={item} className="flex items-center gap-2 text-xs text-muted-dim">
                  <span className="h-1 w-1 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 rounded-3xl border border-border bg-surface px-8 py-10 text-center sm:px-12">
        <h3 className="font-display text-2xl font-medium text-foreground">Not sure what you need?</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
          Send us a short description of your project and we'll suggest the right approach.
        </p>
        <div className="mt-6 flex justify-center">
          <Button href="/contact">Talk to us</Button>
        </div>
      </div>
    </Section>
  );
}
