import { createFileRoute } from "@tanstack/react-router";
import Lenis from "lenis";
import { useEffect, useState } from "react";
import { Backdrop } from "@/components/Backdrop";
import { Cursor } from "@/components/Cursor";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Nav } from "@/components/Nav";
import { Tour } from "@/components/Tour";
import { AIAssistant } from "@/components/AIAssistant";
import { ResumeModal } from "@/components/ResumeModal";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Certificates } from "@/components/sections/Certificates";
import { GitHubPanel } from "@/components/sections/GitHubPanel";
import { Inspiration } from "@/components/sections/Inspiration";
import { Contact } from "@/components/sections/Contact";
import { profile } from "@/data/portfolio";

const title = "Chirag Dixit — AI/ML Engineer & Software Engineer";
const description =
  "Portfolio of Chirag Dixit, AI/ML Engineer and Software Engineer building intelligent machine learning systems and modern full stack products.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "Chirag Dixit, AI Engineer, Machine Learning Engineer, Software Engineer, Full Stack Developer, Python, React, portfolio",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: "AI/ML Engineer, Software Engineer",
          description: profile.tagline,
          email: `mailto:${profile.email}`,
          address: { "@type": "PostalAddress", addressLocality: "Gurugram", addressCountry: "IN" },
          sameAs: [profile.socials.github, profile.socials.linkedin],
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Maharshi Dayanand University, Rohtak",
          },
          knowsAbout: [
            "Machine Learning",
            "Python",
            "Data Analysis",
            "React",
            "Full Stack Development",
          ],
        }),
      },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [tour, setTour] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setTour(false);
        setResumeOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <LoadingScreen />
      <Backdrop />
      <Cursor />
      <Nav />

      <main>
        <Hero onResume={() => setResumeOpen(true)} onTour={() => setTour(true)} />
        <About onResume={() => setResumeOpen(true)} />
        <Skills />
        <Education />
        <Projects />
        <Experience />
        <Certificates />
        <GitHubPanel />
        <Inspiration />
        <Contact />
      </main>

      <AIAssistant />
      <Tour active={tour} onExit={() => setTour(false)} />
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
