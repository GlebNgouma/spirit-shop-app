import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const isDev = process.env.NODE_ENV === "development";
export const ORIGIN_URL = isDev ? "http://localhost:3000" : "";
