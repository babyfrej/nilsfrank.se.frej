import type { Wishlist, WishlistClaim } from "@prisma/client";
import clsx from "clsx";
import type { ReactNode } from "react";
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
