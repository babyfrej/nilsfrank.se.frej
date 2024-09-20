import { ClaimType } from "@/types/claim-type";
import type { WishlistItem } from "./wishlist";

export const isHeroClaimable = (item: WishlistItem) => {
  switch (item.claimType) {
    case ClaimType.FULL:
    case ClaimType.PARTIAL:
    case ClaimType.MULTIPLE:
    case ClaimType.DONATE:
      return true;
    case ClaimType.NO:
    default:
      return false;
  }
};

export const isAvailable = (item: WishlistItem) => {
  switch (item.claimType) {
    case ClaimType.FULL:
      return !item.claims.some((c) => Boolean(c.email));
    case ClaimType.PARTIAL:
      return item.price === null
        ? true
        : item.price <= item.claims.reduce((acc, c) => (acc += c.amount), 0);
    case ClaimType.MULTIPLE:
    case ClaimType.DONATE:
      return true;
    case ClaimType.NO:
    default:
      return false;
  }
};
