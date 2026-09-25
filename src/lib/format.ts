export function brl(v: number | string) {
  return Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const MONTHS = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];

export function shortDate(d: Date | string) {
  const date = new Date(d);
  return { day: String(date.getDate()).padStart(2, "0"), month: MONTHS[date.getMonth()] };
}

export function time(d: Date | string) {
  return new Date(d).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

export function longDate(d: Date | string) {
  return new Date(d).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export function relativeDay(d: Date | string) {
  const date = new Date(d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((new Date(date).setHours(0, 0, 0, 0) - today.getTime()) / 86400000);
  if (diff === 0) return "Hoje";
  if (diff === 1) return "Amanhã";
  if (diff === -1) return "Ontem";
  return date.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" });
}

export function slugToCategory(slug: string) {
  return slug;
}
