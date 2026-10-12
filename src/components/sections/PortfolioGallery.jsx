"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, MousePointer2, Plus, X } from "lucide-react";
import { gallery } from "@/lib/site";
import manifest from "@/lib/portfolio-gallery.json";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ALL = "all";
// Tiles rendered up front; "Load more" adds the next batch. Together with
// next/image's lazy loading, only what's near the viewport is ever fetched.
const PAGE_SIZE = 12;
// Column widths of the grid, so each tile downloads at the size it's shown
// rather than the source's 1600px.
const TILE_SIZES = "(min-width: 1024px) 23vw, (min-width: 640px) 31vw, 46vw";
// Every piece sits in the same square browser-window frame (most of the work
// is square, so most of it fills the frame exactly). Work taller than that
// scrolls through the frame on hover; anything shorter is shown whole,
// centred on its own edge colour.
const FRAME_RATIO = 1;

const labels = Object.fromEntries(
  manifest.categories.map(({ slug, label }) => [slug, label])
);

const tabs = [
  { slug: ALL, label: "All work", count: manifest.items.length },
  ...manifest.categories.map(({ slug, label }) => ({
    slug,
    label,
    count: manifest.items.filter((item) => item.category === slug).length,
  })),
];

const noopSubscribe = () => () => {};

/** False during SSR and hydration, true after: gates the body portal. */
function useIsClient() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

function describe(item) {
  const kind = labels[item.category];
  return item.title ? `${kind} for ${item.title}` : kind;
}

/**
 * The main portfolio: real work in browser-window frames, filterable, with a
 * lightbox for the full-size view. Images are pre-optimised WebP (see
 * scripts/optimize-portfolio.mjs) served through next/image.
 */
