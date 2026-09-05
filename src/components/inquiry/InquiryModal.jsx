"use client";

import { useActionState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, X } from "lucide-react";
import { submitEnquiry } from "@/app/actions";
import { budgetOptions, inquiry, serviceOptions } from "@/lib/site";
import { Field, SelectField, TextField } from "@/components/ui/Field";
import { cn } from "@/lib/utils";

const initialState = { status: "idle", errors: {}, values: null };

export function InquiryModal({ open, onClose }) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
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

  const succeeded = state.status === "success";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
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

            {succeeded ? (
              <div className="flex min-h-72 flex-col items-center justify-center text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                  <Check className="h-7 w-7" />
                </span>
                <h2 id="inquiry-title" className="mt-6 text-xl font-semibold tracking-tight">
                  {inquiry.successTitle}
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                  {inquiry.successBody}
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-7 rounded-full border border-line px-6 py-2.5 text-sm text-body transition-colors hover:border-line-strong hover:bg-white/[0.06]"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2
                  id="inquiry-title"
                  className="pr-12 text-2xl font-bold tracking-tight sm:text-3xl"
                >
                  {inquiry.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {inquiry.description}
                </p>

                <form action={formAction} className="mt-7 flex flex-col gap-5" noValidate>
                  {/* Tells the shared action to require a phone number instead
                      of a written brief. */}
                  <input type="hidden" name="formType" value="modal" />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" htmlFor="inq-name" error={state.errors?.name}>
                      <TextField
                        ref={firstFieldRef}
                        id="inq-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jane Cooper"
                        defaultValue={state.values?.name}
                        error={state.errors?.name}
                      />
                    </Field>

                    <Field label="Email" htmlFor="inq-email" error={state.errors?.email}>
                      <TextField
                        id="inq-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="jane@company.com"
                        defaultValue={state.values?.email}
                        error={state.errors?.email}
                      />
                    </Field>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Company" htmlFor="inq-company" optional>
                      <TextField
                        id="inq-company"
                        name="company"
                        type="text"
                        autoComplete="organization"
                        placeholder="Acme Inc."
                        defaultValue={state.values?.company}
                      />
                    </Field>

                    <Field
                      label="Phone / WhatsApp"
                      htmlFor="inq-phone"
                      error={state.errors?.phone}
                    >
                      <TextField
                        id="inq-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+1 555 019 4477"
                        defaultValue={state.values?.phone}
                        error={state.errors?.phone}
                      />
                    </Field>
                  </div>

                  <Field label="Service" htmlFor="inq-service">
                    <SelectField
                      id="inq-service"
                      name="service"
                      options={serviceOptions}
                      defaultValue={state.values?.service || serviceOptions[0]}
                    />
                  </Field>

                  <Field label="Budget" htmlFor="inq-budget">
                    <SelectField
                      id="inq-budget"
                      name="budget"
                      options={budgetOptions}
                      defaultValue={state.values?.budget || budgetOptions[1]}
                    />
                  </Field>

                  <button
                    type="submit"
                    disabled={pending}
                    className={cn(
                      "group mt-1 inline-flex h-13 items-center justify-center gap-2 rounded-full text-sm font-medium text-white",
                      "bg-[linear-gradient(100deg,var(--color-brand-deep),var(--color-brand)_45%,var(--color-accent))]",
                      "shadow-[0_10px_40px_-14px_var(--color-brand)] transition-all duration-300",
                      "hover:shadow-[0_16px_50px_-12px_var(--color-brand)]",
                      "disabled:cursor-not-allowed disabled:opacity-60"
                    )}
                  >
                    {pending ? "Sending…" : "Send enquiry"}
                    {!pending && (
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    )}
                  </button>

                  <p className="text-center text-xs text-faint">
                    We&apos;ll never share your details. Replies within one business day.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
