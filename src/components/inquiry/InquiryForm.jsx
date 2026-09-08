"use client";

import { useActionState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { submitEnquiry } from "@/app/actions";
import { budgetOptions, inquiry, serviceOptions } from "@/lib/site";
import { cn } from "@/lib/utils";
import {
  Field,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/Field";

const initialState = { status: "idle", errors: {}, values: null };

/**
 * The enquiry form itself, hosted both inline in the hero and inside the
 * modal. Field ids are namespaced by `idPrefix` because both hosts can be
 * mounted at once and duplicate ids would break every label association.
 */
export function InquiryForm({ idPrefix, firstFieldRef, onDone }) {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const id = (name) => `${idPrefix}-${name}`;

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-80 flex-col items-center justify-center text-center"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-6 text-xl font-semibold tracking-tight">
          {inquiry.successTitle}
        </h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          {inquiry.successBody}
        </p>
        {onDone && (
          <button
            type="button"
            onClick={onDone}
            className="mt-7 rounded-full border border-line px-6 py-2.5 text-sm text-body transition-colors hover:border-line-strong hover:bg-white/[0.06]"
          >
            Close
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor={id("name")} error={state.errors?.name}>
          <TextField
            ref={firstFieldRef}
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Cooper"
            defaultValue={state.values?.name}
            error={state.errors?.name}
          />
        </Field>

        <Field label="Email" htmlFor={id("email")} error={state.errors?.email}>
          <TextField
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            defaultValue={state.values?.email}
            error={state.errors?.email}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company" htmlFor={id("company")} optional>
          <TextField
            id={id("company")}
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Acme Inc."
            defaultValue={state.values?.company}
          />
        </Field>

        <Field
          label="Phone / WhatsApp"
          htmlFor={id("phone")}
          error={state.errors?.phone}
        >
          <TextField
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 555 019 4477"
            defaultValue={state.values?.phone}
            error={state.errors?.phone}
          />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Service" htmlFor={id("service")}>
          <SelectField
            id={id("service")}
            name="service"
            options={serviceOptions}
            defaultValue={state.values?.service || serviceOptions[0]}
          />
        </Field>

        <Field label="Budget" htmlFor={id("budget")}>
          <SelectField
            id={id("budget")}
            name="budget"
            options={budgetOptions}
            defaultValue={state.values?.budget || budgetOptions[1]}
          />
        </Field>
      </div>

      <Field label="Project details" htmlFor={id("message")} optional>
        <TextAreaField
          id={id("message")}
          name="message"
          rows={3}
          placeholder="What are you building, and what does success look like?"
          defaultValue={state.values?.message}
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
        {pending ? "Sending…" : "Get my free proposal"}
        {!pending && (
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        )}
      </button>

      <p className="flex items-center justify-center gap-2 text-xs text-faint">
        <ShieldCheck className="h-3.5 w-3.5" />
        No spam. We reply within one business day.
      </p>
    </form>
  );
}
