import { globalStyle, style } from "@vanilla-extract/css";

const fontTertiary = style({
  fontFamily: "var(--font-tertiary)",
  color: "var(--txt-color)",
});

export const pile = style({
  display: "grid",
  placeItems: "center",
});

globalStyle(`${pile} > *`, {
  gridArea: "1/1",
});

export const candyBag = style([pile, { padding: "1rem" }]);
export const candyShadow = style({
  filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.4))",
});

export const titleCardContainer = style({
  paddingBlockStart: "6rem",
  paddingInline: "1rem",
});

export const titleCardTitle = style([
  fontTertiary,
  {
    textAlign: "center",
    vars: { "--txt-color": "white" },
  },
]);
