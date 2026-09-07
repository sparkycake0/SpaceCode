"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Rocket,
  ShoppingCart,
  LayoutGrid,
  Wrench,
  Star,
  ArrowUpRight,
} from "lucide-react";
import { OrbitHero } from "@/components/home/OrbitHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { getAvgRating, getProjectsCount } from "@/lib/site";

const stats = [
  { value: await getAvgRating(), label: "Average client rating", suffix: "/5" },
  { value: `${await getProjectsCount()}+`, label: "Projects launched" },
  { value: "< 24h", label: "Average first response" },
];

const services = [
  {
    icon: LayoutGrid,
    title: "Business websites",
    description:
      "Fast, clean marketing sites that explain what you do and get people to reach out.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Storefronts built to actually sell — clear product pages and a checkout people finish.",
  },
  {
    icon: Rocket,
    title: "Web applications",
    description:
      "Custom tools and dashboards for the parts of your business that outgrew spreadsheets.",
  },
  {
    icon: Wrench,
    title: "Support & maintenance",
    description:
      "Ongoing updates, fixes and small features once your site is live.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};
const avgRating = await getAvgRating();
export default function HomePage() {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="bg-grid absolute inset-0 h-150" />
        <Section className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:py-28">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              We build websites that launch on time and hold up after
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg"
            >
              SpaceCode is a small web development agency. We design, build and
              ship sites, stores and web apps for teams who want something that
              works — not just something that looks good in a mockup.
            </motion.p>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <Button href="/contact">Start a project</Button>
              <Button href="/projects" variant="ghost">
                See our work
              </Button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-14 grid grid-cols-3 gap-6 border-t border-border pt-8"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-medium text-primary sm:text-3xl">
                    {stat.value}
                    {stat.suffix && (
                      <span className="text-sm text-muted">{stat.suffix}</span>
                    )}
                  </div>
                  <div className="mt-1 text-xs leading-snug text-muted sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <OrbitHero />
          </motion.div>
        </Section>
      </div>

      {/* Services teaser */}
      <Section className="border-t border-border">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            title="What we do"
            description="A short list of the work we take on most — each one built around what your site actually needs to do."
          />
          <Link
            href="/services"
            className="flex items-center gap-1.5 text-sm text-primary hover:text-primary-soft"
          >
            All services <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-2xl border border-border bg-surface p-6 transition-colors duration-200 hover:border-primary/50"
            >
              <service.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-display text-lg font-medium text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Reviews teaser */}
      <Section className="border-t border-border">
        <div className="rounded-3xl border border-border bg-surface px-8 py-12 sm:px-12">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                {Array.from({ length: avgRating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
                <span className="ml-1 font-display text-xl font-medium text-foreground">
                  {avgRating}
                </span>
                <span className="text-sm text-muted">average rating</span>
              </div>
            </div>
            <Button href="/review" variant="ghost">
              Read reviews
            </Button>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="border-t border-border text-center">
        <SectionHeading
          align="center"
          title="Have a project in mind?"
          description="Tell us what you're building and we'll get back to you within a day."
        />
        <div className="mt-8 flex justify-center">
          <Button href="/contact">Get in touch</Button>
        </div>
      </Section>
    </>
  );
}
