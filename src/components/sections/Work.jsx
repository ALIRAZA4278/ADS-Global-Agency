"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { work } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tilt3D } from "@/components/ui/Tilt3D";
import { useInquiry } from "@/components/inquiry/InquiryContext";

export function Work() {
  const { openInquiry } = useInquiry();
  const [filter, setFilter] = useState("All");

  const visible =
    filter === "All"
      ? work.projects
      : work.projects.filter((project) => project.category === filter);

  return (
    <section id="work" className="section-y relative scroll-mt-24">
      <div className="shell">
        <SectionHeading
          eyebrow={work.eyebrow}
          title={work.title}
          highlight={work.titleHighlight}
          description={work.description}
        />

        <Reveal delay={0.14} className="mt-10 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-line bg-white/[0.02] p-1">
            {work.categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors duration-200",
                  filter === category ? "text-white" : "text-muted hover:text-white"
                )}
              >
                {filter === category && (
                  <motion.span
                    layoutId="work-filter-pill"
                    className="absolute inset-0 rounded-full bg-[linear-gradient(100deg,var(--color-brand-deep),var(--color-brand))]"
                    transition={{ type: "spring", stiffness: 340, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                // Only widen the bookends on the unfiltered set — a filtered
                // list would leave the double-width cards stranded in a
                // half-empty row.
                featured={filter === "All" && project.featured}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <Button onClick={openInquiry} variant="outline" size="lg">
            Start a project like these
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectCard({ project, featured }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn("h-full", featured && "md:col-span-2")}
    >
      <Tilt3D innerClassName="rounded-3xl" max={featured ? 4 : 7}>
        <div
          className={cn(
            "group relative flex h-full overflow-hidden rounded-3xl border border-line",
            "bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))]",
            "transition-colors duration-300 hover:border-line-strong",
            featured ? "flex-col lg:flex-row" : "flex-col"
          )}
        >
          <Thumbnail project={project} featured={featured} />

          <div
            className={cn(
              "flex flex-1 flex-col p-7",
              featured && "lg:justify-center lg:p-9"
            )}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-accent">
                  {project.category}
                </p>
                <h3
                  className={cn(
                    "mt-2 font-semibold tracking-tight",
                    featured ? "text-2xl sm:text-3xl" : "text-xl"
                  )}
                >
                  {project.title}
                </h3>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-faint transition-all duration-300 group-hover:border-brand/50 group-hover:bg-brand/10 group-hover:text-white">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>

            <p
              className={cn(
                "mt-3 leading-relaxed text-muted",
                featured ? "max-w-lg text-base" : "text-sm"
              )}
            >
              {project.description}
            </p>

            {/* The outcome the project was measured against. */}
            <div className="mt-6 flex items-baseline gap-3 border-t border-line pt-6">
              <span
                className={cn(
                  "font-semibold tracking-tight text-gradient",
                  featured ? "text-4xl" : "text-3xl"
                )}
              >
                {project.metric}
              </span>
              <span className="text-xs uppercase tracking-[0.14em] text-faint">
                {project.metricLabel}
              </span>
            </div>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {project.tech.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-[0.7rem] text-faint"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Tilt3D>
    </motion.article>
  );
}

/** Abstract project visual — a mock browser window tinted per project. */
function Thumbnail({ project, featured }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-line",
        featured
          ? "aspect-16/10 border-b lg:aspect-auto lg:w-[46%] lg:border-b-0 lg:border-r"
          : "aspect-16/10 border-b"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-linear-to-br opacity-25 transition-all duration-700 group-hover:scale-105 group-hover:opacity-40",
          project.accent
        )}
      />
      <div className="bg-grid absolute inset-0 opacity-40" />

      <div className="absolute inset-0 flex flex-col p-5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="ml-3 h-5 flex-1 rounded-md border border-white/10 bg-white/[0.04]" />
        </div>

        <div className="flex flex-1 flex-col justify-center gap-2.5 pt-6">
          <span className="h-2.5 w-2/5 rounded-full bg-white/25" />
          <span className="h-2 w-3/5 rounded-full bg-white/12" />
          <span className="h-2 w-1/2 rounded-full bg-white/10" />
          <div className="mt-3 flex gap-2">
            <span className="h-7 w-24 rounded-full bg-white/20" />
            <span className="h-7 w-20 rounded-full border border-white/15" />
          </div>
        </div>
      </div>

      <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[0.7rem] text-white/70 backdrop-blur-sm">
        {project.year}
      </span>
    </div>
  );
}
