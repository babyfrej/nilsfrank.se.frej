import { createVar, globalStyle, style } from "@vanilla-extract/css";

export const card = style({
  display: "flex",
  gap: "1rem",
});

export const content = style({
  flex: "1 1 0%",
});

export const image = style({
  aspectRatio: "1/1",
  objectFit: "cover",
  borderRadius: "0.5rem",
  border: "2px solid color-mix(in lab, var(--bg-body), white 80%)",
});

export const title = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const actions = style({
  display: "flex",
  alignItems: "center",
  gap: ".8rem",
});

export const dotColorVar = createVar();

export const dots = style({
  display: "flex",
  alignItems: "center",
});

export const dot = style({
  vars: {
    "--dot-size": "1.2rem",
  },
  display: "inline-block",
  width: "var(--dot-size)",
  height: "var(--dot-size)",
  borderRadius: "calc(var(--dot-size) / 2)",
  border: "2px solid var(--bg-body)",
  backgroundColor: dotColorVar,
  marginInlineEnd: "calc(-1 * var(--dot-size) / 3)",
});

globalStyle(`${card} :where(h4, p)`, {
  margin: 0,
});
