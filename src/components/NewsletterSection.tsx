"use client";

import { useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

interface NewsletterSectionProps {
  title?: string;
  description?: string;
  className?: string;
}

export function NewsletterSection({
  title = "Fique por dentro",
  description = "Receba uma notificação quando eu publicar novos artigos. Sem spam, cancele quando quiser.",
  className,
}: NewsletterSectionProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  const isLoading = status === "loading";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("https://formspree.io/f/mgojzqob", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, _subject: "Nova inscrição na newsletter" }),
      });
      if (!res.ok) throw new Error("Falha ao inscrever");
      setEmail("");
      setStatus("success");
      setMessage("Inscrição confirmada! Obrigado.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Falha ao inscrever");
    }
  }

  return (
    <section className={cn("relative overflow-hidden py-12 md:py-16", className)}>
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card px-6 py-10 text-center sm:px-10">
        <div
          className="pointer-events-none absolute -right-40 -top-32 opacity-60"
          aria-hidden="true"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="500" height="430" fill="none">
            <g filter="url(#nl-a)">
              <path fill="url(#nl-b)" fillRule="evenodd" d="m56 88 344 212-166 188L56 88Z" clipRule="evenodd" />
            </g>
            <defs>
              <linearGradient id="nl-b" x1="210.5" x2="210.5" y1="88" y2="467" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--primary)" stopOpacity="0.35" />
                <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
              </linearGradient>
              <filter id="nl-a" width="520" height="576" x="-32" y="0" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="44" />
              </filter>
            </defs>
          </svg>
        </div>
        <h2 className="mb-3 font-display text-xl font-extrabold tracking-tight md:text-2xl">
          {title}
        </h2>
        <p className="mx-auto mb-6 max-w-md text-muted-foreground">{description}</p>
        <form onSubmit={handleSubmit} className="mx-auto max-w-md">
          <div className="flex gap-2 max-sm:flex-col">
            <Input
              id="newsletter-email"
              className="flex-1"
              placeholder="seu@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              aria-label="Email para newsletter"
              required
            />
            <Button type="submit" className="group relative" disabled={isLoading}>
              <span className={cn("inline-flex items-center", isLoading && "text-transparent")}>
                Inscrever
                <ArrowRight className="-me-1 ms-2 h-4 w-4 opacity-60 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
              {isLoading && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <LoaderCircle className="animate-spin" size={16} strokeWidth={2} aria-hidden="true" />
                </span>
              )}
            </Button>
          </div>
          {message && (
            <p
              className={cn(
                "mt-2 text-xs",
                status === "error" ? "text-destructive" : "text-muted-foreground",
              )}
              role="alert"
              aria-live="polite"
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
