export async function GET() {
  return new Response(
    `User-agent: *
Allow: /
Disallow: /api/
Disallow: /auth/

Sitemap: https://global-macro-insight.vercel.app/sitemap.xml`,
    { headers: { "Content-Type": "text/plain" } }
  );
}