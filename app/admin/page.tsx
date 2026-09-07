"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Newspaper,
  FolderKanban,
  LayoutDashboard,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ADMIN_PASSWORD as ENV_ADMIN_PASSWORD, siteConfig } from "@/lib/site";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/utils/firebase";
import { Project } from "@/lib/projects";

const ADMIN_PASSWORD = ENV_ADMIN_PASSWORD;
console.log(ADMIN_PASSWORD);
type Tab = "overview" | "news" | "projects";

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);

  return unlocked ? (
    <AdminDashboard />
  ) : (
    <PasswordGate onSuccess={() => setUnlocked(true)} />
  );
}

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (value === ADMIN_PASSWORD) {
      setError(false);
      onSuccess();
    } else {
      setError(true);
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-140px)] items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8"
      >
        <div className="flex flex-col items-center text-center">
          <Logo className="h-10 w-10" />
          <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <h1 className="mt-4 font-display text-xl font-medium text-foreground">
            Team access
          </h1>
          <p className="mt-1.5 text-sm text-muted">
            Enter the shared password to reach the admin dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <input
              type="password"
              autoFocus
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(false);
              }}
              placeholder="Password"
              className={`w-full rounded-lg border bg-background-soft px-4 py-2.5 text-sm text-foreground placeholder:text-muted-dim focus:outline-none ${
                error
                  ? "border-red-500/60"
                  : "border-border-light focus:border-primary"
              }`}
            />
            {error && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-red-400">
                <AlertCircle className="h-3.5 w-3.5" />
                That password isn't right — check with the team.
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-primary py-2.5 text-sm font-medium text-background transition-colors hover:bg-primary-soft"
          >
            Enter dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("overview");

  const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "news", label: "Post news", icon: Newspaper },
    { id: "projects", label: "Post project", icon: FolderKanban },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-medium text-foreground">
            {siteConfig.name} admin
          </h1>
          <p className="mt-1 text-sm text-muted">
            Post updates to the site — visible only to your team.
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-2 overflow-x-auto border-b border-border pb-px">
        {tabs.map((t) => (
          <button
            type="button"
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm transition-colors ${
              tab === t.id
                ? "border-primary text-primary"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-10">
        {tab === "overview" && <OverviewTab />}
        {tab === "news" && <NewsForm />}
        {tab === "projects" && <ProjectForm />}
      </div>
    </div>
  );
}

function OverviewTab() {
  const stats = [
    { label: "Published projects", value: "2" },
    { label: "News posts", value: "1" },
    { label: "Reviews", value: "1" },
  ];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-surface p-6"
          >
            <div className="font-display text-2xl font-medium text-primary">
              {stat.value}
            </div>
            <div className="mt-1 text-sm text-muted">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6 text-sm leading-relaxed text-muted">
        These numbers are placeholders. Once the database is connected, this tab
        is a good place to show real counts, recent submissions, and pending
        reviews to approve.
      </div>
    </div>
  );
}

function NewsForm() {
  const [submitted, setSubmitted] = useState(false);
  const [input, setInput] = useState({
    title: "",
    date: Date.now(),
    content: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, "news"), input);
    } catch (err) {
      console.log(err);
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <SuccessState
        message="News post saved"
        onReset={() => setSubmitted(false)}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-5 rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <div>
        <label className="text-sm text-muted" htmlFor="news-title">
          Title
        </label>
        <input
          id="news-title"
          required
          type="text"
          onChange={(e) => {
            setInput({ ...input, title: e.target.value });
          }}
          placeholder="e.g. We launched a new service"
          className="mt-2 w-full rounded-lg border border-border-light bg-background-soft px-4 py-2.5 text-sm text-foreground placeholder:text-muted-dim focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label className="text-sm text-muted" htmlFor="news-content">
          Content
        </label>
        <textarea
          id="news-content"
          required
          rows={6}
          onChange={(e) => {
            setInput({ ...input, content: e.target.value });
          }}
          placeholder="Write the announcement..."
          className="mt-2 w-full resize-none rounded-lg border border-border-light bg-background-soft px-4 py-2.5 text-sm text-foreground placeholder:text-muted-dim focus:border-primary focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-full bg-primary py-2.5 text-sm font-medium text-background transition-colors hover:bg-primary-soft"
      >
        Publish news post
      </button>
    </form>
  );
}

function FormField({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-sm text-muted" htmlFor={htmlFor}>
        {label}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted-dim">{hint}</p>}
    </div>
  );
}

const fieldClass =
  "mt-2 w-full rounded-lg border border-border-light bg-background-soft px-4 py-2.5 text-sm text-foreground placeholder:text-muted-dim focus:border-primary focus:outline-none";

