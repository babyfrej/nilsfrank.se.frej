"use client";
import { useId } from "react";
import { onSubmit } from "./actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formFields = z.object({
  email: z.string().min(1, "Field is Required").email("Invalid Email"),
  password: z.string().min(8, "Invalid Password"),
});
type FormFields = z.infer<typeof formFields>;

export function ClientPage() {
  const ariaId = useId();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(formFields),
  });
  const onSubmit = async (data: FormFields) => {
    console.log(data);
    const res = await fetch("/login", {
      method: "post",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      console.error("error");
      return;
    }

    const body = await res.json();
    console.log(body);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor={`${ariaId}-email`}>
        <span>Email</span>
        <input
          type="email"
          id={`${ariaId}-email`}
          {...register("email", { required: true })}
        />
        {errors.email?.message && (
          <span id={`${ariaId}-email-err`} className="text sm">
            {errors.email?.message}
          </span>
        )}
      </label>
      <label htmlFor={`${ariaId}-password`}>
        <span>Password</span>
        <input
          type="password"
          id={`${ariaId}-password`}
          {...register("password", { required: true })}
        />
        {errors.password?.message && (
          <span id={`${ariaId}-password-err`} className="text sm">
            {errors.password?.message}
          </span>
        )}
      </label>
      <button type="submit" disabled={isSubmitting}>
        Login
      </button>
    </form>
  );
}
