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
  /** Browser tab title (e.g., "J&J's {year} Top Comics"); supports {year}, {n}, {subject} */
  pageTitle?: string;
}

export interface ListContent {
  /** Introductory paragraph shown below the header */
  introText?: string;
  /** Prompt shown when no items are expanded; {tap} becomes "tap" on touch screens and "click" with a mouse */
  expandPrompt?: string;
  /** Label above each item's review comment (e.g., "J&J"); defaults to authorInitials */
  reviewLabel?: string;
}

export interface ListTheme {
  /** Accent color as any CSS color value (e.g., "#5b8592"); exposed as the `accent` Tailwind color */
  accentColor: string;
}

export interface ListConfig {
  branding: ListBranding;
  meta: ListMeta;
  content: ListContent;
  theme: ListTheme;
}

/** Fill the {year}, {n} and {subject} placeholders in a config template string. */
export function fillTemplate(template: string, meta: ListMeta): string {
  return template
    .replaceAll("{year}", String(meta.year ?? ""))
    .replaceAll("{n}", String(meta.listSize))
    .replaceAll("{subject}", meta.subject);
}