function ProjectForm() {
  const [submitted, setSubmitted] = useState(false);
  const [input, setInput] = useState<Project>({
    title: "",
    image: "",
    id: "",
    category: "",
    year: "",
    client: "",
    duration: "",
    role: "",
    liveUrl: "",
    summary: "",
    description: "",
    challenge: "",
    solution: "",
    results: "",
    tags: [],
  });
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await addDoc(collection(firestore, "projects"), input);
    } catch (err) {
      console.log(err);
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <SuccessState
        message="Project saved"
        onReset={() => setSubmitted(false)}
      />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl space-y-10 rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      {/* Basic info */}
      <div className="space-y-5">
        <h3 className="font-display text-sm font-medium text-foreground">
          Basic info
        </h3>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Title" htmlFor="project-title">
            <input
              id="project-title"
              required
              onChange={(e) => {
                setInput({ ...input, title: e.target.value });
              }}
              type="text"
              placeholder="Bramble Goods"
              className={fieldClass}
            />
          </FormField>
          <FormField
            label="URL slug (id)"
            htmlFor="project-id"
            hint="Used in the page address, e.g. /projects/bramble-goods"
          >
            <input
              id="project-id"
              required
              type="text"
              onChange={(e) => {
                setInput({ ...input, id: e.target.value });
              }}
              placeholder="bramble-goods"
              className={fieldClass}
            />
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Category" htmlFor="project-category">
            <select
              id="project-category"
              className={fieldClass}
              onChange={(e) => setInput({ ...input, category: e.target.value })}
              defaultValue=""
            >
              <option value="" disabled>
                Select one
              </option>
              <option value={"Business Website"}>Business website</option>
              <option value={"E-commerce"}>E-commerce</option>
              <option value={"Web Application"}>Web application</option>
            </select>
          </FormField>
          <FormField label="Year" htmlFor="project-year">
            <input
              id="project-year"
              required
              onChange={(e) => setInput({ ...input, year: e.target.value })}
              type="text"
              placeholder="2026"
              className={fieldClass}
            />
          </FormField>
        </div>
      </div>

      {/* Client & role */}
      <div className="space-y-5 border-t border-border pt-8">
        <h3 className="font-display text-sm font-medium text-foreground">
          Client & role
        </h3>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Client" htmlFor="project-client">
            <input
              id="project-client"
              type="text"
              onChange={(e) => setInput({ ...input, client: e.target.value })}
              placeholder="Client name"
              className={fieldClass}
            />
          </FormField>
          <FormField label="Duration" htmlFor="project-duration">
            <input
              id="project-duration"
              type="text"
              onChange={(e) => setInput({ ...input, duration: e.target.value })}
              placeholder="6 weeks"
              className={fieldClass}
            />
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Our role" htmlFor="project-role">
            <input
              id="project-role"
              type="text"
              onChange={(e) => setInput({ ...input, role: e.target.value })}
              placeholder="Design, development & Stripe integration"
              className={fieldClass}
            />
          </FormField>
          <FormField label="Live URL" htmlFor="project-url">
            <input
              id="project-url"
              type="url"
              onChange={(e) => setInput({ ...input, liveUrl: e.target.value })}
              placeholder="https://"
              className={fieldClass}
            />
          </FormField>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 border-t border-border pt-8">
        <h3 className="font-display text-sm font-medium text-foreground">
          Content
        </h3>

        <FormField
          label="Short summary"
          htmlFor="project-summary"
          hint="Shown on the projects list card"
        >
          <textarea
            id="project-summary"
            required
            onChange={(e) => setInput({ ...input, summary: e.target.value })}
            rows={2}
            placeholder="One or two sentences"
            className={`${fieldClass} resize-none`}
          />
        </FormField>
        <FormField
          label="Image"
          htmlFor="image"
          hint="Shown on the projects list card"
        >
          <input
            type="text"
            id="image"
            required
            onChange={(e) => setInput({ ...input, summary: e.target.value })}
            placeholder="Enter url of image or screenshot of project"
            className={`${fieldClass} resize-none`}
          />
        </FormField>
        <FormField
          label="Full description"
          htmlFor="project-description"
          hint="The overview section on the project's own page"
        >
          <textarea
            id="project-description"
            required
            rows={4}
            onChange={(e) =>
              setInput({ ...input, description: e.target.value })
            }
            placeholder="What the project was and why it was built"
            className={`${fieldClass} resize-none`}
          />
        </FormField>

        <FormField
          label="Challenge"
          htmlFor="project-challenge"
          hint="What problem the client came to you with"
        >
          <textarea
            id="project-challenge"
            rows={3}
            onChange={(e) => setInput({ ...input, challenge: e.target.value })}
            placeholder="What wasn't working before"
            className={`${fieldClass} resize-none`}
          />
        </FormField>

        <FormField
          label="Solution"
          htmlFor="project-solution"
          hint="What you actually built"
        >
          <textarea
            id="project-solution"
            rows={3}
            onChange={(e) => setInput({ ...input, solution: e.target.value })}
            placeholder="How you solved it"
            className={`${fieldClass} resize-none`}
          />
        </FormField>

        <FormField
          label="Results"
          htmlFor="project-results"
          hint="Outcomes or metrics, once available"
        >
          <textarea
            id="project-results"
            rows={2}
            onChange={(e) => setInput({ ...input, results: e.target.value })}
            placeholder="e.g. conversion rate, load time, inquiries"
            className={`${fieldClass} resize-none`}
          />
        </FormField>
      </div>

      {/* Tags */}
      <div className="space-y-5 border-t border-border pt-8">
        <FormField label="Tech tags (comma separated)" htmlFor="project-tags">
          <input
            id="project-tags"
            type="text"
            onChange={(e) =>
              setInput({
                ...input,
                tags: e.target.value.split(",").map((tag) => tag.trim()),
              })
            }
            placeholder="Next.js, Tailwind CSS, Stripe"
            className={fieldClass}
          />
        </FormField>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-primary py-2.5 text-sm font-medium text-background transition-colors hover:bg-primary-soft"
      >
        Publish project
      </button>
    </form>
  );
}

function SuccessState({
  message,
  onReset,
}: {
  message: string;
  onReset: () => void;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-10 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-primary" />
        <p className="font-display text-lg font-medium text-foreground">
          {message}
        </p>
        <p className="max-w-xs text-sm text-muted">
          This is a placeholder confirmation — nothing is saved until this form
          is connected to your database.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="mt-2 rounded-full border border-border-light px-5 py-2 text-sm text-foreground hover:border-primary hover:text-primary"
        >
          Add another
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
