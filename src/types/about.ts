export interface BadgeItem {
  icon: string;
  label: string;
  size: number;
  /** Position: "top-right" | "bottom-left" */
  position: "top-right" | "bottom-left";
}

export interface HobbyTag {
  icon: string;
  text: string;
}

export interface AvatarConfig {
  src: string;
  alt: string;
  width: number;
  height: number;
}

type HighlightPhrase = {
  text: string;
  action: "underline" | "highlight";
};


export interface AboutData {
  /** Small eyebrow label above the section heading, e.g. "— who am i" */
  sectionLabel: string;
  /** Prefix before the highlighted name in the h2, e.g. "Hi, I'm" */
  headingPrefix: string;
  name: string;
  tagline: string;
  avatar: AvatarConfig;
  badges: BadgeItem[];
  /** Full paragraph strings for the bio. Each entry is one paragraph. */
  bio: string[];
  /**
   * Substrings to highlight inside the bio paragraphs.
   * Index aligns with the bio paragraph index that contains the phrase.
   */
  highlightedPhrases: HighlightPhrase[];
  hobbyTags: HobbyTag[];
}
