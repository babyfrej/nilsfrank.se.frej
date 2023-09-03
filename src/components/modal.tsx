"use client";
import { type ReactNode, cloneElement, useRef, useCallback } from "react";

export function Modal({
  children,
  trigger,
}: {
  children: ReactNode;
  trigger: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const handleOpen = useCallback(() => {
    ref.current!.showModal();
  }, []);
  const handleClose = useCallback(() => {
    ref.current!.close();
  }, []);
  const button = cloneElement(trigger as any, {
    onClick: handleOpen,
  });

  return (
    <>
      <dialog ref={ref}>
        {cloneElement(children as any, {
          onClose: handleClose,
        })}
      </dialog>
      {button}
    </>
  );
}
