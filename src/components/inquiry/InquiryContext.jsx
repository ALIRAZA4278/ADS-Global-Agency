"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { InquiryModal } from "@/components/inquiry/InquiryModal";

const InquiryContext = createContext(null);

/**
 * Holds the enquiry modal open/closed state and renders the dialog itself.
 *
 * The modal is mounted here, at the root, rather than inside the hero: the
 * hero animates its content with a transform, and a transformed ancestor
 * becomes the containing block for `position: fixed`, which would trap the
 * overlay inside the hero instead of covering the viewport.
 */
export function InquiryProvider({ children }) {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      open,
      openInquiry: () => setOpen(true),
      closeInquiry: () => setOpen(false),
    }),
    [open]
  );

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <InquiryContext.Provider value={value}>
      {children}
      <InquiryModal open={open} onClose={handleClose} />
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error("useInquiry must be used inside <InquiryProvider>");
  }
  return context;
}
