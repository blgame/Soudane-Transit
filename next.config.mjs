/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Empêche les navigateurs de deviner le type de contenu (MIME sniffing)
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Empêche le site d'être intégré dans une iframe étrangère (clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // Protection XSS intégrée des anciens navigateurs
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Limite les infos envoyées dans le header Referer
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          // Désactive les APIs sensibles non utilisées
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
