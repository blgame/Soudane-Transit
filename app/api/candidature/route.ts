import { NextResponse } from "next/server";

type CandidaturePayload = {
  nom?: string;
  telephone?: string;
  email?: string;
  poste?: string;
  message?: string;
};

const recipientEmail = process.env.QUOTE_TO_EMAIL || "kessotransit@yahoo.fr";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_MAX_LENGTHS: Record<string, number> = {
  nom: 100,
  telephone: 30,
  email: 254,
  poste: 150,
  message: 3000
};

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function truncate(value: string, field: string) {
  const max = FIELD_MAX_LENGTHS[field] ?? 200;
  return value.slice(0, max);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildPlainText(data: Required<CandidaturePayload>) {
  return [
    "Nouvelle candidature spontanée — Soudane Transit",
    "",
    `Nom : ${data.nom}`,
    `Téléphone : ${data.telephone}`,
    `Email : ${data.email}`,
    `Poste visé : ${data.poste || "Non renseigné"}`,
    "",
    "Message / Présentation :",
    data.message || "Non renseigné"
  ].join("\n");
}

function buildHtml(data: Required<CandidaturePayload>) {
  const rows = [
    ["Nom", data.nom],
    ["Téléphone", data.telephone],
    ["Email", data.email],
    ["Poste visé", data.poste || "Non renseigné"]
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#102018;line-height:1.5">
      <h1 style="color:#0B6B3A;margin:0 0 8px">Candidature spontanée</h1>
      <p style="margin:0 0 20px;color:#475569">Envoyée depuis le site web Soudane Transit.</p>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding:10px;border:1px solid #e2e8f0;background:#f4f7f5;font-weight:700;width:160px">${escapeHtml(label)}</td>
                <td style="padding:10px;border:1px solid #e2e8f0">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
      <h2 style="color:#0B6B3A;margin:22px 0 8px;font-size:18px">Message / Présentation</h2>
      <p style="white-space:pre-line;border-left:4px solid #F47B20;padding:12px 16px;background:#f8fafc">${escapeHtml(
        data.message || "Non renseigné"
      )}</p>
    </div>
  `;
}

function buildMailto(subject: string, body: string) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:${recipientEmail}?${params.toString()}`;
}

export async function POST(request: Request) {
  let body: CandidaturePayload;

  try {
    body = (await request.json()) as CandidaturePayload;
  } catch {
    return NextResponse.json(
      { message: "Le formulaire est invalide." },
      { status: 400 }
    );
  }

  const data: Required<CandidaturePayload> = {
    nom: truncate(normalize(body.nom), "nom"),
    telephone: truncate(normalize(body.telephone), "telephone"),
    email: truncate(normalize(body.email), "email"),
    poste: truncate(normalize(body.poste), "poste"),
    message: truncate(normalize(body.message), "message")
  };

  if (!data.nom || !data.telephone || !data.email) {
    return NextResponse.json(
      { message: "Merci de renseigner votre nom, téléphone et email." },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(data.email)) {
    return NextResponse.json(
      { message: "L'adresse email saisie n'est pas valide." },
      { status: 400 }
    );
  }

  const subject = `Candidature spontanée — ${data.nom}`;
  const text = buildPlainText(data);
  const html = buildHtml(data);
  const fallbackMailto = buildMailto(subject, text);
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.QUOTE_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return NextResponse.json(
      { message: "L'envoi automatique n'est pas encore configuré.", fallbackMailto },
      { status: 503 }
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [recipientEmail],
      reply_to: data.email,
      subject,
      html,
      text
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Resend email error:", errorText);
    return NextResponse.json(
      { message: "L'email n'a pas pu être envoyé.", fallbackMailto },
      { status: 502 }
    );
  }

  return NextResponse.json({
    message: "Votre candidature a été envoyée avec succès. Nous reviendrons vers vous rapidement."
  });
}
