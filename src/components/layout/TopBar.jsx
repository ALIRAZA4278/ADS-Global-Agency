import { Mail, MapPin } from "lucide-react";
import { brand } from "@/lib/site";
import { Flag } from "@/components/ui/Flag";

/**
 * Utility strip above the header. The contact details used to live beside the
 * form; with the form moved into the hero they belong somewhere permanent, and
 * a landing page wants them reachable from every scroll position.
 *
 * Social links moved to the footer, so this bar stays focused on "how to
 * reach us right now": email, both direct lines, and the regions served.
 */
export function TopBar() {
  return (
    <div className="border-b border-line bg-ink-2/80 backdrop-blur-xl">
      <div className="shell flex h-12 items-center justify-between gap-5 text-sm">
        <div className="flex min-w-0 items-center gap-6 overflow-x-auto">
          <a
            href={`mailto:${brand.email}`}
            className="flex shrink-0 items-center gap-2 text-muted transition-colors hover:text-white"
          >
            <Mail className="h-4 w-4 shrink-0 text-accent" />
            <span className="truncate">{brand.email}</span>
          </a>

          <span className="hidden shrink-0 items-center gap-2 text-faint sm:flex">
            {brand.phones.map((phone, index) => (
              <span key={phone.country} className="flex items-center gap-2">
                {index > 0 && (
                  <span aria-hidden="true" className="text-line-strong">
                    |
                  </span>
                )}
                <a
                  href={`tel:+${phone.digits}`}
                  className="flex items-center gap-1.5 transition-colors hover:text-white"
                >
                  <Flag country={phone.country} className="h-3 w-4.5 shrink-0 rounded-[2px]" />
                  {phone.display}
                </a>
              </span>
            ))}
          </span>
        </div>

        <span className="hidden shrink-0 items-center gap-2 text-faint lg:flex">
          <MapPin className="h-4 w-4 shrink-0 text-accent" />
          {brand.offices.join(" · ")}
        </span>
      </div>
    </div>
  );
}
