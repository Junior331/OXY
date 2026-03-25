/**
 * Canonical paciente size codes — the single source of truth for the entire frontend.
 * The database stores one of: "P" | "M" | "G" | "GG"
 * Legacy records may contain "small" | "medium" | "large" | "pequeno" | "medio" | "grande".
 * All display helpers accept any of these formats and normalise internally.
 */
export type PacienteSizeCode = "P" | "M" | "G" | "GG";

/** Maps every known format to the canonical code. */
const SIZE_LOOKUP: Record<string, PacienteSizeCode> = {
  // Canonical
  p: "P",
  m: "M",
  g: "G",
  gg: "GG",
  // English
  mini: "P",
  small: "P",
  medium: "M",
  large: "G",
  gigante: "GG",
  xl: "GG",
  extra_large: "GG",
  "extra grande": "GG",
  // Portuguese
  "mini (até 3kg)": "P",
  pequeno: "P",
  "pequeno (3-10kg)": "P",
  médio: "M",
  medio: "M",
  "médio (10-25kg)": "M",
  "medio (10-25kg)": "M",
  grande: "G",
  "grande (25-45kg)": "G",
  "gigante (+45kg)": "GG",
};

/** Returns the canonical code or `undefined` if unknown. */
export function normalizePetSize(size?: string | null): PacienteSizeCode | undefined {
  if (!size) return undefined;
  return SIZE_LOOKUP[size.toLowerCase().trim()];
}

/** Display label for any size format. */
export function pacienteSizeLabel(size?: string | null): string {
  switch (normalizePetSize(size)) {
    case "P":
      return "Pequeno";
    case "M":
      return "Médio";
    case "G":
      return "Grande";
    case "GG":
      return "Gigante";
    default:
      return size ?? "—";
  }
}

/** Short abbreviation (P / M / G / GG) for badges and tags. */
export function pacienteSizeAbbrev(size?: string | null): string {
  return normalizePetSize(size) ?? (size ? size.toUpperCase().slice(0, 2) : "?");
}

/** Select options using canonical codes as values. */
export const PACIENTE_SIZE_OPTIONS = [
  { value: "P" as PacienteSizeCode, label: "Pequeno" },
  { value: "M" as PacienteSizeCode, label: "Médio" },
  { value: "G" as PacienteSizeCode, label: "Grande" },
  { value: "GG" as PacienteSizeCode, label: "Gigante" },
] as const;

/** Select options with an empty placeholder as first item. */
export const PACIENTE_SIZE_OPTIONS_WITH_PLACEHOLDER = [
  { value: "", label: "Selecione o porte" },
  ...PACIENTE_SIZE_OPTIONS,
] as const;
