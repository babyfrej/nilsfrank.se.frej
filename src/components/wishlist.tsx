import type { Wishlist, WishlistClaim } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import type { ReactNode } from "react";
import { Markdown } from "./markdown";
import { Modal } from "./modal";
import {
  ClaimHero,
  WishlistClaimForm,
  WishlistClaims,
} from "./wishlist-claim-form";
import styles from "./wishlist.module.css";

export type WishlistItem = Pick<
  Wishlist,
  "id" | "title" | "description" | "href" | "image" | "price" | "claimType"
> & { claims: Pick<WishlistClaim, "email" | "amount">[] };

export function WishlistHeader({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wishlist}>
      <h2>Frej&apos;s Önskelista</h2>
      <p>
        Frej&apos;s högsta önskan är så klart att ni kommer på hans kalas. Det
        tycker vi med. Känn inte att en present är något måste, ge bara om ni
        kan och ge inte mer än ni har möjlighet till. Om ifall det fortfarande
        är så att ni vill ge något så har vi en önskan.
      </p>
      <p>
        I år hade vi hoppas att ni vill hjälpa oss med att samla ihop lite
        pengar. Vi har flera saker som vi behöver införskaffa till Frej.
      </p>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export function WishlistHero({ hero }: { hero: WishlistItem }) {
  return (
    <div>
      {hero.image && (
        <div className={styles.imageWrapper}>
          <Image
            src={hero.image}
            alt="photo of a storage furniture for children"
            sizes="(max-width: 668px) 100vw, 668px"
            fill
            style={{ objectFit: "cover", borderRadius: "inherit" }}
          />
        </div>
      )}
      {hero.description && <Markdown content={hero.description} />}
      <div className={styles.collect}>
        <Modal trigger={<button>Va med och samla in</button>}>
          <WishlistClaimForm item={hero}>
            <ClaimHero />
          </WishlistClaimForm>
        </Modal>
      </div>
    </div>
  );
}

export function Wishlist({
  list,
  description = null,
}: {
  list: WishlistItem[];
  description?: JSX.Element | null;
}) {
  return (
    <div>
      {description}
      <ul className={clsx(styles.list)}>
        {list.map((item) => (
          <li key={item.id}>
            <WishlistItem item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

type WishlistItemProps = {
  item: WishlistItem;
};
function WishlistItem({
  item,
  item: { title, description, claimType, href, image },
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
    <div className={clsx(styles.item, { [styles.image]: !!elImage })}>
      {elImage}
      <div className={styles.card}>
        {elTitle}
        {description && <Markdown content={description} />}
      </div>
      <div className={styles.claim}>
        {isAvailable(item) ? (
          <Modal trigger={<button className="reset">Välj</button>}>
            <WishlistClaims item={item} />
          </Modal>
        ) : (
          <button disabled className="reset">
            {(() => {
              switch (claimType) {
                case "FULL":
                  return "Bokad";
                case "PARTIAL":
                  return "Delvis uppfyllt";
                case "NO":
                  return "";
              }
            })()}
          </button>
        )}
      </div>
    </div>
  );
}

const isAvailable = (item: WishlistItem) => {
  switch (item.claimType) {
    case "FULL":
      return !item.claims.some((c) => Boolean(c.email));
    case "PARTIAL":
      return item.price === null
        ? true
        : item.price <= item.claims.reduce((acc, c) => (acc += c.amount), 0);
    case "MULTIPLE":
      return true;
    case "NO":
    default:
      return false;
  }
};
