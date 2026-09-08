"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { about, team } from "@/lib/site";
import { Icon, SocialIcon } from "@/components/ui/Icon";
import { Reveal, Stagger } from "@/components/ui/Reveal";

export function About() {
  return (
    // overflow-x-clip rather than overflow-hidden: `hidden` turns this into a
    // scroll container, which stops the founder panel below from sticking.
    <section id="about" className="section-y relative overflow-x-clip">
      {/* Soft wash so the section separates from the ones either side. */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-brand)_10%,transparent),transparent_70%)] blur-3xl"
      />

      <div className="shell">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          {/* Copy */}
          <div>
            <Reveal from="none">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-muted">
                {about.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <p className="mt-7 text-lg font-medium leading-relaxed text-brand-soft">
                {about.kicker}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl md:text-[2.75rem]">
                We create <span className="text-gradient">digital excellence</span>
              </h2>
            </Reveal>

            {about.paragraphs.map((paragraph, index) => (
              <Reveal key={paragraph} delay={0.16 + index * 0.06}>
                <p className="mt-5 text-pretty leading-relaxed text-muted">
                  {paragraph}
                </p>
              </Reveal>
            ))}

            <Stagger className="mt-10 flex flex-col gap-4" delay={0.1}>
              {about.values.map((value) => (
                <Stagger.Item key={value.title}>
                  <div className="group flex gap-4 rounded-2xl border border-transparent p-4 transition-colors duration-300 hover:border-line hover:bg-white/[0.02]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-ink text-accent transition-colors duration-300 group-hover:border-accent/40">
                      <Icon name={value.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold tracking-tight">
                        {value.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </Stagger.Item>
              ))}
            </Stagger>
          </div>

          {/* The founders, where the stat panel used to sit. */}
          <Reveal from="left" delay={0.1} className="lg:sticky lg:top-32">
            <div className="relative rounded-3xl border border-line bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] p-2">
              {/* Rotating conic sheen behind the panel edge. */}
              <motion.div
                aria-hidden="true"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-40 [background:conic-gradient(from_0deg,transparent,var(--color-brand),transparent_38%,var(--color-accent),transparent_75%)] blur-[2px]"
              />

              <div className="rounded-[1.25rem] bg-ink-2 p-6 sm:p-7">
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
                  {team.eyebrow}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">
                  {team.title}{" "}
                  <span className="text-gradient">{team.titleHighlight}</span>
                </h3>

                {/* Two up even on the narrowest screens — a full-width 4:5
                    portrait would take most of a phone viewport on its own. */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {team.members.map((member) => (
                    <TeamMember key={member.name} member={member} />
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/**
 * Compact founder card for the About panel.
 *
 * Falls back to an initials tile while `photo` is still null, and hides social
 * entries left as "#" rather than rendering links that go nowhere.
 */
function TeamMember({ member }) {
  const socials = member.socials.filter((social) => social.href && social.href !== "#");
  const initials = member.name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <figure className="group flex flex-col">
      <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-line bg-ink">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`${member.name}, ${member.role}`}
            fill
            sizes="(min-width: 640px) 14rem, 50vw"
            className="object-cover object-top grayscale transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span aria-hidden="true" className="bg-grid absolute inset-0 opacity-40" />
            <span
              aria-hidden="true"
              className="absolute h-24 w-24 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-brand)_30%,transparent),transparent_70%)] blur-2xl"
            />
            <span className="relative text-3xl font-bold tracking-tight text-gradient">
              {initials}
            </span>
          </div>
        )}
      </div>

      <figcaption className="mt-4">
        <h4 className="text-sm font-semibold tracking-tight">{member.name}</h4>
        <p className="mt-0.5 text-xs text-accent">{member.role}</p>

        {socials.length > 0 && (
          <ul className="mt-3 flex gap-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={`${member.name} on ${social.label}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:border-brand/50 hover:bg-brand/10 hover:text-white"
                >
                  <SocialIcon name={social.icon} className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </figcaption>
    </figure>
  );
}
