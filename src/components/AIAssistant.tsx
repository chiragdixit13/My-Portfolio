import { AnimatePresence, motion } from "motion/react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { assistantKnowledge, profile } from "@/data/portfolio";

type Msg = { role: "user" | "bot"; text: string };

const suggestions = assistantKnowledge.map((k) => k.q);

function answer(input: string): string {
  const q = input.toLowerCase();
  let best: { score: number; a: string } | null = null;
  for (const entry of assistantKnowledge) {
    const score = entry.keys.reduce((s, k) => (q.includes(k) ? s + k.length : s), 0);
    if (score > 0 && (!best || score > best.score)) best = { score, a: entry.a };
  }
  if (best) return best.a;
  return `I can answer anything about ${profile.name}'s background, projects, skills, education, experience, certificates, resume or contact details. Try one of the suggested questions below.`;
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "bot",
      text: `Hi! I'm Chirag's portfolio assistant. Ask me about his projects, skills, experience or how to get in touch.`,
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;
    setMessages((m) => [...m, { role: "user", text: clean }]);
    setInput("");
    window.setTimeout(() => {
      setMessages((m) => [...m, { role: "bot", text: answer(clean) }]);
    }, 420);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label="Ask my AI assistant"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 240, damping: 18 }}
        className="fixed right-5 bottom-5 z-[95] inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-brand)] px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow-strong)]"
      >
        {open ? <X className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask My AI"}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="glass fixed right-4 bottom-24 z-[95] flex max-h-[70vh] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl"
            role="dialog"
            aria-label="Portfolio AI assistant"
          >
            <div className="flex items-center gap-3 border-b border-border px-5 py-4">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-brand)] text-primary-foreground">
                <Bot className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Portfolio Assistant</p>
                <p className="truncate text-xs text-muted-foreground">
                  Trained on Chirag's resume & projects
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-[image:var(--gradient-brand)] text-primary-foreground"
                      : "bg-white/6 text-muted-foreground"
                  }`}
                >
                  {m.text}
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="border-t border-border p-3">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="shrink-0 rounded-full border border-border bg-white/5 px-3 py-1.5 text-[0.7rem] whitespace-nowrap text-muted-foreground hover:border-cyan/50 hover:text-foreground"
                  >
                    {s}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(input);
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask something…"
                  aria-label="Ask the assistant"
                  className="min-w-0 flex-1 rounded-full border border-border bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-cyan/60"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-primary-foreground"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
