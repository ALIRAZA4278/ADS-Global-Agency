import { Mail, MapPin } from "lucide-react";
import { brand } from "@/lib/site";
import { SocialIcon } from "@/components/ui/Icon";

/**
 * Utility strip above the header. The contact details used to live beside the
 * form; with the form moved into the hero they belong somewhere permanent, and
 * a landing page wants them reachable from every scroll position.
 */
export function TopBar() {
  return (
    <div className="border-b border-line bg-ink-2/80 backdrop-blur-xl">
      <div className="shell flex h-10 items-center justify-between gap-4 text-xs">
        <div className="flex min-w-0 items-center gap-5">
          <a
            href={`mailto:${brand.email}`}
            className="flex items-center gap-2 text-muted transition-colors hover:text-white"
          >
            <Mail className="h-3.5 w-3.5 shrink-0 text-accent" />
            <span className="truncate">{brand.email}</span>
          </a>

          <span className="hidden items-center gap-2 text-faint sm:flex">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
            {brand.offices.join(" · ")}
          </span>
        </div>

        <ul className="flex shrink-0 items-center gap-3">
          {brand.socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                aria-label={social.label}
                className="block text-faint transition-colors hover:text-white"
              >
                <SocialIcon name={social.icon} className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
