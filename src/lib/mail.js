/**
 * Outgoing mail for the website's forms.
 *
 * Imported only by server actions. Credentials and recipient addresses come
 * from non-NEXT_PUBLIC_ environment variables, which Next never inlines into
 * the browser bundle — so neither the SMTP password nor the inbox addresses
 * are visible to visitors or scrapers.
 */
import nodemailer from "nodemailer";

const DEFAULT_INQUIRY_TO = "aussiedesignsolutions@gmail.com";
const DEFAULT_CAREERS_TO = "career@adsglobalagency.com";

let transport;

function getTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  if (!transport) {
    const port = Number(SMTP_PORT) || 465;
    transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      // 465 is implicit TLS; 587 upgrades with STARTTLS instead.
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return transport;
}

async function deliver(message) {
  const smtp = getTransport();

  if (!smtp) {
    // A form that reports success while dropping the lead is worse than one
    // that fails, so production refuses to pretend. Locally a warning is
    // enough to keep working without mailbox credentials.
    if (process.env.NODE_ENV === "production") {
      throw new Error("Mail is not configured: set SMTP_HOST, SMTP_USER and SMTP_PASS.");
    }
    console.warn(`[mail] SMTP not configured — skipped "${message.subject}" to ${message.to}`);
    return;
  }

  await smtp.sendMail({
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    ...message,
  });
}

// Anything headed for a header must stay on one line, or a newline typed into
// a form field could smuggle extra headers into the message.
const oneLine = (value) => String(value ?? "").replace(/[\r\n]+/g, " ").trim();

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const timestamp = () =>
  `${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC`;

/** Builds matching plain-text and HTML bodies from [label, value] rows. */
function render(heading, rows) {
  const filled = rows.filter(([, value]) => value);

  const text = [heading, "", ...filled.map(([label, value]) => `${label}: ${value}`)].join(
    "\n"
  );

  const htmlRows = filled
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 16px 10px 0;vertical-align:top;color:#64748b;font-size:13px;white-space:nowrap;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;vertical-align:top;color:#0f172a;font-size:14px;line-height:1.5;">${escapeHtml(value).replace(/\n/g, "<br>")}</td>
        </tr>`
    )
    .join("");

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f1f5f9;font-family:-apple-system,'Segoe UI',Roboto,sans-serif;">
    <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;">
      <tr><td style="padding:24px 28px 8px;">
        <h1 style="margin:0;font-size:18px;color:#0f172a;">${escapeHtml(heading)}</h1>
      </td></tr>
      <tr><td style="padding:8px 28px 24px;">
        <table role="presentation" style="border-collapse:collapse;">${htmlRows}</table>
      </td></tr>
    </table>
  </body>
</html>`;

  return { text, html };
}

export async function sendEnquiryEmail(values) {
  const { text, html } = render("New enquiry from the website", [
    ["Name", values.name],
    ["Email", values.email],
    ["Phone / WhatsApp", values.phone],
    ["Company", values.company],
    ["Service", values.service],
    ["Budget", values.budget],
    ["Project details", values.message],
    ["Received", timestamp()],
  ]);

  await deliver({
    to: process.env.INQUIRY_TO || DEFAULT_INQUIRY_TO,
    // Hitting reply in the inbox answers the visitor, not the website mailbox.
    replyTo: { name: oneLine(values.name), address: values.email },
    subject: oneLine(`New enquiry: ${values.service} — ${values.name}`),
    text,
    html,
  });
}

export async function sendApplicationEmail(values, resume) {
  const { text, html } = render("New job application", [
    ["Name", values.name],
    ["Email", values.email],
    ["Phone", values.phone],
    ["Position", values.position],
    ["Portfolio", values.portfolio],
    ["Short intro", values.intro],
    ["Résumé", `${resume.name} (attached)`],
    ["Received", timestamp()],
  ]);

  await deliver({
    to: process.env.CAREERS_TO || DEFAULT_CAREERS_TO,
    replyTo: { name: oneLine(values.name), address: values.email },
    subject: oneLine(`Application: ${values.position} — ${values.name}`),
    text,
    html,
    attachments: [
      {
        filename: oneLine(resume.name) || "resume",
        content: Buffer.from(await resume.arrayBuffer()),
        contentType: resume.type,
      },
    ],
  });
}
