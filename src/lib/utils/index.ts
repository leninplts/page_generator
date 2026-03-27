import { type ClassValue, clsx } from 'clsx';

/**
 * Merge class names (shadcn/ui style utility)
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Generate a unique slug by appending a random suffix
 */
export function generateUniqueSlug(text: string): string {
  const base = generateSlug(text);
  const suffix = Math.random().toString(36).substring(2, 8);
  return `${base}-${suffix}`;
}

/**
 * Format a date for display
 */
export function formatDate(date: Date | string, locale = 'es-ES'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format time for display
 */
export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayHours = h % 12 || 12;
  return `${displayHours}:${minutes} ${ampm}`;
}
