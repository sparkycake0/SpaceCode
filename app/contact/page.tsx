"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/utils/firebase";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  { icon: MapPin, label: "Location", value: siteConfig.location },
  { icon: Clock, label: "Response time", value: "Within a day" },
];
type Messages = {
  name: string;
  email: string;
  project: string;
  details: string;
};
export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [input, setInput] = useState<Messages>({
    name: "",
    email: "",
    project: "",
    details: "",
  });
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await addDoc(collection(firestore, "message"), input);
    setSubmitted(true);
  }

  return (
    <Section className="pt-16">
      <SectionHeading
        title="Contact"
        description="Leave your details and a bit about your project — we'll get back to you within a day."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Contact info */}
        <div className="space-y-4">
          {contactDetails.map((detail, i) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <detail.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-dim">{detail.label}</p>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="text-sm text-foreground hover:text-primary"
                  >
                    {detail.value}
                  </a>
                ) : (
                  <p className="text-sm text-foreground">{detail.value}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact form */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <CheckCircle2 className="h-10 w-10 text-primary" />
              <p className="font-display text-lg font-medium text-foreground">
                Message sent
              </p>
              <p className="max-w-xs text-sm text-muted">
                Thanks for reaching out — we'll be in touch within a day.
                (Placeholder confirmation; this form isn't connected to anything
                yet.)
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm text-muted" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    required
                    onChange={(e) =>
                      setInput({ ...input, name: e.target.value })
                    }
                    type="text"
                    placeholder="Your name"
                    className="mt-2 w-full rounded-lg border border-border-light bg-background-soft px-4 py-2.5 text-sm text-foreground placeholder:text-muted-dim focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    required
                    type="email"
                    onChange={(e) =>
                      setInput({ ...input, email: e.target.value })
                    }
                    placeholder="you@company.com"
                    className="mt-2 w-full rounded-lg border border-border-light bg-background-soft px-4 py-2.5 text-sm text-foreground placeholder:text-muted-dim focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted" htmlFor="budget">
                  Project type
                </label>
                <select
                  id="budget"
                  className="mt-2 w-full rounded-lg border border-border-light bg-background-soft px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none"
                  defaultValue=""
                  onChange={(e) =>
                    setInput({ ...input, project: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select one
                  </option>
                  <option value={"Business website"}>Business website</option>
                  <option value={"E-commerce"}>E-commerce</option>
                  <option value={"Web application"}>Web application</option>
                  <option value={"Support & maintenance"}>
                    Support & maintenance
                  </option>
                  <option value={"Something else"}>Something else</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-muted" htmlFor="message">
                  Project details
                </label>
                <textarea
                  id="message"
                  required
                  onChange={(e) =>
                    setInput({ ...input, details: e.target.value })
                  }
                  rows={5}
                  placeholder="Tell us a bit about what you're looking to build"
                  className="mt-2 w-full resize-none rounded-lg border border-border-light bg-background-soft px-4 py-2.5 text-sm text-foreground placeholder:text-muted-dim focus:border-primary focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                showArrow={false}
                className="w-full justify-center"
              >
                Send message
              </Button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
