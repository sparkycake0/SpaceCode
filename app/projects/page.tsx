"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/utils/firebase";
import Image from "next/image";

type ProjectsSmall = {
  id: string;
  image: string;
  title: string;
  summary: string;
  tags: string[];
  category: string;
  year: string;
};
export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectsSmall[] | null>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const snapshot = await getDocs(collection(firestore, "projects"));
        const projectsFormated = snapshot.docs.map((doc) => ({
          id: doc.data().id,
          title: doc.data().title,
          summary: doc.data().summary,
          category: doc.data().category,
          tags: doc.data().tags,
          image: doc.data().image,
          year: doc.data().year,
        }));
        setProjects(projectsFormated as any);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);
  return (
    <Section className="pt-16">
      <SectionHeading
        title="Projects"
        description="A selection of what we've built. These two are placeholders — they'll be replaced with real case studies pulled from the database."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {projects?.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <Link
              href={`/projects/${project.id}`}
              className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-colors duration-200 hover:border-primary/50"
            >
              <div
                className="flex h-52 items-center justify-center border-b border-border"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-surface-light), var(--color-background))",
                }}
              >
                <Image
                  src={project.image}
                  alt=""
                  width={200}
                  height={200}
                  className="w-full h-full"
                  unoptimized
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wide text-muted-dim">
                    {project.category}
                  </span>
                  <span className="text-xs text-muted-dim">{project.year}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <h3 className="font-display text-xl font-medium text-foreground">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="h-4 w-4 text-muted transition-colors group-hover:text-primary" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {project.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border-light px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
