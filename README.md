# :arrow_up_small: Tops

A customizable ranked list web application built with React, TypeScript, and Tailwind CSS. Create "Top 10" style lists for comics, albums, films, games, or anything else you want to rank and share.

**Demo:** [Jenny & Jacob's Top 10 Comic Series](https://comics.jacobkrch.com) 

<img height="400" alt="image" src="https://github.com/user-attachments/assets/7f2dffc4-2bef-4833-b38d-884466e52c53" />

---

## Features

- Responsive accordion-style layout with smooth animations
- Configurable branding, theming, and content
- Image galleries with lightbox viewer
- Attribution system for credits (writers, artists, etc.)
- Free hosting via GitHub Pages
- No backend required—just static files

---

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/)
- A GitHub account (for free hosting)

### 1. Fork the Repository

1. Visit [github.com/jekrch/tops](https://github.com/jekrch/tops)
2. Click the **Fork** button in the top-right corner
3. Select your account as the destination
4. (Optional) Rename the repository to match your list theme (e.g., `my-top-albums`)

### 2. Clone Your Fork
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 3. Install Dependencies
```bash
bun install
```

### 4. Run the Development Server
```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) to see your list.

---

## Customizing Your List

Each year gets its own file in `src/data/lists/`, named after the year (e.g. `2025.ts`, `2026.ts`). Files there are picked up automatically, and when more than one exists the header shows a year switcher. The selected year is kept in the URL (`?year=2025`), so every year has a shareable link; the default year uses the bare URL.

### Yearly Lists

```bash
bun run list:new 2027 --default   # scaffold an empty 2027 list and make it the default
bun run list:new 2027             # scaffold without changing the default
bun run list:default 2026         # change which year is shown by default
```

`list:new` copies branding, theme, and header settings from the newest existing year, clears the intro text, and starts with no items (the page shows a "still in the works" message until you add some). New lists are marked `draft: true`: drafts appear in the year switcher but can only be opened when running locally. Remove `draft: true` from the file to publish the year. The default year lives in `DEFAULT_YEAR` in `src/data/lists.ts`; if no file exists for it, the newest year is shown.

### `lists/<year>.ts` — List Configuration & Items

Each year file defines a `config` and an `items` array and exports them as `export default { config, items } satisfies YearList;` (add `draft: true` to keep it local-only).

#### `config` — Page Header & Branding
```typescript
const config: ListConfig = {
  branding: {
    authorName: "Your Name's",      // Shown above the title
    authorInitials: "YN",           // Badge display (2 characters)
    authorLink: "https://your.site" // Optional link
  },
  meta: {
    title: "Top {n} {subject}",     // {n} and {subject} are interpolated
    listSize: 10,                   // Number of items
    subject: "Albums",              // What you're ranking
    subtitle: "My Favorites of {year}",
    year: 2025,
    pageTitle: "My {year} Top Albums" // Optional browser tab title
  },
  content: {
    introText: "A paragraph introducing your list...",
    expandPrompt: "{tap} to expand", // Hint when nothing is expanded ({tap} = "tap"/"click")
    reviewLabel: "YN"               // Optional label on review comments (defaults to authorInitials)
  },
  theme: {
    accentColor: "#5b8592"          // Any CSS color (see Theming below)
  }
};
```

#### `items` — Your Ranked Items
```typescript
const items: RankItem[] = [
  {
    rank: 1,
    name: "Item Name",
    category: "Publisher / Label / Studio",  // Optional
    attributions: [
      { label: "Director", values: ["Jane Doe"], showOnCard: true },
      { label: "Writer", values: ["John Smith"] }
    ],
    cover_image: "/images/items/item-cover.jpg",
    sample_images: [
      "/images/items/item-sample-1.jpg",
      "/images/items/item-sample-2.jpg"
    ],
    description: "Publisher or official description of the item.",
    description_source: {           // Optional attribution
      name: "Official Site",
      link: "https://example.com"
    },
    review_comment: "Your personal take on why this item made the list.",
    link: "https://example.com/item"
  },
  // ... more items
];
```

### Type Reference

See `src/types/RankTypes.ts`, `src/types/ListConfig.ts`, and `src/types/YearList.ts` for the complete type definitions.


## Adding Images

Images go in the `public/images/` directory:
```
public/
└── images/
    └── items/
        ├── item-name-cover.jpg
        ├── item-name-1.jpg
        └── item-name-2.jpg
```

Reference them in your config with paths starting from `/images/`:
```typescript
cover_image: "/images/items/item-name-cover.jpg"
```

`bun run dev` and `bun run build` generate resized WebP copies of these images in `public/images/generated/` (gitignored), which the cards, thumbnails, and header use; the lightbox shows the originals. Run `bun run images` to regenerate them by hand. Remote image URLs are used as-is.


## Theming

Set `config.theme.accentColor` in your year file to any CSS color:
```typescript
theme: {
  accentColor: "#c2410c"
}
```

The color is applied as the `--accent` CSS variable and is available as the `accent` Tailwind color (`bg-accent`, `text-accent/70`, etc.), so it applies to the header, cards, detail panels, and lightbox. The default is the teal `#5b8592`.


## Deploying to GitHub Pages (Free)

Your fork includes a GitHub Action that automatically builds and deploys your site.

### Setup

1. In your forked repository, go to **Settings → Pages**

2. Under "Build and deployment", set:
   - **Source:** GitHub Actions

3. Update `vite.config.ts` with your repository name:
```typescript
export default defineConfig({
  base: '/YOUR_REPO_NAME/',
  // ...
})
```

4. Commit and push your changes:
```bash
git add .
git commit -m "Configure for deployment"
git push
```

5. The GitHub Action will automatically build and deploy your site

6. Your site will be available at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Custom Domain (Optional)

To use a custom domain like `mytopten.com`:

1. Go to **Settings → Pages**
2. Enter your domain under "Custom domain"
3. Update your DNS settings as prompted
4. Set `base: '/'` in `vite.config.ts`


## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run preview` | Preview production build locally |
| `bun run deploy` | Build and deploy to GitHub Pages |
| `bun run lint` | Run ESLint |
| `bun run images` | Generate resized image variants |
| `bun run list:new <year> [--default]` | Scaffold an empty draft list for a new year |
| `bun run list:default <year>` | Set the year shown by default |


## Built With

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind 4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (icons)



## License

MIT — use this however you like.
