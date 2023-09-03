"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import styles from "./wishlist.module.css";
import cookie from "js-cookie";

const formFields = z.object({
  email: z.string().nonempty("Email är obligatoriskt").email("Ogiltig email"),
});

type FormFields = z.infer<typeof formFields>;

type ModalInjectedProps = {
  onClose: () => void;
};
type Props = {
  item: string;
} & Partial<ModalInjectedProps>;

export function WishlistClaimForm({ item, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const email = cookie.get(process.env.NEXT_PUBLIC_COOKIE_CODE);
  const ariaId = useId();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(formFields),
    defaultValues: {
      email,
    },
  });

  const handleClose = () => {
    setSubmitted(false);
    reset();
    onClose?.();
  };

  const onSubmit = async (values: FormFields) => {
    const res = await fetch(`/api/wishlist/${item}/claim`, {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (res.ok) {
      setSubmitted(true);
    }
  };
  if (submitted) {
    return (
      <div className={styles.wishlistForm}>
        <h2>Tack för din anmälan!</h2>
        <p>Vi återkommer till dig så fort vi kan.</p>
        <div className={styles.actions}>
          <button type="reset" onClick={handleClose}>
            Stäng
          </button>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wishlistForm}>
        <label htmlFor={`${ariaId}-email`}>
          <span>Email</span>
          <input
            type="email"
            id={`${ariaId}-email`}
            {...register("email", {})}
            aria-invalid={!!errors.email?.message}
            aria-errormessage={errors.email?.message && `${ariaId}-email-err`}
          />
          {errors.email?.message && (
            <span id={`${ariaId}-email-err`} className="text sm">
              {errors.email?.message}
            </span>
          )}
        </label>
        <div className={styles.actions}>
          <button type="reset" onClick={handleClose}>
            Stäng
          </button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Laddar" : "Skicka"}
          </button>
        </div>
      </div>
    </form>
  );
}
