// Centralized date formatting so the whole site displays dates the same way: dd/mm/yyyy

/**
 * Parses a date-ish value into a local Date object.
 *
 * IMPORTANT: plain "YYYY-MM-DD" strings (what our DATE columns and native
 * <input type="date"> values look like) are parsed by the native `new
 * Date(string)` constructor as UTC midnight, not local midnight. In any
 * timezone ahead of UTC (e.g. India, UTC+5:30) that silently shifts the
 * date back by a day when you later read it with local getters. We parse
 * the y/m/d components directly instead, so the date never shifts.
 */
export function toLocalDate(dateInput: string | Date): Date {
  if (dateInput instanceof Date) return dateInput;
  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(dateInput);
  if (dateOnlyMatch) {
    const [, y, m, d] = dateOnlyMatch;
    return new Date(Number(y), Number(m) - 1, Number(d));
  }
  return new Date(dateInput);
}

/**
 * Builds a "YYYY-MM-DD" string from local y/m/d parts without ever going
 * through Date -> toISOString (which converts to UTC and can shift the
 * date by a day). Use this whenever saving a date picked via separate
 * day/month/year selects.
 */
export function ymdToDateString(year: number, month0: number, day: number): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${year}-${pad(month0 + 1)}-${pad(day)}`;
}

/**
 * Formats any date-ish value (ISO string, Date object, timestamp) as dd/mm/yyyy.
 * Returns an empty string for null/undefined/invalid input.
 */
export function formatDate(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return '';
  const date = toLocalDate(dateInput);
  if (isNaN(date.getTime())) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Formats a date as "Mon, dd/mm/yyyy" — used where a weekday label is helpful
 * (e.g. admin unavailable-dates list) while keeping the dd/mm/yyyy convention.
 */
export function formatDateWithWeekday(dateInput: string | Date | null | undefined): string {
  if (!dateInput) return '';
  const date = toLocalDate(dateInput);
  if (isNaN(date.getTime())) return '';

  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
  return `${weekday}, ${formatDate(date)}`;
}
