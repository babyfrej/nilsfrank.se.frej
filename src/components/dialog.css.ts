import { createVar, globalStyle, style, keyframes } from "@vanilla-extract/css";

const bgVar = createVar();
const bgMixVar = createVar();

const scrollShadow = keyframes({
  "0%": {
    boxShadow: "0px 0px 10px 5px #00000050",
  },
  "70%": {
    boxShadow: "0px 0px 10px 5px #00000050",
  },
  "100%": {
    boxShadow: "unset",
  },
});

export const dialog = style({
  vars: {
    [bgVar]: "var(--clr-tertiary)",
    [bgMixVar]: "hsl(0, 0%, 100%)",
  },
  overscrollBehavior: "contain",
  color: "currentColor",
  borderRadius: 32,
  width: "min(90vw, 400px)",
  backgroundColor: bgVar,
  border: `1px solid color-mix(in lab, ${bgVar} 60%, ${bgMixVar})`,
  borderBlockEnd: "none",
  boxShadow: "0 19px 38px rgba(0,0,0,0.60), 0 15px 12px rgba(0,0,0,0.22)",
  padding: 0,
  position: "relative",
});

globalStyle(`${dialog} header`, {
  paddingInline: "1rem",
  paddingBlockStart: "1rem",
});
globalStyle(`${dialog} main`, {
  paddingInline: "1rem",
});
globalStyle(`${dialog} footer`, {
  position: "sticky",
  bottom: 0,
  padding: "1rem",
  background: bgVar,
  animation: `${scrollShadow} linear`,
  animationTimeline: "scroll(block nearest)",
});

globalStyle(`body:has(${dialog})`, {
  height: "auto !important",
  overflow: "hidden !important",
});
