"use client";
import Cookies, { type CookieAttributes } from "js-cookie";
import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();
const cookieStore = {
  get: (key: string) => Cookies.get(key),
  set: (key: string, value: string, _options: CookieAttributes) =>
    Cookies.set(key, value),
  subscribe: (callback: () => void): (() => void) => {
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
    };
  },
};
export const useCookie = (name: string) =>
  useSyncExternalStore(
    cookieStore.subscribe,
    () => Cookies.get(name),
    () => undefined,
  );
