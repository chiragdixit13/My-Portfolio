import { AnimatePresence, motion } from "motion/react";
import { Download, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/portfolio";

export function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [zoom, setZoom] = useState(1);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Resume viewer"
        >
          <motion.div
            className="glass flex h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
              <p className="text-sm font-medium">Resume — {profile.name}</p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
                  aria-label="Zoom out"
                  className="rounded-full p-2 text-muted-foreground hover:bg-white/8 hover:text-foreground"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="w-12 text-center font-mono text-xs text-muted-foreground">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  onClick={() => setZoom((z) => Math.min(2, z + 0.2))}
                  aria-label="Zoom in"
                  className="rounded-full p-2 text-muted-foreground hover:bg-white/8 hover:text-foreground"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Open fullscreen"
                  className="rounded-full p-2 text-muted-foreground hover:bg-white/8 hover:text-foreground"
                >
                  <Maximize2 className="h-4 w-4" />
                </a>
                <a
                  href={profile.resumeUrl}
                  download
                  aria-label="Download resume"
                  className="rounded-full p-2 text-muted-foreground hover:bg-white/8 hover:text-foreground"
                >
                  <Download className="h-4 w-4" />
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close resume viewer"
                  className="rounded-full p-2 text-muted-foreground hover:bg-white/8 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto bg-black/30 p-4">
              <div
                className="mx-auto h-full origin-top transition-transform"
                style={{ transform: `scale(${zoom})`, width: `${100 / zoom}%` }}
              >
                <object
                  data={profile.resumeUrl}
                  type="application/pdf"
                  className="h-full min-h-[60vh] w-full rounded-xl"
                  aria-label="Resume PDF"
                >
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-10 text-center">
                    <p className="text-sm text-muted-foreground">
                      Add your PDF at <code className="text-cyan">public/resume.pdf</code> (or change{" "}
                      <code className="text-cyan">profile.resumeUrl</code> in{" "}
                      <code className="text-cyan">src/data/portfolio.ts</code>) to preview it here.
                    </p>
                    <a
                      href={profile.resumeUrl}
                      download
                      className="rounded-full bg-[image:var(--gradient-brand)] px-5 py-2 text-sm font-medium text-primary-foreground"
                    >
                      Download resume
                    </a>
                  </div>
                </object>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
