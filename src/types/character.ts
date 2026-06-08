export interface Character {
  id: number;
  name: string;
  from: string;
  type: "Manga" | "Manhwa" | "Manhua";
  personality: string;
  description: string;
  /** Template cover path — contains `<range>` placeholder. */
  cover: string;
  /** Total number of cover images available for this character. */
  coverTotal: number;
  /** External search/wiki URL opened when the link icon is clicked. */
  url: string;
}
