import Image from "next/image";
import { team } from "@/lib/site";
import { cn } from "@/lib/utils";
import { SocialIcon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Starfield } from "@/components/ui/Starfield";
import { Tilt3D } from "@/components/ui/Tilt3D";

export function Team() {
  return (
    <section id="team" className="section-y relative scroll-mt-32 overflow-x-clip">
      <Starfield count={40} seed={57} className="opacity-50" />

      <div className="shell relative">
        <SectionHeading
          eyebrow={team.eyebrow}
          title={team.title}
          highlight={team.titleHighlight}
          description={team.description}
        />

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-2">
          {team.members.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.1} className="h-full">
              <Tilt3D innerClassName="rounded-3xl" max={5}>
                <MemberCard member={member} />
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MemberCard({ member }) {
  // Placeholder profiles are hidden rather than rendered as links that go
  // nowhere.
  const socials = member.socials.filter((social) => social.href && social.href !== "#");

  return (
    <figure className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-[linear-gradient(160deg,var(--color-surface-2),var(--color-surface))] transition-colors duration-300 hover:border-line-strong">
      <Portrait member={member} />

      <figcaption className="flex flex-1 flex-col p-7">
        <h3 className="text-xl font-semibold tracking-tight">{member.name}</h3>
        <p className="mt-1.5 text-sm text-accent">{member.role}</p>

        {member.line && (
          <p className="mt-4 text-sm leading-relaxed text-muted">{member.line}</p>
        )}

        {socials.length > 0 && (
          <ul className="mt-auto flex gap-2.5 border-t border-line pt-6">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={`${member.name} on ${social.label}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition-all duration-300 hover:border-brand/50 hover:bg-brand/10 hover:text-white"
                >
                  <SocialIcon name={social.icon} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </figcaption>
    </figure>
  );
}

/**
 * Portrait, or an initials panel while the photo is still a placeholder — so
 * the card reads as finished either way rather than as a broken image.
 */
function Portrait({ member }) {
  const initials = member.name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <div className="relative aspect-4/5 overflow-hidden border-b border-line bg-ink">
      {member.photo ? (
        <Image
          src={member.photo}
          alt={`${member.name}, ${member.role}`}
          fill
          sizes="(min-width: 640px) 24rem, 100vw"
          className={cn(
            "object-cover object-top transition-all duration-700",
            // Colour on hover, echoing the black-and-white studio portrait look.
            "grayscale group-hover:grayscale-0 group-hover:scale-[1.03]"
          )}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            aria-hidden="true"
            className="bg-grid absolute inset-0 opacity-40"
          />
          <span
            aria-hidden="true"
            className="absolute h-40 w-40 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-brand)_28%,transparent),transparent_70%)] blur-2xl"
          />
          <span className="relative text-5xl font-bold tracking-tight text-gradient">
            {initials}
          </span>
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,var(--color-surface-2),transparent)]"
      />
    </div>
  );
}
