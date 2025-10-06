import { createVar, globalStyle, style } from "@vanilla-extract/css";

const bgVar = createVar();
const bgMixVar = createVar();
export const dialog = style({
  vars: {
    [bgVar]: "var(--clr-tertiary)",
    [bgMixVar]: "hsl(0, 0%, 100%)",
  },
  overflow: "visible",
  overscrollBehavior: "contain",
  color: "currentColor",
  borderRadius: 32,
  width: "min(90vw, 400px)",
  backgroundColor: bgVar,
  border: `1px solid color-mix(in lab, ${bgVar} 60%, ${bgMixVar})`,
  borderBlockEnd: "none",
  boxShadow: "0 19px 38px rgba(0,0,0,0.60), 0 15px 12px rgba(0,0,0,0.22)",
  padding: 0,
});

globalStyle(`${dialog} > *`, { padding: "1rem" });

export const scolldisable = style({
  height: "auto !important",
  overflow: "hidden !important",
});
