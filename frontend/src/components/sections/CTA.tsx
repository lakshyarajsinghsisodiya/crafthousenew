"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGSAP, scrollReveal, onScrollSystemReady, ScrollTrigger } from "@/lib/gsap-config";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { BookCallActions } from "@/components/ui/BookCallActions";
import { siteContact } from "@/lib/site-config";
import { api } from "@/lib/api";

export function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    message: "",
    type: "discovery" as "discovery" | "proposal",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    registerGSAP();
    let ctx: gsap.Context | undefined;

    const setup = () => {
      ctx?.revert();
      ctx = gsap.context(() => {
        scrollReveal(".cta-reveal", sectionRef.current, {
          y: 60,
          duration: 1.2,
          stagger: 0.1,
          start: "top 78%",
        });
      }, sectionRef);
      ScrollTrigger.refresh();
    };

    const cancelReady = onScrollSystemReady(setup);
    setup();

    return () => {
      cancelReady();
      ctx?.revert();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await api.submitContact(form);
      if (res.success) {
        setStatus("success");
        setForm({ name: "", email: "", business: "", message: "", type: "discovery" });
      } else {
        setStatus("error");
        setErrorMessage(
          res.message || "Something went wrong. Please call or WhatsApp us directly.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Could not reach the server. Please call or WhatsApp us directly.");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden py-24 md:py-40"
    >
      <div className="section-padding">
        <div className="cta-reveal">
          <EditorialHeading
            lines={["READY", "TO", "GROW?"]}
            size="hero"
            className="mb-8"
          />
          <p className="mb-12 max-w-lg text-sm text-[rgba(255,255,255,0.65)] md:text-base">
            Let&apos;s build something unforgettable.
          </p>
        </div>

        <div
          id="book-call"
          className="cta-reveal mb-16 scroll-mt-28 rounded border border-[rgba(255,255,255,0.08)] bg-[#111111] p-6 md:p-10"
        >
          <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[#B72A2A]">
            Book a call
          </p>
          <p className="mb-6 max-w-md text-sm text-[rgba(255,255,255,0.65)]">
            Call or WhatsApp us directly — we&apos;ll respond as soon as possible.
          </p>
          <BookCallActions />
        </div>

        <div className="cta-reveal grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col gap-6">
            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-[rgba(255,255,255,0.45)]">
                Or send a message
              </p>
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, type: "discovery" }))}
                className={`mr-3 text-[10px] uppercase tracking-[0.2em] ${
                  form.type === "discovery"
                    ? "text-[#B72A2A]"
                    : "text-[rgba(255,255,255,0.4)]"
                }`}
              >
                Discovery call
              </button>
              <button
                type="button"
                onClick={() => setForm((f) => ({ ...f, type: "proposal" }))}
                className={`text-[10px] uppercase tracking-[0.2em] ${
                  form.type === "proposal"
                    ? "text-[#B72A2A]"
                    : "text-[rgba(255,255,255,0.4)]"
                }`}
              >
                Get a proposal
              </button>
            </div>
            <p className="text-sm text-[rgba(255,255,255,0.45)]">
              Email:{" "}
              <a
                href={`mailto:${siteContact.email}`}
                className="text-[#F5F5F5] underline-offset-4 hover:text-[#B72A2A] hover:underline"
              >
                {siteContact.email}
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <input
                required
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border-b border-[rgba(255,255,255,0.15)] bg-transparent py-3 text-sm outline-none transition-colors focus:border-[#B72A2A]"
              />
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border-b border-[rgba(255,255,255,0.15)] bg-transparent py-3 text-sm outline-none transition-colors focus:border-[#B72A2A]"
              />
            </div>
            <input
              placeholder="Business Name"
              value={form.business}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
              className="w-full border-b border-[rgba(255,255,255,0.15)] bg-transparent py-3 text-sm outline-none transition-colors focus:border-[#B72A2A]"
            />
            <textarea
              required
              rows={4}
              placeholder="Tell us about your brand..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full resize-none border-b border-[rgba(255,255,255,0.15)] bg-transparent py-3 text-sm outline-none transition-colors focus:border-[#B72A2A]"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary w-full sm:w-auto"
              data-cursor="magnetic"
            >
              {status === "loading" ? "Sending..." : "Send Message"}
            </button>
            {status === "success" && (
              <p className="text-sm text-[#B72A2A]">
                Thank you. We&apos;ll be in touch within 24 hours.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-400">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
