import Image from "next/image";
import Link from "next/link";
import { Markdown } from "./markdown";
import { Modal } from "./modal";
import type { WishlistItem } from "./wishlist";
import { WishlistClaims } from "./wishlist-claim-form";
import * as css from "./wishlist-item.css";
import { hsla } from "@/utils/hsla";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { ClaimType } from "@/types/claim-type";

type WishlistItemProps = {
  item: WishlistItem;
};

export function WishlistItem({
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
      className={css.image}
    />
  );
  if (href) {
    elTitle = <Link href={href}>{elTitle}</Link>;
    elImage = image && <Link href={href}>{elImage}</Link>;
  }
  return (
    <div className={css.card}>
      {elImage}
      <div>
        <div className={css.title}>
          {elTitle}
          <div className={css.actions}>
            {Boolean(item.claims?.length) && (
              <div className={css.dots}>
                {hsla(
                  { saturation: 80, lightness: 76, alpha: 1 },
                  item.claims.length,
                ).map((c) => (
                  <div
                    key={c}
                    className={css.dot}
                    style={assignInlineVars({ [css.dotColorVar]: c })}
                  />
                ))}
              </div>
            )}
            {isAvailable(item) ? (
              <Modal trigger={<button className="reset">Välj</button>}>
                <WishlistClaims item={item} />
              </Modal>
            ) : (
              (() => {
                switch (claimType) {
                  case ClaimType.FULL:
                    return (
                      <button disabled className="reset">
                        Bokad
                      </button>
                    );
                  default:
                    null;
                }
              })()
            )}
          </div>
        </div>
        {description && <Markdown content={description} />}
      </div>
    </div>
  );
}

const isAvailable = (item: WishlistItem) => {
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
