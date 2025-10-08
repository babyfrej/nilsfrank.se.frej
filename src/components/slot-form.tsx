"use client";
import { Clock } from "@/components/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "@/utils/format";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { EmailDisclaimer } from "./email-disclaimer";

const guestProps = z
  .object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    adults: z.number().int().min(1).optional(),
    children: z.number().int().min(0).optional(),
    notes: z.string().optional().nullish(),
    attending: z.boolean().optional(),
  })
  .optional();
const props = z.object({
  slot: z.object({
    id: z.string(),
    start: z.date().optional(),
    end: z.date().optional(),
    seats: z.number().optional(),
  }),
  guest: guestProps,
});

type Props = z.infer<typeof props>;

const formFields = z.object({
  reservationId: z.string(),
  email: z.string().email("Ogiltig email"),
  name: z.string(),
  adults: z.coerce
    .number()
    .int("Ange en siffra")
    .min(1, "Minst en måste komma"),
  children: z.coerce
    .number()
    .int("Ange en siffra")
    .min(0, "Ange noll eller större")
    .optional(),
  notes: z.coerce.string().nullish(),
});

type FormFields = z.infer<typeof formFields>;

export function SlotForm({ slot, guest }: Props) {
  const router = useRouter();
  const defaults = guestProps.parse(guest);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormFields>({
    resolver: zodResolver(formFields),
    defaultValues: {
      ...defaults,
      reservationId: slot.id,
    },
  });

  async function onSubmit(formData: FormFields) {
    await fetch(`/api/slot`, {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then(() => {
        router.push(`/slot/success`);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const deleteFields = watch(["email", "reservationId"]);
  const onDelete = useCallback(async () => {
    const [email, reservationId] = deleteFields as [string, string];
    await fetch(`/api/slot`, {
      method: "DELETE",
      body: JSON.stringify({ email, reservationId }),
    });
    router.push(`/slot/delete`);
  }, [router, deleteFields]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <article>
        <header>
          <input type="hidden" {...register("reservationId")} />
          <h2 className="text align-center color-inherit">
            {slot.start && format(slot.start, "yyyy-MM-dd")}
          </h2>
          <p className="flex align-center">
            <Clock />
            <span>
              {slot.start && format(slot.start, "HH:mm")}
              {slot.end && ` - ${format(slot.end, "HH:mm")}`}
            </span>
          </p>
        </header>
        <main>
          <div>
            <label htmlFor="email">
              <span>E-post</span>
              <EmailDisclaimer />
              <input autoFocus type="email" {...register("email")} />
              {errors.email?.message && (
                <span className="text sm">{errors.email.message}</span>
              )}
            </label>
            <label htmlFor="name">
              <span>Namn</span>
              <input type="text" {...register("name")} />
            </label>
          </div>
          <div className="flex gap-2">
            <label htmlFor="adults" className="flex-1">
              <span>Vuxna</span>
              <input type="number" {...register("adults")} id="adults" />
              {errors.adults?.message && (
                <span className="text sm">{errors.adults.message}</span>
              )}
            </label>
            <label htmlFor="children" className="flex-1">
              <span>Barn</span>
              <input type="number" {...register("children")} id="children" />
              {errors.children?.message && (
                <span className="text sm">{errors.children.message}</span>
              )}
            </label>
          </div>
          <div>
            <label htmlFor="notes">
              <span>Matrestriktioner</span>
              <textarea
                rows={3}
                {...register("notes")}
                placeholder="eller annat vi behöver veta"
              />
            </label>
          </div>
        </main>
        <footer>
          <div className="flex justify-end">
            {guest?.attending && (
              <button type="button" className="reset" onClick={onDelete}>
                Ta bort
              </button>
            )}
            <button type="button" className="reset" onClick={router.back}>
              Avbryt
            </button>
            <button type="submit">Skicka</button>
          </div>
        </footer>
      </article>
    </form>
  );
}
