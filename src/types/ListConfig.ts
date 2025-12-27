export interface ListBranding {
  /** Display name for the list authors/curators (e.g., "Jenny & Jacob's") */
  authorName: string;
  /** Short initials for badge display (e.g., "JJ") */
  authorInitials?: string;
  /** URL to author's site or social (optional) */
  authorLink?: string;
}

export interface ListMeta {
  /** Main title (e.g., "Top 10 Comic Series") */
  title: string;
  /** Number featured in title, displayed with accent color */
  listSize: number;
  /** Subject being ranked (e.g., "Comic Series", "Albums", "Films") */
  subject: string;
  /** Subtitle or tagline (e.g., "Our Favorite Reads of 2025") */
  subtitle?: string;
  /** Year or time period for the list */
  year?: string | number;
}

export interface ListContent {
  /** Introductory paragraph shown below the header */
  introText?: string;
  /** Prompt shown when no items are expanded */
  expandPrompt?: string;
}

export interface ListTheme {
  /** Tailwind color class for accent (without 'bg-' or 'text-' prefix) */
  accentColor: string;
  /** Optional custom CSS class for additional theming */
  customClass?: string;
}

export interface ListConfig {
  branding: ListBranding;
  meta: ListMeta;
  content: ListContent;
  theme: ListTheme;
}

// Helper to interpolate template strings in config
export function interpolateConfig(config: ListConfig): {
  title: string;
  subtitle: string;
} {
  const { listSize, subject, year } = config.meta;

  const title = config.meta.title
    .replace("{n}", String(listSize))
    .replace("{subject}", subject);

  const subtitle = (config.meta.subtitle || "")
    .replace("{year}", String(year))
    .replace("{n}", String(listSize))
    .replace("{subject}", subject);

  return { title, subtitle };
}