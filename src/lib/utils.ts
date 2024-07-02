import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string) => {
  const dateObj = new Date(date);

  const localdate = dateObj.toLocaleDateString("en-in", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const localtime = dateObj.toLocaleTimeString("en-in");

  return `${localdate}-${localtime}`;
};
