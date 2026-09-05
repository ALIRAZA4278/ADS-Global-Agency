import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/** Shared input skin for the contact form, the enquiry modal and careers. */
export const fieldClass =
  "w-full rounded-xl border border-line bg-white/[0.03] px-4 py-3 text-sm text-body " +
  "placeholder:text-faint transition-colors duration-200 " +
  "hover:border-line-strong focus:border-brand/60 focus:bg-white/[0.05] focus:outline-none";

export function Field({ label, htmlFor, error, optional, hint, children }) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-faint"
      >
        {label}
        {optional && <span className="normal-case tracking-normal">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : (
        hint && <p className="text-xs text-faint">{hint}</p>
      )}
    </div>
  );
}

export function TextField({ error, className, ...props }) {
  return (
    <input className={cn(fieldClass, error && "border-red-500/60", className)} {...props} />
  );
}

/**
 * `appearance-none` strips the platform arrow along with the rest of the
 * native chrome, which leaves a select looking exactly like a text input —
 * so the chevron is drawn back in manually.
 */
export function SelectField({ error, className, options, ...props }) {
  return (
    <div className="relative">
      <select
        className={cn(
          fieldClass,
          "cursor-pointer appearance-none pr-11",
          error && "border-red-500/60",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-surface-2 text-body">
            {option}
          </option>
        ))}
      </select>

      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
      />
    </div>
  );
}

export function TextAreaField({ error, className, ...props }) {
  return (
    <textarea
      className={cn(fieldClass, "resize-none", error && "border-red-500/60", className)}
      {...props}
    />
  );
}
