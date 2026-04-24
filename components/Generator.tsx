"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { toPng, toBlob } from "html-to-image";
import { Shuffle, Download, Copy, Check } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";
import { THEMES, THEME_ORDER, ThemeKey } from "@/lib/themes";
import type { ImageManifest } from "@/lib/images";
import { Card } from "./Card";

type Props = {
  manifest: ImageManifest;
};

export default function Generator({ manifest }: Props) {
  const [categoryKey, setCategoryKey] = useState<string>("all");
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [quote, setQuote] = useState("");
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [themeKey, setThemeKey] = useState<ThemeKey>("light");
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const theme = THEMES[themeKey];

  const pool = useMemo(() => manifest[categoryKey] || [], [manifest, categoryKey]);

  function pickRandom() {
    if (!pool.length) return;
    let candidate = pool[Math.floor(Math.random() * pool.length)];
    // avoid duplicate in a row if pool > 1
    if (pool.length > 1 && candidate === currentImage) {
      candidate = pool[(pool.indexOf(candidate) + 1) % pool.length];
    }
    setCurrentImage(candidate);
  }

  // pick one on mount so the preview isn't empty
  useEffect(() => {
    if (!currentImage && pool.length) {
      setCurrentImage(pool[Math.floor(Math.random() * pool.length)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function renderPng(): Promise<Blob | null> {
    if (!cardRef.current) return null;
    const node = cardRef.current;
    // html-to-image honors node's exact size. Card is 1080x1440.
    return await toBlob(node, {
      pixelRatio: 1,
      cacheBust: true,
      backgroundColor: theme.bg,
    });
  }

  async function handleDownload() {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 1,
        cacheBust: true,
        backgroundColor: theme.bg,
      });
      const link = document.createElement("a");
      link.download = `100-days-listen-labs-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } finally {
      setExporting(false);
    }
  }

  async function handleCopy() {
    setExporting(true);
    try {
      const blob = await renderPng();
      if (!blob) return;
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      alert("Copy to clipboard failed. Use Download instead.");
      console.error(err);
    } finally {
      setExporting(false);
    }
  }

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 64px" }}>
      {/* Brand header */}
      <div style={{ textAlign: "center", padding: "24px 0 48px", fontSize: 12 }}>
        <span style={{ color: "var(--content-secondary)" }}>Listen Labs /</span>
        <span style={{ color: "var(--content-primary)" }}> 100 Days of Listen Labs</span>
      </div>

      {/* Section title */}
      <h1
        style={{
          fontSize: 40,
          textAlign: "center",
          margin: "0 0 8px",
          color: "var(--content-primary)",
        }}
      >
        Generate your weird little dudes and dudettes
      </h1>
      <p
        style={{
          fontSize: 16,
          textAlign: "center",
          margin: "0 0 48px",
          color: "var(--content-secondary)",
        }}
      >
        Pick a theme, generate an image, add your details, and share.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "start",
        }}
        className="generator-grid"
      >
        {/* Controls */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <Section label="Image theme">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {CATEGORIES.map((c) => (
                <button
                  key={c.key}
                  onClick={() => {
                    setCategoryKey(c.key);
                    const next = manifest[c.key] || [];
                    if (next.length) {
                      setCurrentImage(next[Math.floor(Math.random() * next.length)]);
                    }
                  }}
                  style={pillStyle(categoryKey === c.key)}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </Section>

          <div>
            <button onClick={pickRandom} style={primaryButton}>
              <Shuffle size={18} strokeWidth={1.5} /> Generate
            </button>
          </div>

          <Section label="Your name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Brannon Wellington"
              style={inputStyle}
            />
          </Section>

          <Section label="Your job title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Founding Product Designer"
              style={inputStyle}
            />
          </Section>

          <Section label="Your favorite thing about Listen Labs">
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="I love how everyone is constantly helping each other in the office."
              rows={4}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.4 }}
            />
          </Section>

          <Section label="Card theme">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {THEME_ORDER.map((k) => (
                <button
                  key={k}
                  onClick={() => setThemeKey(k)}
                  style={pillStyle(themeKey === k)}
                >
                  {THEMES[k].label}
                </button>
              ))}
            </div>
          </Section>

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleDownload} disabled={exporting} style={primaryButton}>
              <Download size={18} strokeWidth={1.5} /> Download PNG
            </button>
            <button onClick={handleCopy} disabled={exporting} style={secondaryButton}>
              {copied ? <Check size={18} strokeWidth={1.5} /> : <Copy size={18} strokeWidth={1.5} />}
              {copied ? "Copied" : "Copy PNG"}
            </button>
          </div>
        </div>

        {/* Preview */}
        <PreviewPane>
          <Card
            ref={cardRef}
            imageSrc={currentImage}
            quote={quote}
            name={name || "Your name"}
            title={title || "Your title"}
            theme={theme}
          />
        </PreviewPane>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.generator-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function PreviewPane({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    function measure() {
      const el = wrapRef.current;
      if (!el) return;
      const w = el.clientWidth;
      setScale(w / 1080);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div
        ref={wrapRef}
        style={{
          width: "100%",
          maxWidth: 480,
          aspectRatio: "3 / 4",
          overflow: "hidden",
          border: "1px solid var(--content-disabled)",
          borderRadius: 8,
          position: "relative",
          background: "var(--surface-secondary)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1080,
            height: 1440,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
      <div style={{ fontSize: 12, color: "var(--content-secondary)" }}>
        Preview · exports at 1080 × 1440 PNG
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <label style={{ fontSize: 12, color: "var(--content-secondary)" }}>{label}</label>
      {children}
    </div>
  );
}

function pillStyle(active: boolean): React.CSSProperties {
  return {
    padding: "8px 12px",
    fontSize: 14,
    borderRadius: 8,
    border: `1px solid ${active ? "var(--content-primary)" : "var(--content-disabled)"}`,
    background: active ? "var(--content-primary)" : "transparent",
    color: active ? "var(--content-inverse-primary)" : "var(--content-primary)",
    cursor: "pointer",
  };
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 12px",
  fontSize: 14,
  border: "1px solid var(--content-disabled)",
  borderRadius: 8,
  background: "var(--surface-highlight)",
  color: "var(--content-primary)",
  outline: "none",
  boxSizing: "border-box",
};

const primaryButton: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "12px 16px",
  fontSize: 14,
  borderRadius: 8,
  border: "1px solid var(--content-primary)",
  background: "var(--content-primary)",
  color: "var(--content-inverse-primary)",
  cursor: "pointer",
};

const secondaryButton: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "12px 16px",
  fontSize: 14,
  borderRadius: 8,
  border: "1px solid var(--content-primary)",
  background: "transparent",
  color: "var(--content-primary)",
  cursor: "pointer",
};
