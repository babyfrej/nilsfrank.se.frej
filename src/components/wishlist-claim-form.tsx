"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import cookie from "js-cookie";
import { useId, useState, type ReactNode } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { z } from "zod";
import { ModalClose } from "./modal";
import styles from "./wishlist.module.css";
import type { WishlistItem } from "./wishlist";
import { EmailDisclaimer } from "./email-disclaimer";

const formFields = z.object({
  email: z
    .string()
    .nonempty("E-postadress är obligatorisk")
    .email("Ogiltig e-postadress"),
});

type FormFields = z.infer<typeof formFields>;

type Props = {
  item: { id: string };
  children: ReactNode;
};

export function WishlistClaimForm({ item, children }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const email = cookie.get(process.env.NEXT_PUBLIC_COOKIE_CODE);
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
  return (
    <WishlistClaimForm item={item}>
      {(() => {
        switch (claimType) {
          case "FULL":
            return <ClaimFull item={item} />;
          case "MULTIPLE":
            return <ClaimMultiple item={item} />;
          case "PARTIAL":
            return <ClaimRange item={item} />;
        }
      })()}
    </WishlistClaimForm>
  );
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

export function ClaimHero() {
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
