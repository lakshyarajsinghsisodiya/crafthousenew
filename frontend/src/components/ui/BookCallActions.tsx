"use client";

import { siteContact, whatsappUrl, defaultWhatsAppMessage } from "@/lib/site-config";

interface BookCallActionsProps {
  compact?: boolean;
  className?: string;
}

export function BookCallActions({ compact = false, className = "" }: BookCallActionsProps) {
  return (
    <div
      className={`flex flex-col gap-3 ${compact ? "" : "sm:flex-row sm:flex-wrap"} ${className}`}
    >
      {siteContact.phones.map((phone) => (
        <div
          key={phone.id}
          className={`flex gap-2 ${compact ? "flex-col sm:flex-row" : "flex-col sm:flex-row"}`}
        >
          <a
            href={`tel:${phone.tel}`}
            className="btn-primary justify-center text-center"
            data-cursor="magnetic"
          >
            Call {phone.display}
          </a>
          <a
            href={whatsappUrl(phone.whatsapp, defaultWhatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost justify-center text-center"
            data-cursor="magnetic"
          >
            WhatsApp
          </a>
        </div>
      ))}
    </div>
  );
}
