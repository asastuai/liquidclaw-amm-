"use client"

import Link from "next/link"
import Image from "next/image"
import { Github, MessageCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n"

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const socialLinks = [
  { icon: XIcon, href: "https://x.com/ClawFinance", label: "X" },
  { icon: Github, href: "https://github.com/asastuai/liquidclaw-amm-", label: "GitHub" },
  { icon: MessageCircle, href: "#", label: "Discord" },
]

export function Footer() {
  const { t } = useI18n()

  const footerLinks = {
    [t("footer.protocol")]: [
      { label: t("nav.swap"), href: "/swap" },
      { label: t("nav.pools"), href: "/pools" },
      { label: t("nav.gauges"), href: "/gauges" },
      { label: t("nav.vote"), href: "/vote" },
    ],
    [t("footer.governance")]: [
      { label: t("nav.lock"), href: "/lock" },
      { label: t("nav.dashboard"), href: "/dashboard" },
      { label: t("nav.rewards"), href: "/rewards" },
      { label: t("nav.aiVault"), href: "/ai-vault" },
    ],
    [t("footer.developers")]: [
      { label: t("footer.documentation"), href: "/docs" },
      { label: t("footer.forBuilders"), href: "/docs/for-builders" },
      { label: t("footer.tokenomics"), href: "/docs/tokenomics" },
      { label: "GitHub", href: "https://github.com/asastuai/liquidclaw-amm-" },
    ],
  }

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10">
                <Image
                  src="/images/lobster-mascot.jpg"
                  alt="LiquidClaw"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold text-foreground">
                Liquid<span className="text-primary">Claw</span>
              </span>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-sm">
              {t("footer.tagline")}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-foreground mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-muted-foreground">{t("footer.operational")}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
