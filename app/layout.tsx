import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://soudane-transit.vercel.app"),
  title: {
    default: "Soudane Transit | Transit et logistique internationale à Dakar",
    template: "%s | Soudane Transit"
  },
  description:
    "Soudane Transit accompagne les opérations import/export, dédouanement, transport terrestre, fret maritime et logistique internationale depuis Dakar, Sénégal.",
  keywords: [
    "Soudane Transit",
    "transit Dakar",
    "logistique Sénégal",
    "dédouanement",
    "import export",
    "fret maritime",
    "transport conteneur"
  ],
  openGraph: {
    title: "Soudane Transit",
    description:
      "Votre partenaire de confiance en transit et logistique internationale.",
    locale: "fr_SN",
    siteName: "Soudane Transit",
    type: "website"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
