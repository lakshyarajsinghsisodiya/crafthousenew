/** Public contact details — safe to use in client components */
export const siteContact = {
  email: "veloracommercials@gmail.com",
  phones: [
    {
      id: "primary",
      display: "+91 75669 60696",
      tel: "+917566960696",
      whatsapp: "917566960696",
    },
    {
      id: "secondary",
      display: "+91 89626 02181",
      tel: "+918962602181",
      whatsapp: "918962602181",
    },
  ],
} as const;

export function whatsappUrl(number: string, text?: string) {
  const base = `https://wa.me/${number}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export const defaultWhatsAppMessage =
  "Hi Crafthouse Media, I'd like to book a discovery call about growing my brand.";
