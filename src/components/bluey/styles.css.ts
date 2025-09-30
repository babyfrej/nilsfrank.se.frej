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

export const candyBagWrapper = style([pile, { padding: "1rem" }]);
export const candyShadow = style({
  filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.4))",
});
export const candyBag = style({
  width: "200px",
});
export const purpleCandy = style({
  width: "60px",
  translate: "-70px 70px",
});
export const gum = style({ width: "40px", translate: "-50px 80px" });
export const orangeCandy = style({ width: "60px", translate: "70px 70px" });
export const lolipop = style({ width: "70px", translate: "-6px 70px" });
export const yellowCandy = style({ width: "60px", translate: "98px 80px" });
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
