import Image from "next/image";
import { siteContact, whatsappUrl, defaultWhatsAppMessage } from "@/lib/site-config";

const footerLinks = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Portfolio" },
  { href: "#packages", label: "Packages" },
  { href: "#contact", label: "Contact" },
];

const socials = [
  {
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    href: whatsappUrl(siteContact.phones[0].whatsapp, defaultWhatsAppMessage),
    label: "WhatsApp",
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[rgba(255,255,255,0.06)] bg-[#090909]">
      <div className="section-padding py-16 md:py-24">
        <div className="mb-12 overflow-hidden md:mb-16">
          <p className="editorial-heading editorial-display whitespace-nowrap text-[#151515] transition-colors hover:text-[#B72A2A]/20">
            CRAFTHOUSE MEDIA
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Image
              src="/logo-cs.png"
              alt="Crafthouse Media"
              width={160}
              height={48}
              className="mb-6 h-10 w-auto"
            />
            <p className="text-sm text-[rgba(255,255,255,0.45)]">
              Building Brands That People Remember.
            </p>
          </div>

          <nav>
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.35)]">
              Navigation
            </p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[rgba(255,255,255,0.65)] transition-colors hover:text-[#F5F5F5]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.35)]">
              Connect
            </p>
            <ul className="space-y-2">
              {siteContact.phones.map((phone) => (
                <li key={phone.id}>
                  <a
                    href={`tel:${phone.tel}`}
                    className="text-sm text-[rgba(255,255,255,0.65)] transition-colors hover:text-[#B72A2A]"
                  >
                    {phone.display}
                  </a>
                </li>
              ))}
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[rgba(255,255,255,0.65)] transition-colors hover:text-[#B72A2A]"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[rgba(255,255,255,0.06)] pt-8 text-[10px] uppercase tracking-[0.2em] text-[rgba(255,255,255,0.35)] md:flex-row md:justify-between">
          <p>© 2026 Crafthouse Media. All Rights Reserved.</p>
          <p>
            <a
              href={`mailto:${siteContact.email}`}
              className="transition-colors hover:text-[#B72A2A]"
            >
              {siteContact.email}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
