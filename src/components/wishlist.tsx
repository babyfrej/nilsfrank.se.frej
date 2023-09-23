import type { Wishlist, WishlistClaim } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Markdown } from "./markdown";
import { Modal } from "./modal";
import { WishlistClaims } from "./wishlist-claim-form";
import * as css from "./wishlist.css";
import styles from "./wishlist.module.css";
import { WishlistItem } from "./wishlist-item";

export type WishlistItem = Pick<
  Wishlist,
  "id" | "title" | "description" | "href" | "image" | "price" | "claimType"
> & { claims: Pick<WishlistClaim, "email" | "amount">[] };

export function WishlistHeader({ children }: { children: ReactNode }) {
  return (
    <div>
      <h2>Frejs Önskelista</h2>
      <p>
        Frejs högsta önskan är så klart att ni kommer på hans kalas. Det tycker
        vi med. Känn inte att en present är något måste, ge bara om ni kan och
        ge inte mer än ni har möjlighet till. Om ifall det fortfarande är så att
        ni vill ge något så har vi en önskan.
      </p>
      <p>
        I år hade vi hoppas att ni vill hjälpa oss med att samla ihop lite
        pengar. Vi har flera saker som vi behöver införskaffa till Frej.
      </p>
      <div className={css.content}>{children}</div>
    </div>
  );
}

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
      <div className={css.collect}>
        <Modal trigger={<button>Va med och samla in</button>}>
          <WishlistClaims item={item} />
        </Modal>
      </div>
    </article>
  );
}

export function Wishlist({ list }: { list: WishlistItem[] }) {
  return (
    <ul className={clsx(styles.list)}>
      {list.map((item) => (
        <li key={item.id}>
          <WishlistItem item={item} />
        </li>
      ))}
    </ul>
  );
}
