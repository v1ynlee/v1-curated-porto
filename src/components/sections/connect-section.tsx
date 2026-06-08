"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { MagicCard } from "@/components/ui/magic-card";
import { ExternalLink } from "lucide-react";
import type { SocialLink } from "@/types/social";

function FacebookIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <title>Facebook</title>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function PinterestIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <title>Pinterest</title>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function InstagramIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <title>Instagram</title>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function YoutubeIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <title>YouTube</title>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function ThreadsIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <title>Threads</title>
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.583-1.313-.877-2.39-.882h-.072c-.847 0-1.994.334-2.54 1.201l-1.785-1.147c.857-1.37 2.354-2.124 4.326-2.127h.085c3.151.019 5.09 1.575 5.39 4.376.886.183 1.7.507 2.417 1.027 1.335.978 2.085 2.361 2.387 3.779.594 2.806-.306 5.512-2.465 7.544-1.748 1.634-4.179 2.491-7.192 2.508z" />
    </svg>
  );
}

function TwitterXIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <title>X (Twitter)</title>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

import socialsData from "@/../public/data/socials.json";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  FacebookIcon,
  PinterestIcon,
  InstagramIcon,
  YoutubeIcon,
  ThreadsIcon,
  TwitterXIcon,
};

const socialLinks: SocialLink[] = socialsData.socialLinks.map((link) => ({
  ...link,
  icon: iconMap[link.iconName] ?? FacebookIcon,
}));

export function ConnectSection() {
  return (
    <section
      id="connect"
      aria-label="Connect with me"
      className="relative py-16 sm:py-20 section-bg-alt overflow-hidden"
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, var(--p-glow-soft), transparent)" }}
      />

      <div className="max-w-5xl mx-auto px-5">
        {/* Header */}
        <div className="text-center mb-16">
          <BlurFade delay={0.05} inView>
            <div
              className="text-xs font-medium tracking-widest uppercase mb-3"
              style={{ color: "var(--p)" }}
            >
              — find me here
            </div>
          </BlurFade>
          <BlurFade delay={0.1} inView>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-[var(--foreground)]">
              Let&apos;s Connect
            </h2>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <p className="max-w-md mx-auto text-[var(--muted-foreground)]">
              Drop by any of my socials — I&apos;m always happy to talk about manhwa,
              manga, and manhua recommendations.
            </p>
          </BlurFade>
        </div>

        {/* Social grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {socialLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <BlurFade key={link.name} delay={0.08 * i} inView>
                <MagicCard
                  className="h-full rounded-xl"
                  gradientColor="var(--p-glow-soft)"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit v1ynlee on ${link.name}`}
                    className={`group relative flex flex-col gap-3 p-5 h-full rounded-xl border border-[var(--border)] transition-all duration-300 hover:bg-[var(--accent)] ${link.hoverBorder}`}
                  >
                    {/* Icon */}
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon size={18} className="text-white" />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <p className={`font-semibold text-[var(--foreground)] text-sm transition-colors duration-200 ${link.hoverText}`}>
                          {link.name}
                        </p>
                        <ExternalLink
                          size={11}
                          className="text-[var(--muted-foreground)] transition-colors opacity-0 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </div>
                      <p className="text-xs text-[var(--muted-foreground)] mb-2">{link.handle}</p>
                      <p className="text-xs text-[var(--muted-foreground)] leading-relaxed opacity-80">
                        {link.description}
                      </p>
                    </div>
                  </a>
                </MagicCard>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
