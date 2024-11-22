export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

// => Convertir string a boolean pero ya lo hize
export function toBoolean(str: string) {
  return str.toLowerCase() === "true";
}
