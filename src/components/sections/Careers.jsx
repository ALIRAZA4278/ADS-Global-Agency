"use client";

import { useActionState, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Paperclip, X } from "lucide-react";
import { submitApplication } from "@/app/actions";
import { careers } from "@/lib/site";
import { cn } from "@/lib/utils";
import {
  Field,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/Field";
import { Reveal } from "@/components/ui/Reveal";
import { Starfield } from "@/components/ui/Starfield";

const initialState = { status: "idle", errors: {}, values: null };

export function Careers() {
  const [state, formAction, pending] = useActionState(submitApplication, initialState);

  return (
    <section id="careers" className="section-y relative scroll-mt-24 overflow-x-clip">
      <Starfield count={40} seed={41} className="opacity-50" />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/4 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-accent)_10%,transparent),transparent_70%)] blur-3xl"
      />

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Pitch */}
          <div>
            <Reveal from="none">
              <p className="text-xs font-medium uppercase tracking-[0.34em] text-accent sm:text-sm">
                {careers.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-5 text-balance text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl">
                {careers.title}{" "}
                <span className="text-gradient">{careers.titleHighlight}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted">
                {careers.description}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <ul className="mt-9 flex flex-col gap-3">
                {careers.perks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-body/85">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-accent/35 bg-accent/10 text-accent">
                      <Check className="h-3 w-3" />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Application form */}
          <Reveal from="left" delay={0.1}>
            <div className="relative rounded-3xl border border-line bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] p-7 sm:p-9">
              <AnimatePresence mode="wait">
                {state.status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-96 flex-col items-center justify-center text-center"
                  >
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
                      <Check className="h-7 w-7" />
                    </span>
                    <h3 className="mt-6 text-xl font-semibold tracking-tight">
                      {careers.successTitle}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                      {careers.successBody}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    action={formAction}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col gap-5"
                    noValidate
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Name" htmlFor="job-name" error={state.errors?.name}>
                        <TextField
                          id="job-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Jane Cooper"
                          defaultValue={state.values?.name}
                          error={state.errors?.name}
                        />
                      </Field>

                      <Field label="Email" htmlFor="job-email" error={state.errors?.email}>
                        <TextField
                          id="job-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          placeholder="jane@email.com"
                          defaultValue={state.values?.email}
                          error={state.errors?.email}
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Phone" htmlFor="job-phone" error={state.errors?.phone}>
                        <TextField
                          id="job-phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+1 555 019 4477"
                          defaultValue={state.values?.phone}
                          error={state.errors?.phone}
                        />
                      </Field>

                      <Field
                        label="Position"
                        htmlFor="job-position"
                        error={state.errors?.position}
                      >
                        <SelectField
                          id="job-position"
                          name="position"
                          options={careers.positions}
                          defaultValue={state.values?.position || careers.positions[0]}
                          error={state.errors?.position}
                        />
                      </Field>
                    </div>

                    <Field
                      label="Portfolio URL"
                      htmlFor="job-portfolio"
                      optional
                      error={state.errors?.portfolio}
                      hint="GitHub, Behance, Dribbble or your own site."
                    >
                      <TextField
                        id="job-portfolio"
                        name="portfolio"
                        type="url"
                        inputMode="url"
                        placeholder="https://your-work.com"
                        defaultValue={state.values?.portfolio}
                        error={state.errors?.portfolio}
                      />
                    </Field>

                    <Field
                      label="Short intro"
                      htmlFor="job-intro"
                      error={state.errors?.intro}
                    >
                      <TextAreaField
                        id="job-intro"
                        name="intro"
                        rows={4}
                        placeholder="What do you do well, and what are you looking for next?"
                        defaultValue={state.values?.intro}
                        error={state.errors?.intro}
                      />
                    </Field>

                    <ResumeField error={state.errors?.resume} />

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
                      {pending ? "Sending…" : "Submit application"}
                      {!pending && (
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * File input styled as a dropzone-ish button.
 *
 * A file input can't be given a value from React, so a rejected submission
 * can't repopulate it — the filename is tracked locally so the applicant can
 * at least see what is currently attached.
 */
function ResumeField({ error }) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  return (
    <Field
      label="Résumé"
      htmlFor="job-resume"
      error={error}
      hint="PDF or Word document, up to 4MB."
    >
      <input
        ref={inputRef}
        id="job-resume"
        name="resume"
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="sr-only"
        onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
      />

      <div
        className={cn(
          "flex items-center gap-3 rounded-xl border border-dashed px-4 py-3.5 transition-colors duration-200",
          error ? "border-red-500/60" : "border-line-strong hover:border-brand/50"
        )}
      >
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-body transition-colors hover:bg-white/[0.08]"
        >
          <Paperclip className="h-3.5 w-3.5" />
          Choose file
        </button>

        <span className="min-w-0 flex-1 truncate text-sm text-faint">
          {fileName || "No file selected"}
        </span>

        {fileName && (
          <button
            type="button"
            aria-label="Remove file"
            onClick={() => {
              if (inputRef.current) inputRef.current.value = "";
              setFileName("");
            }}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </Field>
  );
}
