"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Layers } from "lucide-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/utils/firebase";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/lib/projects";
import Image from "next/image";

async function fetchProject(id: string): Promise<Project | null> {
  const q = query(collection(firestore, "projects"), where("id", "==", id));
  const snapshot = await getDocs(q);
  const docSnap = snapshot.docs[0];

  if (!docSnap) return null;

  return {
    id: docSnap.data().id,
    ...docSnap.data(),
  } as Project;
}

export default function ProjectDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    fetchProject(id)
      .then((result) => {
        if (cancelled) return;
        if (!result) {
          setNotFound(true);
        } else {
          setProject(result);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch project:", err);
        if (!cancelled) setNotFound(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <Section className="pt-16">
        <p className="text-sm text-muted">Loading project…</p>
      </Section>
    );
  }

  if (notFound || !project) {
    return (
      <Section className="pt-16 text-center">
        <h1 className="font-display text-2xl font-medium text-foreground">
          Project not found
        </h1>
        <p className="mt-3 text-sm text-muted">
          This project may have been removed or the link is incorrect.
        </p>
        <div className="mt-6 flex justify-center">
          <Button href="/projects" showArrow={false}>
            Back to projects
          </Button>
        </div>
      </Section>
    );
  }

  const meta = [
    { icon: User, label: "Client", value: project.client },
    { icon: Layers, label: "Category", value: project.category },
    { icon: Clock, label: "Duration", value: project.duration },
    { icon: Calendar, label: "Year", value: project.year },
  ];

  return (
    <>
      <Section className="pt-16 pb-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          All projects
        </Link>

        <div className="mt-8 flex flex-wrap items-start justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-wide text-muted-dim">
              {project.category}
            </span>
            <h1 className="mt-2 font-display text-3xl font-medium tracking-tight text-foreground sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              {project.summary}
            </p>
          </div>
          {project.liveUrl && (
            <Button href={project.liveUrl}>Visit site</Button>
          )}
        </div>
      </Section>

      <Section className="border-t border-border pt-10">
        <div
          className="flex h-72 items-center justify-center rounded-2xl border border-border sm:h-96"
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
      </Section>

      <Section className="grid gap-12 border-t border-border pt-14 lg:grid-cols-[1fr_0.7fr]">
        <div className="space-y-10">
          <div>
            <h2 className="font-display text-xl font-medium text-foreground">
              Overview
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {project.description}
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-medium text-foreground">
              The challenge
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {project.challenge}
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-medium text-foreground">
              What we did
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {project.solution}
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-medium text-foreground">
              Results
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {project.results}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-display text-sm font-medium text-foreground">
              Project details
            </h3>
            <dl className="mt-5 space-y-4">
              {meta.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <item.icon className="mt-0.5 h-4 w-4 text-primary" />
                  <div>
                    <dt className="text-xs text-muted-dim">{item.label}</dt>
                    <dd className="text-sm text-foreground">{item.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-display text-sm font-medium text-foreground">
              Role
            </h3>
            <p className="mt-2 text-sm text-muted">{project.role}</p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6">
            <h3 className="font-display text-sm font-medium text-foreground">
              Built with
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
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
        </div>
      </Section>

      <Section className="border-t border-border text-center">
        <h2 className="font-display text-2xl font-medium text-foreground">
          Have a similar project in mind?
        </h2>
        <div className="mt-6 flex justify-center gap-4">
          <Button href="/contact">Start a project</Button>
          <Button href="/projects" variant="ghost" showArrow={false}>
            Back to projects
          </Button>
        </div>
      </Section>
    </>
  );
}
