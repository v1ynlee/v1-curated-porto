export type StatusType = "Completed" | "Ongoing" | "Hiatus" | "Axed";

export interface ComicCard {
  id: number;
  title: string;
  origin: "Manhwa" | "Manga" | "Manhua";
  genres: string[];
  tags: string[];
  description: string;
  rating: number;
  chapters: string;
  status: StatusType;
  neonFrom: string;
  neonTo: string;
  slug: string;
  /** Template cover path — contains `<range>` placeholder. */
  cover: string;
  /** Total number of cover images available for this slug. */
  coverTotal: number;
  /** External reading URL opened when the link icon is clicked. */
  url: string;
}
