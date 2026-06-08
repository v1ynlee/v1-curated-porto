export interface SocialLink {
  name: string;
  handle: string;
  href: string;
  description: string;
  gradient: string;
  hoverBorder: string;
  hoverText: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}
