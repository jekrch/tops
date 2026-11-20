import type { ListConfig } from "../../types/ListConfig";
import type { RankItem } from "../../types/RankTypes";
import type { YearList } from "../../types/YearList";

/**
 * Configuration for the 2026 list (copied from 2025)
 */
const config: ListConfig = {
  branding: {
    authorName: "Jenny & Jacob's",
    authorInitials: "JJ",
    authorLink: "https://jacobkrch.com"
  },
  meta: {
    title: "Top {n} {subject}",
    listSize: 10,
    subject: "Comic Series",
    subtitle: "Our Favorite Reads of {year}",
    year: 2026,
    pageTitle: "J&J's {year} Top Comics"
  },
  content: {
    introText: "",
    expandPrompt: "{tap} to expand",
    reviewLabel: "J&J"
  },
  theme: {
    accentColor: "#5b8592"
  }
};

/**
 * The ranked items for 2026
 */
const SNAPS = "https://snaps.jacobkrch.com";

const items: RankItem[] = [
  {
    rank: 1,
    name: "Minor Arcana",
    category: "BOOM! Studios",
    attributions: [
      { label: "Writer", values: ["Jeff Lemire"], showOnCard: true },
      { label: "Artist", values: ["Jeff Lemire", "Letizia Cadonici"] },
      { label: "Colors", values: ["Patricio Delpeche"] },
      { label: "Letters", values: ["Steve Wands"] },
    ],
    cover_image: "/images/items/minor-arcana-19-cover.jpg",
    sample_images: [
      `${SNAPS}/images/minor-arcana/issue-20-1794166220-v2.jpg`,
      `${SNAPS}/images/minor-arcana/issue-19-1791743145.jpg`,
      `${SNAPS}/images/minor-arcana/issue-18-1788736628.jpg`,
      `${SNAPS}/images/minor-arcana/issue-16-1783293873.jpg`,
    ],
    description: "Theresa, the daughter of a small-town “psychic” fraud, returns home to care for her ailing mother, however begrudgingly.\n\nBut when Theresa discovers that there may be more to the magic than she originally believed, she’ll find herself caught up in a town that desperately needs her help…",
    description_source: { name: "BOOM! Studios", link: "https://www.boom-studios.com/series/minor-arcana/" },
    link: "https://www.boom-studios.com/series/minor-arcana/",
  },
  {
    rank: 2,
    name: "Just Brutal",
    category: "Ignition Press",
    attributions: [
      { label: "Writer", values: ["Dennis Hopeless"], showOnCard: true },
      { label: "Artist", values: ["Brahm Revel"] },
      { label: "Colors", values: ["Marissa Louise"] },
      { label: "Letters", values: ["Brahm Revel"] },
    ],
    cover_image: `${SNAPS}/data/covers/just-brutal/abfb661b87c6.jpg`,
    sample_images: [
      `${SNAPS}/images/just-brutal/issue-6-1789841228.jpg`,
      `${SNAPS}/images/just-brutal/issue-5-1786901541.jpg`,
      `${SNAPS}/images/just-brutal/issue-4-1783796023.jpg`,
      `${SNAPS}/images/just-brutal/issue-3-1779326609.jpg`,
    ],
    description: "Every family has problems – but the Savage Family has actual monsters.\n\nJordan Savage is a normal 16-year-old kid barely holding it together after his parents’ recent divorce. His twin sister Winter is his opposite in every way—including how she is coping with the changes in the Savage family’s lives.\n\nAnd those changes are bigger than they could even imagine. They are about to find out that the boring, bickering parents they’ve lived with this whole time are secretly ancient death-dealing barbarian warriors…",
    description_source: { name: "Penguin Random House", link: "https://www.penguinrandomhouse.com/books/841119/just-brutal-1-by-dennis-hopeless/" },
    link: "https://www.penguinrandomhouse.com/books/841119/just-brutal-1-by-dennis-hopeless/",
  },
  {
    rank: 3,
    name: "Bleeding Hearts",
    category: "DC Comics/Vertigo",
    attributions: [
      { label: "Writer", values: ["Deniz Camp"], showOnCard: true },
      { label: "Artist", values: ["Stipan Morian"] },
      { label: "Colors", values: ["Matt Hollingsworth", "Stjepan Bartolić"] },
      { label: "Letters", values: ["Hassan Otsmane-Elhaou"] },
    ],
    cover_image: `${SNAPS}/data/covers/bleeding-hearts/fc5e77194c09.jpg`,
    sample_images: [
      `${SNAPS}/images/bleeding-hearts/issue-9-1794690026-v2.jpg`,
      `${SNAPS}/images/bleeding-hearts/issue-8-1791159081-v2.jpg`,
      `${SNAPS}/images/bleeding-hearts/issue-6-1783814155.jpg`,
      `${SNAPS}/images/bleeding-hearts/issue-3-1775931996.jpg`,
    ],
    description: "The zombies won—and 10 years after the fall of humanity, they’re the dominant form of life (or not-life) on Earth. They’ve developed their own cultural practices, their own language, their own society, all organized around hunting and devouring the few living humans unlucky enough to still be fighting for survival.\n\nMouse-Pokes-Golf-Ball-Through-Hole-In-Head (“Poke” for short) is a valued and beloved member of the Brain-Splashes-and-Sizzles-On-Hot-Rocks Horde of the Undead. With his brother-in-arm Mush, he’s happy to shamble along through the only world he can remember…until the day his heart mysteriously starts beating again.",
    description_source: { name: "Penguin Random House", link: "https://www.penguinrandomhouse.com/books/833492/bleeding-hearts-vol-1-out-break-by-deniz-camp" },
    link: "https://www.penguinrandomhouse.com/books/833492/bleeding-hearts-vol-1-out-break-by-deniz-camp",
  },
  {
    rank: 4,
    name: "Concrete: Stars Over Sand",
    category: "Dark Horse Comics",
    attributions: [
      { label: "Writer", values: ["Paul Chadwick"], showOnCard: true },
      { label: "Artist", values: ["Paul Chadwick"] },
    ],
    cover_image: `${SNAPS}/data/covers/concrete-stars-over-sand/dc3c854eb3e9.jpg`,
    sample_images: [
      `${SNAPS}/images/concrete-stars-over-sand/issue-4-1791663166.jpg`,
      `${SNAPS}/images/concrete-stars-over-sand/issue-3-1788030630.jpg`,
      `${SNAPS}/images/concrete-stars-over-sand/issue-2-1785609082.jpg`,
      `${SNAPS}/images/concrete-stars-over-sand/issue-1-1783290357.jpg`,
    ],
    description: "The Eisner, Harvey and Reuben Award-winning Concrete is back with a 5-part comics story of amnesia, wilderness, and suspense.\n\nConcrete has entered the desert and not come back. Larry and Maureen are frantic. …",
    description_source: { name: "Dark Horse Comics", link: "https://www.darkhorse.com/books/3003-953/concrete-stars-over-sand-tpb/" },
    link: "https://www.darkhorse.com/books/3003-953/concrete-stars-over-sand-tpb/",
  },
  {
    rank: 5,
    name: "Crowbound",
    category: "Image Comics",
    attributions: [
      { label: "Writer", values: ["Jeff Lemire"], showOnCard: true },
      { label: "Artist", values: ["Dustin Nguyen"] },
      { label: "Letters", values: ["Steve Wands"] },
    ],
    cover_image: `${SNAPS}/data/covers/crowbound/0bc617ab89ca.jpg`,
    sample_images: [
      `${SNAPS}/images/crowbound/issue-3-1794759990.jpg`,
      `${SNAPS}/images/crowbound/issue-2-1791735326.jpg`,
      `${SNAPS}/images/crowbound/issue-1-1788734954.jpg`,
      `${SNAPS}/images/crowbound/issue-2-1791861043.jpg`,
    ],
    description: "All is dark.\nBut all is not lost...\n\nRose isn't special. She works in the Factory just like everyone else—a dark, sprawling monolithic structure that runs along the coast and cuts the world in two. …the surreal, harrowing forces outside the Factory's walls—including a terrifying figure called the Scarecrow Queen, who has an offer: one last chance to save her daughter…\n\nPart post-apocalyptic neo-Western, part southern gothic, part dark fantasy, CROWBOUND spins a heart-wrenching and violent story about mortality…",
    description_source: { name: "Image Comics", link: "https://imagecomics.com/comics/releases/crowbound-1-cvr-a-dustin-nguyen-mr" },
    link: "https://imagecomics.com/comics/series/crowbound",
  },
  {
    rank: 6,
    name: "The Shaolin Cowboy: Staying A.I. Live",
    category: "Dark Horse Comics",
    attributions: [
      { label: "Writer", values: ["Geof Darrow"], showOnCard: true },
      { label: "Artist", values: ["Geof Darrow"] },
      { label: "Colors", values: ["Ian Herring"] },
      { label: "Letters", values: ["Nate Piekos"] },
    ],
    cover_image: `${SNAPS}/data/covers/the-shaolin-cowboy-staying-a-i-live/957eb60d046a.jpg`,
    sample_images: [
      `${SNAPS}/images/the-shaolin-cowboy-staying-a-i-live/issue-4-1794165273.jpg`,
      `${SNAPS}/images/the-shaolin-cowboy-staying-a-i-live/issue-3-1790535112.jpg`,
      `${SNAPS}/images/the-shaolin-cowboy-staying-a-i-live/issue-2-1786832600.jpg`,
      `${SNAPS}/images/the-shaolin-cowboy-staying-a-i-live/issue-1-1785616450.jpg`,
    ],
    description: "The Shaolin Cowboy faces an icy reception when he leaves his wasteland retreat on a mission of mercy, following the considered consul of a desert swallow and a horned toad, both endangered species. But none as endangered as the wandering ex monk becomes, once again because in this typical AMERIGUNN small town he learns euthanASIA is the new import duty on foreign imports!!!\n\nFilibustering words and pictures by Geof Darrow.",
    description_source: { name: "Dark Horse Comics", link: "https://www.darkhorse.com/comics/3019-114/shaolin-cowboy-staying-ailive-1/" },
    link: "https://www.darkhorse.com/comics/3019-114/shaolin-cowboy-staying-ailive-1/",
  },
  {
    rank: 7,
    name: "The Nice House by the Sea",
    category: "DC Comics/Vertigo",
    attributions: [
      { label: "Writer", values: ["James Tynion IV"], showOnCard: true },
      { label: "Artist", values: ["Álvaro Martínez Bueno"] },
      { label: "Colors", values: ["Jordie Bellaire"] },
      { label: "Letters", values: ["AndWorld Design"] },
    ],
    cover_image: `${SNAPS}/data/covers/the-nice-house-by-the-sea/470e1758fdfd.jpg`,
    sample_images: [
      `${SNAPS}/images/the-nice-house-by-the-sea/issue-12-1792270689.jpg`,
      `${SNAPS}/images/the-nice-house-by-the-sea/issue-10-1781397240.jpg`,
      `${SNAPS}/images/the-nice-house-by-the-sea/issue-9-1775981688.jpg`,
      `${SNAPS}/images/the-nice-house-by-the-sea/issue-8-1772918924.jpg`,
    ],
    description: "Max has hand-picked her invitees. They’re all masters of their fields, titans of their industries — humanity’s best and brightest. Who better to carry on the torch of civilization after the world ends? But these house guests don’t know Max, nor do they know each other, and as it turns out, the offer to live forever in the ruins of an empty world might come with some unexpected pitfalls.",
    description_source: { name: "Penguin Random House", link: "https://www.penguin.com.au/books/the-nice-house-by-the-sea-vol-1-9781799500605" },
    link: "https://www.dc.com/comics/the-nice-house-by-the-sea-2024",
  },
  {
    rank: 8,
    name: "Odin",
    category: "Image Comics",
    attributions: [
      { label: "Writer", values: ["James Tynion IV", "Marguerite Bennett"], showOnCard: true },
      { label: "Artist", values: ["Letizia Cadonici"] },
      { label: "Colors", values: ["Jordie Bellaire"] },
      { label: "Letters", values: ["Tom Napolitano"] },
    ],
    cover_image: `${SNAPS}/data/covers/odin/b6fcfda3c698.jpg`,
    sample_images: [
      `${SNAPS}/images/odin/issue-5-1794690245.jpg`,
      `${SNAPS}/images/odin/issue-4-1789257808.jpg`,
      `${SNAPS}/images/odin/issue-3-1785019499.jpg`,
      `${SNAPS}/images/odin/issue-1-1779581382.jpg`,
    ],
    description: "Adela will do anything for the perfect story. Including going undercover with Neo Nazi punks headed to the frozen forests of Norway under the misbegotten belief that they can summon Odin and achieve their promised white destiny. But what awaits them in the woods is far older and stranger than any of them can comprehend. And no gods are coming to answer their prayers for help.",
    description_source: { name: "Image Comics", link: "https://imagecomics.com/comics/releases/odin-1-of-9" },
    link: "https://imagecomics.com/comics/series/odin",
  },
  {
    rank: 9,
    name: "Red Roots",
    category: "Image Comics",
    attributions: [
      { label: "Writer", values: ["Lorenzo De Felici"], showOnCard: true },
      { label: "Artist", values: ["Lorenzo De Felici"] },
      { label: "Colors", values: ["Lorenzo De Felici"] },
      { label: "Letters", values: ["Rus Wooton"] },
    ],
    cover_image: `${SNAPS}/data/covers/red-roots/77bf13a7fec6.jpg`,
    sample_images: [
      `${SNAPS}/images/red-roots/issue-5-1789860485.jpg`,
      `${SNAPS}/images/red-roots/issue-4-1785612899.jpg`,
      `${SNAPS}/images/red-roots/issue-3-1782671349.jpg`,
      `${SNAPS}/images/red-roots/issue-1-1777758703.jpg`,
    ],
    description: "Red Roots features a central puzzle-box mystery similar to The Mist but with an explosive genre-twist similar to The Cabin in the Woods and Oblivion Song. As the story unfolds, the lives of a professional killer and a high school teacher are bound by a terrifying, mysterious force. Each chapter takes readers deeper into a world of dark fantasy lore and plot-twisting revelations.",
    description_source: { name: "Image Comics", link: "https://imagecomics.com/press-releases/red-roots-vol-1-unleashes-genre-twisting-supernatural-mystery-this-fall" },
    link: "https://imagecomics.com/comics/series/red-roots",
  },
  {
    rank: 10,
    name: "If Destruction Be Our Lot",
    category: "Image Comics",
    attributions: [
      { label: "Writer", values: ["Mark Elijah Rosenberg", "Matthew Rosenberg"], showOnCard: true },
      { label: "Artist", values: ["Andy MacDonald"] },
      { label: "Colors", values: ["Francesco Segala"] },
      { label: "Letters", values: ["Hassan Otsmane-Elhaou"] },
    ],
    cover_image: `${SNAPS}/data/covers/if-destruction-be-our-lot/9ae641fc7206.jpg`,
    sample_images: [
      `${SNAPS}/images/if-destruction-be-our-lot/issue-5-1792967478-v2.jpg`,
      `${SNAPS}/images/if-destruction-be-our-lot/issue-3-1784408227-v2.jpg`,
      `${SNAPS}/images/if-destruction-be-our-lot/issue-1-1780866258.jpg`,
      `${SNAPS}/images/if-destruction-be-our-lot/issue-5-1792967519.jpg`,
    ],
    description: "Humanity is extinct and all that remains are the robots who once helped us. The robots who once helped us are happier now, doing their work without human interference. But not Abe. He believes there must be something more out there. After nearly getting killed, he's determined to wander the Earth until he finds it—or gets recycled trying.",
    description_source: { name: "Image Comics", link: "https://imagecomics.com/comics/releases/if-destruction-be-our-lot-1" },
    link: "https://imagecomics.com/comics/series/if-destruction-be-our-lot",
  },
];

export default { config, items, draft: true } satisfies YearList;
