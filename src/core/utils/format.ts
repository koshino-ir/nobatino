const FA_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

/** تبدیل ارقام لاتین به فارسی */
export function toPersianDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)] ?? d);
}

/** تبدیل ارقام فارسی/عربی به لاتین */
export function toLatinDigits(input: string): string {
  return input
    .replace(/[۰-۹]/g, (d) => String(FA_DIGITS.indexOf(d)))
    .replace(/[٠-٩]/g, (d) => String(AR_DIGITS.indexOf(d)));
}

/** جداکننده‌ی هزارگان با ارقام فارسی */
export function formatPrice(value: number): string {
  return toPersianDigits(value.toLocaleString('en-US'));
}

export function formatToJalali(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });
  return formatter.format(d);
}

/** تبدیل Date به YYYY-MM-DD میلادی */
export function toYmd(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** فرمت ساعت به فارسی */
export function formatTime(iso: string | Date): string {
  const d = typeof iso === 'string' ? new Date(iso) : iso;
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return toPersianDigits(`${h}:${m}`);
}

/** فرمت تاریخ شمسی کوتاه: ۱۵ مهر */
export function formatJalaliShort(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    month: 'long',
    day: 'numeric',
  });
  return formatter.format(d);
}

/** فرمت تاریخ شمسی کامل: شنبه ۱۵ مهر ۱۴۰۳ */
export function formatJalaliFull(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return formatter.format(d);
}

/** آیا تاریخ در گذشته است؟ */
export function isPast(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.getTime() < Date.now();
}

/** آیا در ۲۴ ساعت آینده است؟ (برای هشدار لغو) */
export function isWithin24h(date: Date | string): boolean {
  const d = typeof date === 'string' ? new Date(date) : date;
  const diff = d.getTime() - Date.now();
  return diff > 0 && diff < 24 * 60 * 60 * 1000;
}
