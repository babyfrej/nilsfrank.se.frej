import { style, globalStyle } from "@vanilla-extract/css";

export const wrapper = style({
  paddingBottom: "4rem",
})
export const content = style({
  display: "grid",
  gap: "2rem",
});

export const collect = style({
  display: "flex",
  justifyContent: "center",
});

export const list = style({
  listStyle: "none",
  vars: {
    "--picture-size": "5rem",
  },
});

export const listItem = style({
  selectors: {
    "&:not(:last-child)": {
      marginBottom: "2rem",
    },
  },
});

export const wishlistForm = style({
  padding: "1rem",
  paddingBlockEnd: "0",
});

export const actions = style({
  display: "flex",
  justifyContent: "flex-end",
});

export const success = style({
  display: "grid",
  gap: "1rem",
  marginBlockStart: "-6rem",
  placeItems: "center",
});

export const successSpan = style({
  fontSize: "2rem",
  fontWeight: "bold",
});

export const emoji = style({
  vars: {
    "--emoji-size": "6rem",
  },
  backgroundColor: "color-mix(in lab, var(--clr-tertiary) 80%, white)",
  boxShadow: "0px 0px 16px 8px rgba(0,0,0,0.5)",
  fontSize: "var(--emoji-size)",
  borderRadius: "var(--emoji-size)",
  lineHeight: 1,
  aspectRatio: "1 / 1",
  display: "grid",
  padding: "1.6rem",
  placeItems: "center",
});

export const stack = style({
  display: "grid",
  placeItems: "center",
});

globalStyle(`${stack} > *`, { gridArea: "1/1" });

export const imageWrapper = style({
  vars: {
    "--shadow-size": "1rem",
  },
  display: "grid",
  placeItems: "center",
  width: "80%",
  marginInline: "auto",
  marginBlock: "calc(var(--shadow-size) * 2)",
  position: "relative",
  aspectRatio: "2 / 1",
  borderRadius: "32px",
  overflow: "hidden",
  border: "1px solid color-mix(in lab, var(--bg-body) 74%, white)",
  borderBlockEnd: "none",
  boxShadow: "0 0 var(--shadow-size) rgba(0, 0, 0, 0.220)",
});
export const image = style({
  zIndex: -1,
  objectFit: "cover",
  borderRadius: "inherit",
});

export const badge = style({
  vars: {
    "--text": "white",
  },
  textShadow: "3px 3px 3px var(--clr-text)",
  color: "var(--text)",
  fontSize: "var(--fs-800)",
  fontWeight: "var(--fw-bold)",
});
