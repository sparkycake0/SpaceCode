"use client";

import { motion } from "framer-motion";
import { Target, Users, Zap } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

const values = [
  {
    icon: Zap,
    title: "Ship, then refine",
    description: "We'd rather get a working version in front of you early than perfect something no one has seen yet.",
  },
  {
    icon: Target,
    title: "Built for the goal",
    description: "Every page has a job — get someone to reach out, buy, or understand something. We design around that.",
  },
  {
    icon: Users,
    title: "You're kept in the loop",
    description: "Regular updates as we build, not a black box that reopens two weeks later with a surprise.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-16 pb-8">
        <SectionHeading
          title="About SpaceCode"
          description="A small web development agency built around one idea: your website should work as hard as you do."
        />
      </Section>

      <Section className="grid gap-12 border-t border-border pt-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-2xl font-medium text-foreground">How we got started</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted">
            <p>
              SpaceCode started as a handful of freelance projects that kept turning
              into something bigger — clients coming back for redesigns, new features,
              entire new products. We put that into one team instead of a scattered
              collection of side gigs.
            </p>
            <p>
              We work mostly with small and mid-sized businesses that need a website
              or web app done properly the first time: something fast, easy to update,
              and built on tools that won't box you in later.
            </p>
            <p>
              We're still a small team on purpose. It means fewer handoffs, faster
              decisions, and someone who actually understands your project answering
              when you reach out.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="font-display text-2xl font-medium text-foreground">What we're aiming for</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Our goal isn't just a site that looks good in a first demo — it's one that
            still makes sense to update a year later, still loads fast, and still
            reflects well on your business. We measure a project's success by whether
            it keeps doing its job long after launch.
          </p>
          <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
            <p className="font-display text-lg text-foreground">
              "Good enough to launch" and "good" shouldn't be different websites.
            </p>
          </div>
        </motion.div>
      </Section>

      <Section className="border-t border-border">
        <SectionHeading title="What we care about" />
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <value.icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-display text-base font-medium text-foreground">{value.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border text-center">
        <SectionHeading align="center" title="Want to work together?" />
        <div className="mt-8 flex justify-center">
          <Button href="/contact">Get in touch</Button>
        </div>
      </Section>
    </>
  );
}
