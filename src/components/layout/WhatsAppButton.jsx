"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { brand } from "@/lib/site";
import { SocialIcon } from "@/components/ui/Icon";

const WHATSAPP_GREEN = "#25D366";

/**
 * Floating WhatsApp chat button, bottom-right on every page.
 *
 * Kept in WhatsApp's own green rather than the site palette — it is a
 * recognised affordance, and people scan for that colour rather than read the
 * button.
 */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  // Hold it back until the visitor has moved past the hero, where the enquiry
  // form is already the primary call to action.
  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const href = `https://wa.me/${brand.whatsapp.digits}?text=${encodeURIComponent(
    brand.whatsapp.message
  )}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Chat with us on WhatsApp at ${brand.whatsapp.display}`}
          initial={{ opacity: 0, scale: 0.8, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 12 }}
          transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="group/wa fixed bottom-6 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_12px_36px_-8px_rgba(37,211,102,0.7)] sm:bottom-8 sm:right-8"
          style={{ backgroundColor: WHATSAPP_GREEN }}
        >
          {/* Attention ring, purely decorative. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full animate-pulse-ring"
            style={{ backgroundColor: WHATSAPP_GREEN }}
          />

          <SocialIcon name="whatsapp" className="relative h-7 w-7" />

          {/* Label slides out on hover; hidden from touch, which has no hover. */}
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-line bg-ink px-4 py-2 text-sm text-body opacity-0 shadow-lg transition-opacity duration-300 group-hover/wa:opacity-100 lg:block">
            Chat on WhatsApp
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
