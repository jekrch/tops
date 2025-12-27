# :arrow_up_small: Tops

A customizable ranked list web application built with React, TypeScript, and Tailwind CSS. Create "Top 10" style lists for comics, albums, films, games, or anything else you want to rank and share.

**Demo:** [Jenny & Jacob's Top 10 Comic Series](https://comics.jacobkrch.com) 

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

All configuration lives in two files inside `src/data/`:

### `rankItems.ts` — List Configuration & Items

This file contains two exports:

#### `listConfig` — Page Header & Branding
```typescript
export const listConfig: ListConfig = {
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
    year: 2025
  },
  content: {
    introText: "A paragraph introducing your list...",
    expandPrompt: "tap to expand"   // Hint text when nothing is expanded
  },
  theme: {
    accentColor: "jk-teal"          // Tailwind color class (see Theming below)
  }
};
```

#### `rankItems` — Your Ranked Items
```typescript
export const rankItems: RankItem[] = [
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

See `src/types/RankTypes.ts` and `src/types/ListConfig.ts` for the complete type definitions.


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

**Recommended dimensions:**
- Cover images: ~400×600px (2:3 aspect ratio)
- Sample images: ~800×1200px or similar


## Theming

The default accent color is `jk-teal`. To use a different color:

1. Define your color in your Tailwind config or CSS:
```css
/* In src/index.css or your global styles */
@theme {
  --color-my-accent: #your-hex-color;
}
```

2. Update `listConfig.theme.accentColor`:
```typescript
theme: {
  accentColor: "my-accent"
}
```

Standard Tailwind colors like `blue-500`, `emerald-400`, etc. also work if configured.


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


## Built With

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind 4](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (icons)



## License

MIT — use this however you like.