import { NextResponse } from "next/server";

type CotationPayload = {
  nom?: string;
  societe?: string;
  telephone?: string;
  email?: string;
  typeMarchandise?: string;
  origine?: string;
  destination?: string;
  typeConteneur?: string;
  volumePoids?: string;
  message?: string;
};

const recipientEmail = process.env.QUOTE_TO_EMAIL || "kessotransit@yahoo.fr";

function normalize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildPlainText(data: Required<CotationPayload>) {
  return [
    "Nouvelle demande de cotation Soudane Transit",
    "",
    `Nom : ${data.nom}`,
    `Société : ${data.societe || "Non renseigné"}`,
    `Téléphone : ${data.telephone}`,
    `Email : ${data.email}`,
    `Type de marchandise : ${data.typeMarchandise}`,
    `Origine : ${data.origine}`,
    `Destination : ${data.destination}`,
    `Type de conteneur : ${data.typeConteneur}`,
    `Volume / Poids : ${data.volumePoids}`,
    "",
    "Message :",
    data.message || "Non renseigné"
  ].join("\n");
}

function buildHtml(data: Required<CotationPayload>) {
  const rows = [
    ["Nom", data.nom],
    ["Société", data.societe || "Non renseigné"],
    ["Téléphone", data.telephone],
    ["Email", data.email],
    ["Type de marchandise", data.typeMarchandise],
    ["Origine", data.origine],
    ["Destination", data.destination],
    ["Type de conteneur", data.typeConteneur],
    ["Volume / Poids", data.volumePoids]
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#102018;line-height:1.5">
      <h1 style="color:#0B6B3A;margin:0 0 8px">Nouvelle demande de cotation</h1>
      <p style="margin:0 0 20px;color:#475569">Demande envoyée depuis le site web Soudane Transit.</p>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding:10px;border:1px solid #e2e8f0;background:#f4f7f5;font-weight:700;width:190px">${escapeHtml(label)}</td>
                <td style="padding:10px;border:1px solid #e2e8f0">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
      <h2 style="color:#0B6B3A;margin:22px 0 8px;font-size:18px">Message</h2>
      <p style="white-space:pre-line;border-left:4px solid #F47B20;padding:12px 16px;background:#f8fafc">${escapeHtml(
        data.message || "Non renseigné"
      )}</p>
    </div>
  `;
}

function buildMailto(subject: string, body: string) {
  const params = new URLSearchParams({
    subject,
    body
  });

  return `mailto:${recipientEmail}?${params.toString()}`;
}

export async function POST(request: Request) {
  let body: CotationPayload;

  try {
    body = (await request.json()) as CotationPayload;
  } catch {
    return NextResponse.json(
      { message: "Le formulaire est invalide." },
      { status: 400 }
    );
  }

  const data: Required<CotationPayload> = {
    nom: normalize(body.nom),
    societe: normalize(body.societe),
    telephone: normalize(body.telephone),
    email: normalize(body.email),
    typeMarchandise: normalize(body.typeMarchandise),
    origine: normalize(body.origine),
    destination: normalize(body.destination),
    typeConteneur: normalize(body.typeConteneur),
    volumePoids: normalize(body.volumePoids),
    message: normalize(body.message)
  };

  const requiredFields = [
    data.nom,
    data.telephone,
    data.email,
    data.typeMarchandise,
    data.origine,
    data.destination,
    data.typeConteneur,
    data.volumePoids
  ];

  if (requiredFields.some((field) => !field)) {
    return NextResponse.json(
      { message: "Merci de compléter les champs obligatoires." },
      { status: 400 }
    );
  }

  const subject = `Nouvelle demande de cotation - ${data.nom}`;
  const text = buildPlainText(data);
  const html = buildHtml(data);
  const fallbackMailto = buildMailto(subject, text);
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.QUOTE_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    return NextResponse.json(
      {
        message:
          "L'envoi automatique n'est pas encore configuré sur le serveur.",
        fallbackMailto
      },
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
      {
        message:
          "L'email n'a pas pu être envoyé automatiquement. Utilisez l'email prérempli.",
        fallbackMailto
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    message: "Votre demande de cotation a été envoyée avec succès."
  });
}
