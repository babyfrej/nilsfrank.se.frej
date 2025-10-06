"use client";

import type { PropsWithChildren, RefCallback } from "react";
import { clsx } from "clsx";
import * as css from "./dialog.css";

export function Dialog({
  children,
  className,
}: PropsWithChildren<{ className: string }>) {
  const open: RefCallback<HTMLDialogElement> = (ref) => {
    ref?.showModal();
  };
  return (
    <dialog className={clsx(className, css.dialog)} ref={open}>
      {children}
    </dialog>
  );
}
