import type { ListConfig } from "../types/ListConfig";
import { type RankItem } from "../types/RankTypes";


/**
 * Configuration for this specific ranking list
 * Edit this to customize the page header, branding, and intro
 */
export const listConfig: ListConfig = {
  branding: {
    authorName: "Jenny & Jacob's",
    authorInitials: "JJ",
    authorLink: "https://jacobkrch.com", // optional
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

/**
 * The ranked items for this list
 * Replace with your own items for a different ranking
 */
export const rankItems: RankItem[] = [
  {
    rank: 1,
    name: "Assorted Crisis Events",
    category: "Image Comics",
    attributions: [
      { label: "Writer", values: ["Deniz Camp"], showOnCard: true },
      { label: "Artist", values: ["Eric Zawadzki"] },
      { label: "Colors", values: ["Jordie Bellaire"] },
      { label: "Letters", values: ["Hassan Otsmane-Elhaou"] },
    ],
    cover_image: "/images/items/assorted-crisis-events-cover.jpg",
    sample_images: [
      "/images/items/assorted-crisis-events-1.jpg",
      "/images/items/assorted-crisis-events-2.jpg",
      "/images/items/assorted-crisis-events-3.jpg",
      "/images/items/assorted-crisis-events-4.jpg"
    ],
    description: "",
    review_comment: "I've never seen a description of this series that would make me want to read it, so I'll try to sum it up myself. \n\n Assorted Crisis Events is an anthology of standalone stories that explore contemporary issues through the lens of speculative fiction. Its topics include climate change, the experience of immigrants in the US, disability, the mishandling of childhood trauma, and more. Each story is distinct but they all share a sense of deep empathy. \n\n This is some of the most powerful, insightful social-political commentary I've seen in comics. Deniz Camp is doing great work here.",
    link: "https://imagecomics.com/comics/series/assorted-crisis-events"
  },
  {
    rank: 2,
    name: "Beneath the Trees Where Nobody Sees",
    category: "IDW Publishing",
    attributions: [
      { label: "Writer", values: ["Patrick Horvath"], showOnCard: true },
      { label: "Artist", values: ["Patrick Horvath"] },
      { label: "Colors", values: ["Patrick Horvath"] },
      { label: "Letters", values: ["Hassan Otsmane-Elhaou"] },
    ],
    cover_image: "/images/items/beneath-the-trees-cover.jpg",
    sample_images: [
      "/images/items/beneath-the-trees-1.jpg",
      "/images/items/beneath-the-trees-2.jpg"
    ],
    description: "Samantha Strong is a small-town serial killer, upstanding citizen, and adorable brown bear. \n\n Monica is inching closer and closer to discovering the truth about her brother's death…willing to do anything—cross any line—to make it happen. Samantha should be worried, but instead, the thrill has never been greater. Her unwitting prey is squirming in her clutches. For Samantha, this is where the real fun begins.",
    review_comment: "Horvath's sense of humor and deep character work has made this series one of our favorites.",
    link: "https://idwpublishing.com/products/beneath-the-trees-where-nobody-sees-tpb"
  },
  {
    rank: 3,
    name: "Minor Arcana",
    category: "BOOM! Studios",
    attributions: [
      { label: "Writer", values: ["Jeff Lemire"], showOnCard: true },
      { label: "Artist", values: ["Jeff Lemire"] },
      { label: "Colors", values: ["Jeff Lemire"] },
      { label: "Letters", values: ["Steve Wands"] },
    ],
    cover_image: "/images/items/minor-arcana-cover.jpg",
    sample_images: [
      "/images/items/minor-arcana-1.jpg",
      "/images/items/minor-arcana-2.jpg",
      "/images/items/minor-arcana-3.jpg"
    ],
    description: "Theresa, the estranged daughter of a small-town psychic fraud, returns home to care for her ailing mother. But she soon discovers there may be more to her mother's magic than she believed, finding herself pulled into a town that desperately needs her help.",
    review_comment: "Whatever Jeff Lemire writes AND illustrates, we'll read. This series sees him step outside of his usual sad-dad comfort zone and explore a new sad-mom/sad-daughter frontier with great results. Joking aside, Lemire is a master of the dark, heartfelt family drama.",
    link: "https://www.boom-studios.com/archives/minor-arcana-series-announcement/"
  },
  {
    rank: 4,
    name: "Absolute Wonder Woman",
    category: "DC Comics",
    attributions: [
      { label: "Writer", values: ["Kelly Thompson"], showOnCard: true },
      { label: "Artist", values: ["Hayden Sherman"] },
      { label: "Colors", values: ["Jordie Bellaire"] },
      { label: "Letters", values: ["Becca Carey"] },
    ],
    cover_image: "/images/items/wonder-woman-cover.jpg",
    sample_images: [
      "/images/items/wonder-woman-1.jpg",
      "/images/items/wonder-woman-2.jpg",
      "/images/items/wonder-woman-3.jpg"
    ],
    description: "A bold reimagining of Wonder Woman from the ground up. Without the island paradise, without the sisterhood, Diana is the last Amazon—raised in Hell by her adoptive mother Circe. Winner of Best New Series at the 2025 Eisner Awards.",
    review_comment: "This grecian-mythology rooted take on Wonder Woman might as well be the definitive version from here on. The themes of motherhood and identify are engaging and of course Hayden Sherman's art is spectacular.",
    link: "https://www.dc.com/comics/absolute-wonder-woman-2024/absolute-wonder-woman-1"
  },
  {
    rank: 5,
    name: "Universal Monsters: The Invisible Man",
    category: "Image Comics/Skybound",
    attributions: [
      { label: "Writer", values: ["James Tynion IV"], showOnCard: true },
      { label: "Artist", values: ["DANI"] },
      { label: "Colors", values: ["Brad Simpson"] },
      { label: "Letters", values: ["Becca Carey"] },
    ],
    cover_image: "/images/items/invisible-man-cover.jpg",
    sample_images: [
      "/images/items/invisible-man-1.jpg",
      "/images/items/invisible-man-2.jpg",
      "/images/items/invisible-man-3.jpg"
    ],
    description: "Jack Griffin has always been invisible to the people around him—at least in his own mind. Witness his legendary descent into madness as his humanity fades away and the monster inside is revealed.",
    review_comment: "I'm a big fan of Tynion's writing, and especially his dialogue, including, in this case, his character narration. He knows how to capture characters through their own words and that really made Jack Griffin come alive for me.",
    link: "https://imagecomics.com/press-releases/james-tynion-iv-dani-unveil-the-invisible-man-in-new-universal-monsters-series"
  },
  {
    rank: 6,
    name: "Invincible Universe: Battle Beast",
    category: "Image Comics/Skybound",
    attributions: [
      { label: "Writer", values: ["Robert Kirkman"], showOnCard: true },
      { label: "Artist", values: ["Ryan Ottley"] },
      { label: "Colors", values: ["Annalisa Leoni"] },
      { label: "Letters", values: ["Rus Wooton"] },
    ],
    cover_image: "/images/items/battle-beast-cover.jpg",
    sample_images: [
      "/images/items/battle-beast-1.jpg",
      "/images/items/battle-beast-2.jpg",
      "/images/items/battle-beast-3.jpg",
      "/images/items/battle-beast-4.jpg"
    ],
    description: "Cursed with an unquenchable thirst for violence that threatens those he loves, Battle Beast searches the universe for the one warrior mightier than him—so that he may die before harming anyone else.",
    review_comment: "We came for the big dumb fun and stayed for the compelling characters and visual storytelling.",
    link: "https://www.skybound.com/article/battle-beast-1-fourth-printing"
  },
  {
    rank: 7,
    name: "Redcoat",
    category: "Image Comics/Ghost Machine",
    attributions: [
      { label: "Writer", values: ["Geoff Johns"], showOnCard: true },
      { label: "Artist", values: ["Bryan Hitch", "Andrew Currie"] },
      { label: "Colors", values: ["Brad Anderson"] },
      { label: "Letters", values: ["Rob Leigh"] },
    ],
    cover_image: "/images/items/redcoat-cover.jpg",
    sample_images: [
      "/images/items/redcoat-1.jpg",
      "/images/items/redcoat-2.jpg"
    ],
    description: "British redcoat and all-around rogue, Simon mysteriously became immortal in 1776 after a run-in with the clandestine cabal known as the Founding Fathers, which included George Washington, John Hancock, and many other prominent American Revolutionary War leaders. Since that fateful day, Simon has led a life of adventure and avarice, rubbing elbows (and sometimes fists) with many of history's most renowned figures.",
    review_comment: "We've liked several of the Ghost Machine series, and it was a bit hard to choose between them. Redcoat made the list for its playful spirit and twisted take on American history tropes.",
    link: "https://imagecomics.com/comics/series/redcoat"
  },
  {
    rank: 8,
    name: "Phantom Road",
    category: "Image Comics",
    attributions: [
      { label: "Writer", values: ["Jeff Lemire"], showOnCard: true },
      { label: "Artist", values: ["Gabriel Hernández Walta"] },
      { label: "Colors", values: ["Jordie Bellaire"] },
      { label: "Letters", values: ["Steve Wands"] },
    ],
    cover_image: "/images/items/phantom-road-cover.jpg",
    sample_images: [
      "/images/items/phantom-road-1.jpg",
      "/images/items/phantom-road-2.jpg"
    ],
    description: "Mad Max: Fury Road meets The Sandman. Long-haul truck driver Dom stops to help Birdie after a car crash, pulling an artifact that throws their lives into fifth gear. A frantic journey through a surreal world hunted by strange and impossible monsters.",
    review_comment: "There's a type of haunted, moody storytelling that Lemire keeps returning to. If you're in a gray-to-beige mood, give this one a try.",
    link: "https://imagecomics.com/comics/series/phantom-road"
  },
  {
    rank: 9,
    name: "We're Taking Everyone Down With Us",
    category: "Image Comics",
    attributions: [
      { label: "Writer", values: ["Matthew Rosenberg"], showOnCard: true },
      { label: "Artist", values: ["Stefano Landini"] },
      { label: "Colors", values: ["Roman Titov", "Jason Wordie"] },
      { label: "Letters", values: ["Hassan Otsmane-Elhaou"] },
    ],
    cover_image: "/images/items/were-taking-everyone-down-cover.jpg",
    sample_images: [
      "/images/items/were-taking-everyone-down-1.jpg",
      "/images/items/were-taking-everyone-down-2.jpg"
    ],
    description: "After her mad-scientist father is killed by the world's greatest spy, 13-year-old Annalise is left alone in the world—sort of. Her dead dad's robot bodyguard is following her around. Now she must choose: lead a normal life or seek revenge and overthrow the world order.",
    review_comment: "Something about the way that Rosenberg writes young protagonists really works for me.",
    link: "https://imagecomics.com/comics/releases/were-taking-everyone-down-with-us-1-of-6"
  },
  {
    rank: 10,
    name: "Everything Dead and Dying",
    category: "Image Comics",
    attributions: [
      { label: "Writer", values: ["Tate Brombal"], showOnCard: true },
      { label: "Artist", values: ["Jacob Phillips"] },
      { label: "Colors", values: ["Pip Martin"] },
      { label: "Letters", values: ["Aditya Bidikar"] },
    ],
    cover_image: "/images/items/everything-dead-dying-cover.jpg",
    sample_images: [
      "/images/items/everything-dead-dying-1.jpg",
      "/images/items/everything-dead-dying-2.jpg"
    ],
    description: "Jack Chandler is the sole survivor of the zombie apocalypse in his rural farming community, but rather than eliminate them, he has chosen to continue living alongside the undead—including the husband and adopted daughter he fought so hard to have.",
    review_comment: "There is a devastating metaphor here about existing in a community that has left you behind, and the struggle to find meaning and connection in that context.",
    link: "https://imagecomics.com/comics/releases/everything-dead-dying-1-of-5"
  }
];