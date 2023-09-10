"use client";
import clsx from "clsx";
import {
  cloneElement,
  createContext,
  useContext,
  useMemo,
  useRef,
  type ButtonHTMLAttributes,
  type ReactNode,
  type MouseEventHandler,
} from "react";

const modalCtx = createContext<{ open: () => void; close: () => void } | null>(
  null,
);
export const useModal = () => {
  const modal = useContext(modalCtx);
  if (modal === null) {
    throw new Error("useModal must be used within a <Modal />");
  }
  return modal;
};
export function Modal({
  children,
  trigger,
}: {
  children: ReactNode;
  trigger: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  const value = useMemo(() => {
    const close = () => {
      ref.current!.close();
    };
    const open = () => {
      ref.current!.showModal();
    };
    return { open, close };
  }, []);
  const button = cloneElement(trigger as any, {
    onClick: value.open,
  });
  return (
    <modalCtx.Provider value={value}>
      <dialog ref={ref} style={{ overflow: "visible" }}>
        {children}
      </dialog>
      {button}
    </modalCtx.Provider>
  );
}

export function ModalClose({
  children,
  onClick,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { close } = useModal();
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    close();
  };
  return (
    <button
      {...props}
      className={clsx("button", className)}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
