"use server";

import { brand } from "@/lib/site";
import { sendApplicationEmail, sendEnquiryEmail } from "@/lib/mail";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Digits with the punctuation people actually type: + ( ) - . and spaces.
const PHONE_PATTERN = /^\+?[\d\s().-]{7,20}$/;

const RESUME_MAX_BYTES = 4 * 1024 * 1024;
const RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const text = (formData, key) => (formData.get(key) ?? "").toString().trim();

// Bots fill in every field they find; people never see this one.
const isBot = (formData) => text(formData, "website") !== "";

const DELIVERY_FAILED = `We couldn't send that just now. Please try again, or email us at ${brand.email}.`;

/**
 * Handles an enquiry submission and emails it to the enquiries inbox.
 *
 * One form shape posts here, hosted in two places: inline in the hero and
 * inside the enquiry modal. Validation runs on the server so it holds even
 * with JS disabled or the client bundle tampered with.
 */
export async function submitEnquiry(_previousState, formData) {
  // Tell a bot it worked so it has no reason to retry, but send nothing.
  if (isBot(formData)) {
    return { status: "success", errors: {}, values: null };
  }

  const values = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    company: text(formData, "company"),
    phone: text(formData, "phone"),
    service: text(formData, "service"),
    budget: text(formData, "budget"),
    message: text(formData, "message"),
  };

  const errors = {};

  if (values.name.length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.phone) {
    errors.phone = "Please add a phone or WhatsApp number.";
  } else if (!PHONE_PATTERN.test(values.phone)) {
    errors.phone = "That doesn't look like a valid number.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  try {
    await sendEnquiryEmail(values);
  } catch (error) {
    console.error("[enquiry] delivery failed:", error);
    return { status: "error", errors: {}, values, formError: DELIVERY_FAILED };
  }

  return { status: "success", errors: {}, values: null };
}

/**
 * Handles a job application from the careers section and emails it, with the
 * résumé attached, to the careers inbox.
 */
export async function submitApplication(_previousState, formData) {
  if (isBot(formData)) {
    return { status: "success", errors: {}, values: null };
  }

  const values = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    phone: text(formData, "phone"),
    position: text(formData, "position"),
    portfolio: text(formData, "portfolio"),
    intro: text(formData, "intro"),
  };

  const errors = {};

  if (values.name.length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.phone) {
    errors.phone = "Please add a contact number.";
  } else if (!PHONE_PATTERN.test(values.phone)) {
    errors.phone = "That doesn't look like a valid number.";
  }
  if (!values.position) {
    errors.position = "Pick the role you're applying for.";
  }
  if (values.portfolio) {
    try {
      const url = new URL(values.portfolio);
      if (!["http:", "https:"].includes(url.protocol)) {
        errors.portfolio = "Use a full http(s) link.";
      }
    } catch {
      errors.portfolio = "Use a full link, e.g. https://your-site.com";
    }
  }
  if (values.intro.length < 20) {
    errors.intro = "A couple of sentences about you, please.";
  }

  const resume = formData.get("resume");
  const hasResume = resume && typeof resume === "object" && resume.size > 0;

  if (!hasResume) {
    errors.resume = "Attach your CV as a PDF or Word document.";
  } else if (resume.size > RESUME_MAX_BYTES) {
    errors.resume = "That file is over 4MB — please attach a smaller one.";
  } else if (!RESUME_TYPES.includes(resume.type)) {
    errors.resume = "Only PDF and Word documents are accepted.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  try {
    await sendApplicationEmail(values, resume);
  } catch (error) {
    console.error("[application] delivery failed:", error);
    return { status: "error", errors: {}, values, formError: DELIVERY_FAILED };
  }

  return { status: "success", errors: {}, values: null };
}
