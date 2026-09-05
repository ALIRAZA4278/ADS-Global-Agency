"use client";

import { useActionState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Mail, MapPin, Phone } from "lucide-react";
import { submitEnquiry } from "@/app/actions";
import { brand, contact } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import {
  Field,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/ui/Field";

const initialState = { status: "idle", errors: {}, values: null };

export function Contact() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

  return (
    <section id="contact" className="section-y relative scroll-mt-24 overflow-x-clip">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/3 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-brand)_14%,transparent),transparent_70%)] blur-3xl"
      />

      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Left: the pitch and the direct details. */}
          <div>
            <Reveal from="none">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                {contact.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-7 text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl">
                Let&apos;s talk about{" "}
                <span className="text-gradient">what you&apos;re building</span>
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 text-pretty leading-relaxed text-muted">
                {contact.description}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-col gap-3">
                <ContactRow
                  icon={Mail}
                  label="Email"
                  value={brand.email}
                  href={`mailto:${brand.email}`}
                />
                <ContactRow
                  icon={Phone}
                  label="Phone"
                  value={brand.phone}
                  href={`tel:${brand.phone.replace(/[^+\d]/g, "")}`}
                />
                <ContactRow
                  icon={MapPin}
                  label="Offices"
                  value={brand.offices.join(" · ")}
                />
              </div>
            </Reveal>
          </div>

          {/* Right: the form. */}
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
                      Thanks — message received
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                      We read every enquiry ourselves and reply within one business
                      day. Keep an eye on your inbox.
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
                    {/* Tells the shared action to expect a written brief. */}
                    <input type="hidden" name="formType" value="full" />

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Name" htmlFor="name" error={state.errors?.name}>
                        <TextField
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="Jane Cooper"
                          defaultValue={state.values?.name}
                          error={state.errors?.name}
                        />
                      </Field>

                      <Field label="Email" htmlFor="email" error={state.errors?.email}>
                        <TextField
                          id="email"
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
                      <Field label="Company" htmlFor="company" optional>
                        <TextField
                          id="company"
                          name="company"
                          type="text"
                          autoComplete="organization"
                          placeholder="Acme Inc."
                          defaultValue={state.values?.company}
                        />
                      </Field>

                      <Field label="Phone / WhatsApp" htmlFor="phone" optional>
                        <TextField
                          id="phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="+1 555 019 4477"
                          defaultValue={state.values?.phone}
                        />
                      </Field>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="Service" htmlFor="service">
                        <SelectField
                          id="service"
                          name="service"
                          options={contact.serviceOptions}
                          defaultValue={
                            state.values?.service || contact.serviceOptions[0]
                          }
                        />
                      </Field>

                      <Field label="Budget" htmlFor="budget">
                        <SelectField
                          id="budget"
                          name="budget"
                          options={contact.budgets}
                          defaultValue={state.values?.budget || contact.budgets[1]}
                        />
                      </Field>
                    </div>

                    <Field
                      label="Project details"
                      htmlFor="message"
                      error={state.errors?.message}
                    >
                      <TextAreaField
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="What are you building, and what does success look like?"
                        defaultValue={state.values?.message}
                        error={state.errors?.message}
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

function ContactRow({ icon: Glyph, label, value, href }) {
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-ink text-accent transition-colors duration-300 group-hover:border-accent/40">
        <Glyph className="h-4.5 w-4.5" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs uppercase tracking-[0.14em] text-faint">
          {label}
        </span>
        <span className="block truncate text-sm text-body/90">{value}</span>
      </span>
    </>
  );

  const className =
    "group flex items-center gap-4 rounded-2xl border border-transparent p-3 transition-colors duration-300 hover:border-line hover:bg-white/[0.02]";

  return href ? (
    <a href={href} className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
