"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { StarRatingDisplay, StarRatingInput } from "@/components/ui/StarRating";
import { Button } from "@/components/ui/Button";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "@/utils/firebase";
import { getAvgRating } from "@/lib/site";

type Review = {
  rating: number | null;
  name: string | null;
  company?: string | null;
  text: string | null;
  date: number;
};
const avgRating = await getAvgRating();

export default function ReviewPage() {
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [input, setInput] = useState<Review>({
    rating: null,
    name: null,
    company: null,
    text: null,
    date: Date.now(),
  });
  const [reviews, setReviews] = useState<Review[] | null>(null);
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await addDoc(collection(firestore, "reviews"), input);
    setSubmitted(true);
  }
  useEffect(() => {
    async function fetchReviews() {
      const snapshot = await getDocs(collection(firestore, "reviews"));
      const reviewsFormatted = snapshot.docs.map((doc) => ({
        rating: doc.data().rating,
        name: doc.data().name,
        company: doc.data().company,
        text: doc.data().text,
        date: doc.data().date,
      }));
      setReviews(reviewsFormatted);
    }
    fetchReviews();
  }, []);

  return (
    <Section className="pt-16">
      <SectionHeading
        title="Reviews"
        description="What clients have said about working with us, and a place to leave your own."
      />

      <div className="mt-10 flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-surface px-6 py-5">
        <span className="font-display text-3xl font-medium text-foreground">
          {avgRating}
        </span>
        <div>
          <StarRatingDisplay rating={avgRating} />
        </div>
      </div>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        {/* Review list */}
        <div className="space-y-5">
          {reviews?.map((review) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <StarRatingDisplay rating={review.rating ?? 0} />
              <p className="mt-4 text-sm leading-relaxed text-foreground">
                {review.text}
              </p>
              <div className="mt-5 border-t border-border pt-4">
                <p className="text-sm font-medium text-foreground">
                  {review.name}
                </p>
                <p className="text-xs text-muted-dim">
                  {review.company} · {new Date(review.date).toLocaleString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Review form */}
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <h3 className="font-display text-lg font-medium text-foreground">
            Leave a review
          </h3>
          <p className="mt-1 text-sm text-muted">
            Tell others what it was like working with us.
          </p>

          {submitted ? (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 py-10 text-center">
              <CheckCircle2 className="h-10 w-10 text-primary" />
              <p className="font-display text-base font-medium text-foreground">
                Thanks for the review
              </p>
              <p className="max-w-xs text-sm text-muted">
                This is a placeholder confirmation — submissions aren't saved
                yet.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="text-sm text-muted" htmlFor="rating">
                  Your rating
                </label>
                <div className="mt-2">
                  <StarRatingInput
                    value={rating}
                    onChange={(e) => {
                      setRating(e);
                      setInput({ ...input, rating: e });
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  required
                  type="text"
                  onChange={(e) => setInput({ ...input, name: e.target.value })}
                  placeholder="Your name"
                  className="mt-2 w-full rounded-lg border border-border-light bg-background-soft px-4 py-2.5 text-sm text-foreground placeholder:text-muted-dim focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-muted" htmlFor="company">
                  Company (optional)
                </label>
                <input
                  id="company"
                  type="text"
                  onChange={(e) =>
                    setInput({ ...input, company: e.target.value })
                  }
                  placeholder="Where you work"
                  className="mt-2 w-full rounded-lg border border-border-light bg-background-soft px-4 py-2.5 text-sm text-foreground placeholder:text-muted-dim focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm text-muted" htmlFor="text">
                  Your review
                </label>
                <textarea
                  id="text"
                  required
                  rows={4}
                  onChange={(e) => setInput({ ...input, text: e.target.value })}
                  placeholder="What was it like working with us?"
                  className="mt-2 w-full resize-none rounded-lg border border-border-light bg-background-soft px-4 py-2.5 text-sm text-foreground placeholder:text-muted-dim focus:border-primary focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                showArrow={false}
                className="w-full justify-center"
              >
                Submit review
              </Button>
            </form>
          )}
        </div>
      </div>
    </Section>
  );
}
