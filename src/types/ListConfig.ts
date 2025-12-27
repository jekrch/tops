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

// Default configuration - Jenny & Jacob's Top 10 Comics
export const defaultListConfig: ListConfig = {
  branding: {
    authorName: "Jenny & Jacob's",
    authorInitials: "JJ",
  },
  meta: {
    title: "Top {n} {subject}",
    listSize: 10,
    subject: "Comic Series",
    subtitle: "Our Favorite Reads of {year}",
    year: 2025,
  },
  content: {
    introText:
      "Jenny and I read an obnoxious number of comics this year, both new and old. For fun—and to soberly reflect on this recent obsession—we wrote up a list of the 2025 series that we enjoyed. And then we had to narrow that down (!) to a tidy top ten in the following order.",
    expandPrompt: "tap to expand",
  },
  theme: {
    accentColor: "jk-teal",
  },
};

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