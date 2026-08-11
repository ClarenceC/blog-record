// Single source of truth for site-wide metadata.
// Change these values once and every page + RSS feed picks it up.
export const SITE = {
  /** Short name, used as "<article> · name" suffix in <title>. */
  name: "fe2x",
  /** Full site title, used on the homepage and in the RSS feed. */
  title: "fe2x · 技术博客",
  /** Default site description, used as SEO/og description fallback. */
  description:
    "Clarence 的技术博客，记录技术与思考和 Agent 的演化过程。",
} as const;
