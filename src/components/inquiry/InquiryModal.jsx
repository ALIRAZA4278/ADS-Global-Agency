"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { inquiry } from "@/lib/site";
import { InquiryForm } from "@/components/inquiry/InquiryForm";

/**
 * Hosts the enquiry form for CTAs further down the page, where scrolling all
 * the way back to the hero form would be the alternative.
 */
export function InquiryModal({ open, onClose }) {
  const panelRef = useRef(null);
  const firstFieldRef = useRef(null);

  // Esc closes, and the page behind must not scroll while the dialog is up.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog so keyboard and screen-reader users land here.
    const focusTimer = setTimeout(() => firstFieldRef.current?.focus(), 80);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      clearTimeout(focusTimer);
    };
  }, [open, onClose]);

  // Keep Tab inside the dialog for as long as it is open.
  useEffect(() => {
    if (!open) return;

    const handleTab = (event) => {
      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          data-lenis-prevent
          className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-ink/85 p-4 backdrop-blur-md sm:items-center sm:p-6"
          onMouseDown={(event) => {
            // Only a click that starts on the backdrop closes — dragging a text
            // selection out of the panel should not dismiss the form.
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="inquiry-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative my-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] p-6 shadow-[0_40px_120px_-40px_var(--color-brand)] sm:p-9"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-brand),var(--color-accent),transparent)]"
            />

            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:bg-white/[0.06] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <h2
              id="inquiry-title"
              className="pr-12 text-2xl font-bold tracking-tight sm:text-3xl"
            >
              {inquiry.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {inquiry.description}
            </p>

            <div className="mt-7">
              <InquiryForm
                idPrefix="modal"
                firstFieldRef={firstFieldRef}
                onDone={onClose}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
