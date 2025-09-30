"use client";
import * as css from "./wishlist-item.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";

export const WishlistItemDot = ({ color }: { color: string }) => (
  <div
    className={css.dot}
    style={assignInlineVars({ [css.dotColorVar]: color })}
  />
);
