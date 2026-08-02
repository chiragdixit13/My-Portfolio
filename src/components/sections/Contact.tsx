import { motion } from "motion/react";
import { Github, Linkedin, Mail, MapPin, Send, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { profile } from "@/data/portfolio";
import { GlassCard, MagneticButton, Reveal, Section } from "@/components/ui-kit";

const EMAILJS = {
  service: import.meta.env["VITE_EMAILJS_SERVICE_ID"] as string | undefined,
  template: import.meta.env["VITE_EMAILJS_TEMPLATE_ID"] as string | undefined,
  publicKey: import.meta.env["VITE_EMAILJS_PUBLIC_KEY"] as string | undefined,
};

function RobotIllustration() {
  return (
    <motion.svg
      viewBox="0 0 220 200"
      className="mx-auto w-52"
      aria-hidden
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="bot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.68 0.17 255)" />
          <stop offset="100%" stopColor="oklch(0.66 0.2 300)" />
        </linearGradient>
      </defs>
      <ellipse cx="110" cy="185" rx="48" ry="7" fill="url(#bot)" opacity="0.18" />
      <line x1="110" y1="34" x2="110" y2="52" stroke="url(#bot)" strokeWidth="3" />
      <motion.circle
        cx="110"
        cy="28"
        r="7"
        fill="oklch(0.82 0.14 200)"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <rect x="58" y="52" width="104" height="76" rx="26" fill="url(#bot)" opacity="0.22" />
      <rect
        x="58"
        y="52"
        width="104"
        height="76"
        rx="26"
        fill="none"
        stroke="url(#bot)"
        strokeWidth="2"
      />
      <motion.g animate={{ scaleY: [1, 0.15, 1] }} transition={{ duration: 4, repeat: Infinity }}>
        <circle cx="90" cy="90" r="8" fill="oklch(0.82 0.14 200)" />
        <circle cx="130" cy="90" r="8" fill="oklch(0.82 0.14 200)" />
      </motion.g>
      <rect x="92" y="110" width="36" height="4" rx="2" fill="oklch(0.82 0.14 200)" opacity="0.6" />
      <rect x="72" y="134" width="76" height="38" rx="16" fill="url(#bot)" opacity="0.18" />
      <rect
        x="72"
        y="134"
        width="76"
        height="38"
        rx="16"
        fill="none"
        stroke="url(#bot)"
        strokeWidth="2"
      />
    </motion.svg>
  );
}

export function Contact() {
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    if (!name || !email || !message) {
      toast.error("Please fill in every field.");
      return;
    }

    setSending(true);
    try {
      if (EMAILJS.service && EMAILJS.template && EMAILJS.publicKey) {
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: EMAILJS.service,
            template_id: EMAILJS.template,
            user_id: EMAILJS.publicKey,
            template_params: { from_name: name, from_email: email, message },
          }),
        });
        if (!res.ok) throw new Error(await res.text());
        toast.success("Message sent — I'll get back to you shortly.");
        form.reset();
      } else {
        window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
          `Portfolio enquiry from ${name}`,
        )}&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;
        toast.info("Opening your email client…");
      }
    } catch {
      toast.error("Couldn't send right now — please email me directly.");
    } finally {
      setSending(false);
    }
  };

  const links = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Github, label: "GitHub", value: `@${profile.githubUsername}`, href: profile.socials.github },
    { icon: Linkedin, label: "LinkedIn", value: "Connect", href: profile.socials.linkedin },
    { icon: FileText, label: "Resume", value: "View / download", href: profile.resumeUrl },
  ];

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          Let's build something <span className="text-gradient">intelligent</span>
        </>
      }
      description="Hiring for AI, ML, backend or full stack roles? I'd love to hear about the problem you're solving."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal>
          <GlassCard className="p-7 sm:p-9">
            <form onSubmit={submit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-xs tracking-[0.18em] text-muted-foreground uppercase">
                    Name
                  </span>
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    className="w-full rounded-2xl border border-border bg-white/5 px-4 py-3 text-sm transition-colors outline-none focus:border-cyan/60"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-xs tracking-[0.18em] text-muted-foreground uppercase">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full rounded-2xl border border-border bg-white/5 px-4 py-3 text-sm transition-colors outline-none focus:border-cyan/60"
                    placeholder="you@company.com"
                  />
                </label>
              </div>
              <label className="block">
                <span className="mb-2 block text-xs tracking-[0.18em] text-muted-foreground uppercase">
                  Message
                </span>
                <textarea
                  name="message"
                  required
                  rows={6}
                  className="w-full resize-none rounded-2xl border border-border bg-white/5 px-4 py-3 text-sm transition-colors outline-none focus:border-cyan/60"
                  placeholder="Tell me about the role or project…"
                />
              </label>
              <MagneticButton variant="primary" type="submit">
                <Send className="h-4 w-4" /> {sending ? "Sending…" : "Send message"}
              </MagneticButton>
            </form>
          </GlassCard>
        </Reveal>

        <div className="space-y-5">
          <Reveal delay={0.08}>
            <GlassCard className="p-7">
              <RobotIllustration />
              <p className="mt-4 text-center text-sm text-muted-foreground">
                Usually replies within a day.
              </p>
            </GlassCard>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="grid gap-3 sm:grid-cols-2">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="glass group flex items-center gap-3 rounded-2xl p-4 transition-all hover:-translate-y-0.5 hover:border-cyan/50"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/6 text-cyan transition-shadow group-hover:shadow-[0_0_22px_-4px_var(--cyan)]">
                    <l.icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted-foreground">{l.label}</span>
                    <span className="block truncate text-sm">{l.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <GlassCard className="overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 text-sm">
                <MapPin className="h-4 w-4 shrink-0 text-cyan" />
                <span className="truncate">{profile.location}</span>
              </div>
              <iframe
                title="Location map"
                loading="lazy"
                className="h-56 w-full grayscale-[0.4] invert-[0.92] hue-rotate-180"
                src="https://www.openstreetmap.org/export/embed.html?bbox=76.95%2C28.36%2C77.12%2C28.54&layer=mapnik&marker=28.4595%2C77.0266"
              />
            </GlassCard>
          </Reveal>
        </div>
      </div>

      <footer className="mt-20 flex flex-col items-center gap-2 border-t border-border pt-8 text-center text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} {profile.name}. Designed & built with care.
        </p>
        <p>AI/ML Engineer · Software Engineer · Open to opportunities</p>
      </footer>
    </Section>
  );
}
