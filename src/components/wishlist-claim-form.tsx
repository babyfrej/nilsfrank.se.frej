"use client";
import { useCookie } from "@/hooks/useCookie";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { EmailDisclaimer } from "./email-disclaimer";
import { ModalClose } from "./modal";
import type { WishlistItem } from "./wishlist";
import { qrWrapper } from "./wishlist-claim-form.css";
import styles from "./wishlist.module.css";
import { ClaimType } from "@/types/claim-type";

const formFields = z.object({
  email: z.string().min(1, "Email är obligatoriskt").email("Ogiltig email"),
});

type FormFields = z.infer<typeof formFields>;

type Props = {
  item: { id: string };
  children: ReactNode;
};

export function WishlistClaimForm({ item, children }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const email = useCookie(process.env.NEXT_PUBLIC_COOKIE_CODE);
  const form = useForm<FormFields>({
    resolver: zodResolver(formFields),
    defaultValues: {
      email,
    },
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const handleClose = () => {
    setSubmitted(false);
    reset();
  };

  const onSubmit = async (values: FormFields) => {
    const res = await fetch(`/api/wishlist/${item.id}/claim`, {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (res.ok) {
      setSubmitted(true);
    }
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.wishlistForm}>
          {submitted && (
            <div className={clsx(styles.success)}>
              <div className={styles.emoji}>🎉</div>
              <span>Stort Tack!</span>
            </div>
          )}
          {!submitted && <div className={styles.form}>{children}</div>}
          <div className={styles.actions}>
            <ModalClose type="button" onClick={handleClose}>
              Stäng
            </ModalClose>
            {!submitted && (
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Laddar" : "Skicka"}
              </button>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

type WishlistClaimsProps = {
  item: WishlistItem;
};

export function WishlistClaims({
  item: { claimType },
  item,
}: WishlistClaimsProps) {
  switch (claimType) {
    case ClaimType.FULL:
      return (
        <WishlistClaimForm item={item}>
          <ClaimFull item={item} />
        </WishlistClaimForm>
      );
    case ClaimType.MULTIPLE:
      return (
        <WishlistClaimForm item={item}>
          <ClaimMultiple item={item} />
        </WishlistClaimForm>
      );
    case ClaimType.PARTIAL:
      return (
        <WishlistClaimForm item={item}>
          <ClaimRange item={item} />
        </WishlistClaimForm>
      );
    case ClaimType.DONATE:
      return (
        <div>
          <ClaimDonate item={item} />
          <div className={styles.actions}>
            <ModalClose type="button">Stäng</ModalClose>
          </div>
        </div>
      );
  }
}

function ClaimFull({ item: { id, title } }: WishlistClaimsProps) {
  const ariaId = useId();
  const {
    register,
    formState: { errors },
  } = useFormContext<FormFields>();
  return (
    <div>
      <label htmlFor={`${ariaId}-email`}>
        <span>E-post</span>
        <EmailDisclaimer />
        <input
          type="email"
          id={`${ariaId}-email`}
          {...register("email")}
          aria-invalid={!!errors.email?.message}
          aria-errormessage={errors.email?.message && `${ariaId}-email-err`}
        />
        {errors.email?.message && (
          <span id={`${ariaId}-email-err`} className="text sm">
            {errors.email?.message}
          </span>
        )}
      </label>
    </div>
  );
}
function ClaimMultiple({ item: { id, title } }: WishlistClaimsProps) {
  const ariaId = useId();
  const {
    register,
    formState: { errors },
  } = useFormContext<FormFields>();
  return (
    <div>
      <h4 className="text align-center">{title}</h4>
      <label htmlFor={`${ariaId}-email`}>
        <span>E-post</span>
        <EmailDisclaimer />
        <input
          type="email"
          id={`${ariaId}-email`}
          {...register("email")}
          aria-invalid={!!errors.email?.message}
          aria-errormessage={errors.email?.message && `${ariaId}-email-err`}
        />
        {errors.email?.message && (
          <span id={`${ariaId}-email-err`} className="text sm">
            {errors.email?.message}
          </span>
        )}
      </label>
    </div>
  );
}

function ClaimRange({ item: { price } }: WishlistClaimsProps) {
  return (
    <div>
      <div></div>
      <div>
        <input type="number" min="0" />
      </div>
    </div>
  );
}

export function ClaimDonate({ item: { id, title } }: WishlistClaimsProps) {
  return (
    <div style={{ display: "grid", marginBlockEnd: "1rem" }}>
      <h2 className="text align-center">{title}</h2>
      <div className={qrWrapper}>
        <Image
          src={`/api/qr/${id}/img.png`}
          priority
          alt="Swish QR"
          sizes="(max-width: 668px) 80vw, 368px"
          fill
        />
      </div>
      <Link
        className="text sm"
        style={{
          color: "var(--clr-text)",
          placeSelf: "center",
          padding: "0.2rem 1rem",
          border: "1px solid currentColor",
          borderRadius: "1rem",
          textAlign: "center",
        }}
        href={`swish://`}
      >
        Öppna Swish
      </Link>
    </div>
  );
}
