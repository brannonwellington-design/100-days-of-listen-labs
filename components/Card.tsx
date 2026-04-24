"use client";

import { forwardRef } from "react";
import { LLMark } from "./LLMark";
import { Theme } from "@/lib/themes";

type Props = {
  imageSrc: string | null;
  quote: string;
  name: string;
  title: string;
  theme: Theme;
};

// 3:4 ratio card rendered at 1080 x 1440 (PNG export size).
export const Card = forwardRef<HTMLDivElement, Props>(function Card(
  { imageSrc, quote, name, title, theme },
  ref,
) {
  return (
    <div
      ref={ref}
      data-card
      style={{
        width: 1080,
        height: 1440,
        backgroundColor: theme.bg,
        color: theme.textPrimary,
        fontFamily: "Inter, sans-serif",
        fontWeight: 400,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        padding: 64,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          flex: "0 0 auto",
          width: "100%",
          aspectRatio: "1 / 1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageSrc}
            alt=""
            crossOrigin="anonymous"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              border: `1px solid ${theme.textSecondary}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.textSecondary,
              fontSize: 20,
            }}
          >
            Generate an image to begin
          </div>
        )}
      </div>

      <div
        style={{
          marginTop: 48,
          fontSize: 40,
          lineHeight: 1.3,
          color: theme.textPrimary,
          flex: "1 1 auto",
        }}
      >
        {quote ? `“${quote}”` : ""}
      </div>

      <div
        style={{
          marginTop: 32,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontSize: 40, lineHeight: 1.2, color: theme.textPrimary }}>{name}</div>
          <div style={{ fontSize: 40, lineHeight: 1.2, color: theme.textSecondary }}>{title}</div>
        </div>
        <div style={{ flexShrink: 0 }}>
          <LLMark color={theme.textPrimary} size={72} />
        </div>
      </div>
    </div>
  );
});
