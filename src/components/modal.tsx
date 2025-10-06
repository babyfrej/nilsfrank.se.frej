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
  type ElementRef,
  useState,
} from "react";
import { dialog } from "./modal.css";

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
  const ref = useRef<ElementRef<"dialog">>(null);
  const [isOpen, setOpen] = useState(false);

  const value = useMemo(() => {
    const close = () => {
      setOpen(false);
      ref.current!.close();
    };
    const open = () => {
      setOpen(true);
      ref.current!.showModal();
    };
    return { open, close };
  }, []);

  const button = cloneElement(trigger as any, {
    onClick: value.open,
  });

  const handleClick: MouseEventHandler = (e) => {
    if (e.target !== ref.current) {
      return;
    }
    value.close();
  };

  return (
    <modalCtx.Provider value={value}>
      <dialog className={dialog} ref={ref} onClick={handleClick}>
        {isOpen && children}
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
    if (e.defaultPrevented) {
      return;
    }
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
