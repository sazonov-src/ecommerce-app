import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  // Convert cents to dollars and format with 2 decimal places
  return (price / 100).toFixed(2);
}

export function formatPriceWithCurrency(price: number, currency: string = "$"): string {
  return `${currency}${formatPrice(price)}`;
}
