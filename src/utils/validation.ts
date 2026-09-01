export const isFilled = (v: string): boolean => v.trim().length > 0;

export const isValidEmail = (v: string): boolean =>
  v.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/** Aceita telefone brasileiro com 10 ou 11 dígitos, ignorando máscara. */
export const isValidPhone = (v: string): boolean => {
  const digits = v.replace(/\D/g, '');
  return digits.length === 10 || digits.length === 11;
};

/** Aplica máscara (11) 91234-5678 enquanto a pessoa digita. */
export const maskPhone = (v: string): string => {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
};

export const isFutureOrToday = (iso: string): boolean => {
  if (!iso) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(`${iso}T00:00:00`) >= today;
};

export const isPositiveNumber = (v: string): boolean => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0;
};
