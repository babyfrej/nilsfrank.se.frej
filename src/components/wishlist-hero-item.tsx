import Image from "next/image";
import Link from "next/link";
import { Markdown } from "./markdown";
import { Modal } from "./modal";
import { WishlistClaims } from "./wishlist-claim-form";
import type { WishlistItem } from "./wishlist";
import styles from "./wishlist.module.css";
import * as css from "./wishlist.css";
import { isHeroClaimable } from "./wishlist-utils";
import { ClaimType } from "@/types/claim-type";

export function WishlistHero({ item }: { item: WishlistItem }) {
  let elTitle = <h3 className="text align-center">{item.title}</h3>;
  let elImage = item.image && (
    <div className={styles.imageWrapper}>
      <Image
        src={item.image}
        alt="photo of a storage furniture for children"
        sizes="(max-width: 668px) 100vw, 668px"
        fill
        style={{ objectFit: "cover", borderRadius: "inherit" }}
      />
    </div>
  );
  if (item.href) {
    elTitle = <Link href={item.href}>{elTitle}</Link>;
    elImage = item.image && <Link href={item.href}>{elImage}</Link>;
  }
  return (
    <article style={{ paddingBottom: "4rem" }}>
      {elTitle}
      {elImage}
      {item.description && <Markdown content={item.description} />}
      {isHeroClaimable(item) && (
        <div className={css.collect}>
          <Modal trigger={<button>{buttonText(item)}</button>}>
            <WishlistClaims item={item} />
          </Modal>
        </div>
      )}
    </article>
  );
}

const buttonText = (item: WishlistItem) => {
  switch (item.claimType) {
    case ClaimType.DONATE:
      return "Va med och samla in";
    case ClaimType.FULL:
    case ClaimType.MULTIPLE:
    case ClaimType.PARTIAL:
      return "Välj";
    case ClaimType.NO:
    default:
      return null;
  }
};
