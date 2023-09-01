import { Wishlist } from "@prisma/client";
import styles from "./wishlist.module.css";
import Image from "next/image";
import clsx from "clsx";

export type WishlistItem = Pick<
  Wishlist,
  "id" | "title" | "description" | "href" | "image" | "price" | "claimType"
>;
type WishlistProps = {
  list: WishlistItem[];
};
export function Wishlist({ list }: WishlistProps) {
  return (
    <ul className={styles.wishlist}>
      {list.map((item) => (
        <li key={item.id}>
          <WishlistItem item={item} claim={<WishlistClaims item={item} />} />
        </li>
      ))}
    </ul>
  );
}

type WishlistItemer = {
  item: WishlistItem;
};
type WishlistItemProps = WishlistItemer & {
  claim: JSX.Element;
};
function WishlistItem({
  item: { title, description, claimType, href, image },
  claim,
}: WishlistItemProps) {
  let elTitle = <h4>{title}</h4>;
  let elImage = image && (
    <Image
      src={image}
      alt={title}
      width={80}
      height={80}
      className={styles.image}
    />
  );
  if (href) {
    elTitle = <a href={href}>{elTitle}</a>;
    elImage = image && <a href={href}>{elImage}</a>;
  }
  return (
    <div className={clsx(styles.wishlist, styles.item)}>
      <div className={styles.picture}>{elImage}</div>
      <div className={styles.card}>
        {elTitle}
        <p>{description}</p>
        {claimType}
        {claimType !== "NO" && <div className={styles.claim}>{claim}</div>}
      </div>
    </div>
  );
}

type WishlistClaimsProps = WishlistItemer;

export function WishlistClaims({
  item: { claimType },
  item,
}: WishlistClaimsProps) {
  let claim = null;
  switch (claimType) {
    case "FULL":
    case "MULTIPLE":
      claim = <ClaimCheckbox item={item} />;
      break;
    case "PARTIAL":
      claim = <ClaimRange item={item} />;
      break;
  }
  return <div>{claim}</div>;
}

function ClaimCheckbox({ item: { id, title } }: WishlistItemer) {
  return <input type="checkbox" id={id} name={title} />;
}
function ClaimRange({ item: { price } }: WishlistItemer) {
  return (
    <div>
      <div></div>
      <div>
        <input type="number" min="0" />
      </div>
    </div>
  );
}
