import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { TACTICS, getAllTechniquesAndSubs } from "@/data/attack";

const BASE_URL = "https://mitreattack.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/matrix", changefreq: "weekly", priority: "0.9" },
          { path: "/search", changefreq: "weekly", priority: "0.8" },
          { path: "/playbooks", changefreq: "weekly", priority: "0.8" },
          ...TACTICS.map((t) => ({
            path: `/tactics/${t.slug}`,
            changefreq: "monthly" as const,
            priority: "0.7",
          })),
          ...getAllTechniquesAndSubs().map((t) => ({
            path: `/techniques/${t.id}`,
            changefreq: "monthly" as const,
            priority: "0.6",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