export function PortfolioGallery() {
  const [filter, setFilter] = useState(ALL);
  const [shown, setShown] = useState(PAGE_SIZE);
  const [openIndex, setOpenIndex] = useState(null);
  const lastTileRef = useRef(null);
  const isClient = useIsClient();

  const items =
    filter === ALL
      ? manifest.items
      : manifest.items.filter((item) => item.category === filter);
  const visible = items.slice(0, shown);

  const selectTab = (slug) => {
    setFilter(slug);
    setShown(PAGE_SIZE);
  };

  const open = (index, tile) => {
    lastTileRef.current = tile;
    setOpenIndex(index);
  };

  const close = useCallback(() => {
    setOpenIndex(null);
    // Hand focus back to the tile that opened the lightbox.
    lastTileRef.current?.focus();
  }, []);

  return (
    <section id="portfolio" className="section-y relative">
      <div className="shell">
        <SectionHeading
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          highlight={gallery.titleHighlight}
          description={gallery.description}
        />

        <Reveal delay={0.14} className="mt-10 flex justify-center">
          <div className="inline-flex max-w-full flex-wrap justify-center gap-1 rounded-3xl border border-line bg-white/2 p-1.5">
            {tabs.map((tab) => (
              <button
                key={tab.slug}
                type="button"
                onClick={() => selectTab(tab.slug)}
                aria-pressed={filter === tab.slug}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors duration-200",
                  filter === tab.slug ? "text-white" : "text-muted hover:text-white"
                )}
              >
                {filter === tab.slug && (
                  <motion.span
                    layoutId="gallery-filter-pill"
                    className="absolute inset-0 rounded-full bg-[linear-gradient(100deg,var(--color-brand-deep),var(--color-brand))]"
                    transition={{ type: "spring", stiffness: 340, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {tab.label}
                  <span className="ml-1.5 text-xs opacity-60">{tab.count}</span>
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {visible.map((item, index) => (
            <Tile key={item.src} item={item} onOpen={(tile) => open(index, tile)} />
          ))}
        </div>

        {shown < items.length && (
          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShown((count) => count + PAGE_SIZE)}
            >
              <Plus className="h-4 w-4" />
              Load more
              <span className="text-muted">
                ({items.length - shown} more)
              </span>
            </Button>
          </div>
        )}
      </div>

      {/* Portalled to <body>: the section has content-visibility (paint
          containment), which would otherwise make it the containing block
          for this position: fixed overlay. The portal stays mounted so
          AnimatePresence can still play the closing fade. */}
      {isClient &&
        createPortal(
          <AnimatePresence>
            {openIndex !== null && (
              <Lightbox
                items={items}
                index={openIndex}
                onIndex={setOpenIndex}
                onClose={close}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
}

function Tile({ item, onOpen }) {
  const ratio = item.height / item.width;
  const scrolls = ratio > FRAME_RATIO + 0.02;

  return (
    <motion.button
      type="button"
      onClick={(event) => onOpen(event.currentTarget)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
      aria-label={`View ${describe(item)}`}
      className={cn(
        "group/tile flex w-full flex-col overflow-hidden rounded-2xl border border-line-strong text-left",
        "bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))]",
        "transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-1 hover:border-brand/50",
        "hover:shadow-[0_30px_70px_-35px_var(--color-brand)]"
      )}
    >
      {/* Browser chrome */}
      <span className="flex h-8 shrink-0 items-center gap-2 border-b border-line px-3 sm:h-9 sm:px-3.5">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e]/80" />
          <span className="h-2 w-2 rounded-full bg-[#28c840]/80" />
        </span>
        <span className="min-w-0 flex-1 truncate text-[0.65rem] font-medium text-muted sm:text-xs">
          {item.title ?? labels[item.category]}
        </span>
        <Expand
          aria-hidden="true"
          className="hidden h-3.5 w-3.5 shrink-0 text-faint transition-colors group-hover/tile:text-accent sm:block"
        />
      </span>

      {/* Viewport. `container-type: size` lets the scroll distance be
          expressed in the frame's own height (cqh) in pure CSS. */}
      <span
        className="relative block aspect-square w-full overflow-hidden [container-type:size]"
        style={{ backgroundColor: item.background }}
      >
        {scrolls ? (
          <Image
            src={item.src}
            alt=""
            width={item.width}
            height={item.height}
            sizes={TILE_SIZES}
            placeholder="blur"
            blurDataURL={item.blurDataURL}
            // Longer pieces take longer to travel, so the pace stays even.
            style={{ transitionDuration: `${Math.round((ratio - FRAME_RATIO) * 3000 + 1500)}ms` }}
            className="absolute inset-x-0 top-0 h-auto w-full transition-transform ease-in-out group-hover/tile:translate-y-[calc(-100%+100cqh)] group-focus-visible/tile:translate-y-[calc(-100%+100cqh)]"
          />
        ) : (
          <Image
            src={item.src}
            alt=""
            fill
            sizes={TILE_SIZES}
            placeholder="blur"
            blurDataURL={item.blurDataURL}
            className="object-contain transition-transform duration-700 ease-out group-hover/tile:scale-[1.04]"
          />
        )}

        {scrolls && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 right-3 hidden items-center gap-1.5 rounded-full border border-white/15 bg-ink/70 px-2.5 py-1 text-[0.65rem] font-medium text-white backdrop-blur-sm transition-opacity duration-300 group-hover/tile:opacity-0 sm:inline-flex"
          >
            <MousePointer2 className="h-3 w-3" />
            Hover to scroll
          </span>
        )}
      </span>
    </motion.button>
  );
}

function Lightbox({ items, index, onIndex, onClose }) {
  const item = items[index];
  const closeRef = useRef(null);

  const step = useCallback(
    (direction) => onIndex((index + direction + items.length) % items.length),
    [index, items.length, onIndex]
  );

  useEffect(() => {
    closeRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") step(1);
      else if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, step]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={describe(item)}
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex flex-col bg-ink/95 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <p className="min-w-0 text-sm">
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-accent">
            {labels[item.category]}
          </span>
          {item.title && (
            <span className="ml-3 font-semibold text-white">{item.title}</span>
          )}
          <span className="ml-3 text-faint">
            {index + 1} / {items.length}
          </span>
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-body transition-colors hover:border-line-strong hover:bg-white/[0.06]"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-20">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={item.src}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            onClick={(event) => event.stopPropagation()}
            className="relative h-full w-full"
          >
            <Image
              src={item.src}
              alt={describe(item)}
              fill
              sizes="(min-width: 640px) 85vw, 100vw"
              placeholder="blur"
              blurDataURL={item.blurDataURL}
              className="rounded-xl object-contain"
            />
          </motion.div>
        </AnimatePresence>

        <LightboxArrow side="left" onClick={() => step(-1)} />
        <LightboxArrow side="right" onClick={() => step(1)} />
      </div>
    </motion.div>
  );
}

function LightboxArrow({ side, onClick }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={cn(
        "absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-ink/70 text-body backdrop-blur-sm transition-colors hover:border-brand/50 hover:bg-brand/15 hover:text-white",
        side === "left" ? "left-3 sm:left-5" : "right-3 sm:right-5"
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
