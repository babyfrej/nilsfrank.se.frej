import Image from "next/image";
import Link from "next/link";
import { Markdown } from "./markdown";
import { Modal } from "./modal";
import type { WishlistItem } from "./wishlist";
import { WishlistClaims } from "./wishlist-claim-form";
import * as css from "./wishlist-item.css";
import { hsla } from "@/utils/hsla";
import { ClaimType } from "@/types/claim-type";
import { isAvailable } from "./wishlist-utils";
import { WishlistItemDot } from "./wishlist-item-dot";

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
      <div className={css.content}>
        <div className={css.title}>
          {elTitle}
          <div className={css.actions}>
            {Boolean(item.claims?.length) && (
              <div className={css.dots}>
                {hsla(
                  { saturation: 80, lightness: 76, alpha: 1 },
                  item.claims.length,
                ).map((c) => (
                  <WishlistItemDot key={c} color={c} />
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
                    return null;
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
