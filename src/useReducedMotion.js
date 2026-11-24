import { useSyncExternalStore } from "react";

const preference = window.matchMedia("(prefers-reduced-motion: reduce)");

function subscribe(onChange) {
  preference.addEventListener("change", onChange);
  return () => preference.removeEventListener("change", onChange);
}

export default function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => preference.matches);
}
