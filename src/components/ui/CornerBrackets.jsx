import { cn } from "@/lib/utils";

/**
 * Thin L-shaped brackets on two opposite corners — the framing device that
 * marks out the hero and the process panel.
 */
export function CornerBrackets({ className, size = "3.5rem", inset = "0px" }) {
  const shared = "absolute border-current";
  const style = { width: size, height: size };

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{ padding: inset }}
    >
      <span
        className={cn(shared, "rounded-tl-xl border-l border-t")}
        style={{ ...style, left: inset, top: inset }}
      />
      <span
        className={cn(shared, "rounded-br-xl border-b border-r")}
        style={{ ...style, right: inset, bottom: inset }}
      />
    </div>
  );
}
