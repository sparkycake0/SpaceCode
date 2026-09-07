"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/utils/firebase";

type News = {
  id: string;
  title: string;
  content: string;
  date: Date;
};
export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      const query = await getDocs(collection(firestore, "news"));

      const newsData = query.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNews(newsData as any);
    };

    fetchNews();
  }, []);

  return (
    <Section className="pt-16">
      <SectionHeading
        title="News"
        description="Updates from the studio — new projects, new services, and anything else worth sharing."
      />

      <div className="mt-14 space-y-5">
        {news === null ? (
          <p>There isn't any news right now.</p>
        ) : (
          news.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
            >
              <div className="flex items-center gap-2 text-xs text-muted-dim">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.date).toLocaleString()}
              </div>

              <h2 className="mt-3 font-display text-xl font-medium text-foreground sm:text-2xl">
                {post.title}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {post.content}
              </p>
            </motion.article>
          ))
        )}
      </div>
    </Section>
  );
}
