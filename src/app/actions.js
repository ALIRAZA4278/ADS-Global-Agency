"use server";

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

/**
 * Handles a contact-form submission.
 *
 * Two forms post here: the full contact section (`formType` "full", which
 * expects a written brief) and the hero enquiry modal ("modal", which asks for
 * a phone number instead). Validation runs on the server so the forms are safe
 * even with JS disabled or the client bundle tampered with.
 *
 * Delivery is the one piece left open — drop your provider call where the TODO
 * is and the rest of the flow already works.
 */
export async function submitEnquiry(_previousState, formData) {
  const formType = text(formData, "formType") || "full";

  const values = {
    formType,
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

  if (formType === "modal") {
    if (!values.phone) {
      errors.phone = "Please add a phone or WhatsApp number.";
    } else if (!PHONE_PATTERN.test(values.phone)) {
      errors.phone = "That doesn't look like a valid number.";
    }
  } else if (values.message.length < 12) {
    errors.message = "Tell us a little more — at least a sentence or two.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  // TODO: deliver the enquiry — e.g. Resend, Postmark, or a CRM webhook.
  // Until that is wired up the submission is only recorded in the server log.
  console.info("[enquiry]", { ...values, receivedAt: new Date().toISOString() });

  return { status: "success", errors: {}, values: null };
}

/**
 * Handles a job application from the careers section.
 *
 * The résumé arrives as a File in the FormData. It is validated here but not
 * yet stored — wire the TODO to your storage bucket (S3, Vercel Blob, Drive)
 * and forward the rest of the fields to wherever you track candidates.
 */
export async function submitApplication(_previousState, formData) {
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

  // TODO: store the résumé and forward the application to your ATS or inbox.
  console.info("[application]", {
    ...values,
    resume: { name: resume.name, size: resume.size, type: resume.type },
    receivedAt: new Date().toISOString(),
  });

  return { status: "success", errors: {}, values: null };
}
