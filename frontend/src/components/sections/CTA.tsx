"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGSAP, scrollReveal, onScrollSystemReady, ScrollTrigger } from "@/lib/gsap-config";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
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
    try {
      const res = await api.submitContact(form);
      setStatus(res.success ? "success" : "error");
      if (res.success) {
        setForm({ name: "", email: "", business: "", message: "", type: "discovery" });
      }
    } catch {
      setStatus("error");
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

        <div className="cta-reveal grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col gap-4 sm:flex-row">
            <a href="#contact" className="btn-primary" data-cursor="magnetic">
              Book A Call
            </a>
            <button
              type="button"
              onClick={() => setForm((f) => ({ ...f, type: "proposal" }))}
              className="btn-ghost"
              data-cursor="magnetic"
            >
              Get A Proposal
            </button>
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
              <p className="text-sm text-red-400">
                Something went wrong. Please try again or email us directly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
