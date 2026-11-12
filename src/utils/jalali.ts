import * as jalaali from "jalaali-js";

/**
 * Jalali (Persian) calendar helpers — single source for date display and year filtering.
 *
 * Storage stays unchanged: dates are Gregorian ISO-8601 strings in UTC (what the date picker
 * produces). All calendar logic is evaluated in the Heyat's own time zone (Asia/Tehran) so a
 * date picked as "1 Farvardin" is never shown as "30 Esfand" because of a UTC day shift.
 */

export const HEYAT_TIME_ZONE = "Asia/Tehran";

// Iran Standard Time. Iran observed DST until 2022, but DST always started at the END of
// 1 Farvardin (or later), so local midnight at the start of any Jalali year is UTC+03:30.
const IRST_OFFSET_MS = 3.5 * 60 * 60 * 1000;

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
export const toPersianDigits = (value: string | number) =>
    String(value).replace(/[0-9]/g, (d) => PERSIAN_DIGITS[Number(d)]);
export const toLatinDigits = (value: string) =>
    value.replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d))).replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));

const parse = (value: string | Date | null | undefined) => {
    if (!value) return null;
    const date = value instanceof Date ? value : new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
};

const jalaliParts = (date: Date) => {
    const parts = new Intl.DateTimeFormat("en-US-u-ca-persian-nu-latn", {
        timeZone: HEYAT_TIME_ZONE, year: "numeric", month: "numeric", day: "numeric",
    }).formatToParts(date);
    const get = (t: string) => Number(parts.find((p) => p.type === t)?.value);
    return { jy: get("year"), jm: get("month"), jd: get("day") };
};

/** Jalali year (e.g. 1403) of a stored date, evaluated in Tehran time. */
export const jalaliYearOf = (value: string | Date | null | undefined): number | null => {
    const date = parse(value);
    return date ? jalaliParts(date).jy : null;
};

/** "۱۴۰۳/۰۴/۲۶" — numeric Jalali date in Persian digits. */
export const formatJalaliNumeric = (value: string | Date | null | undefined): string => {
    const date = parse(value);
    if (!date) return "";
    const { jy, jm, jd } = jalaliParts(date);
    return toPersianDigits(`${jy}/${String(jm).padStart(2, "0")}/${String(jd).padStart(2, "0")}`);
};

/** "۲۶ تیر ۱۴۰۳" — long Jalali date. */
export const formatJalaliLong = (value: string | Date | null | undefined): string => {
    const date = parse(value);
    if (!date) return "";
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        timeZone: HEYAT_TIME_ZONE, year: "numeric", month: "long", day: "numeric",
    }).format(date);
};

/** Current Jalali year in Tehran. */
export const currentJalaliYear = (): number => jalaliParts(new Date()).jy;

/** Accepts "1403", "۱۴۰۳" or "  1403 " and returns a plausible Jalali year, otherwise null. */
export const parseJalaliYear = (value: unknown): number | null => {
    if (typeof value !== "string") return null;
    const n = Number(toLatinDigits(value.trim()));
    return Number.isInteger(n) && n >= 1200 && n <= 1600 ? n : null;
};

/**
 * Half-open UTC range [start, end) covering the whole Jalali year `jy` in Tehran time:
 * from 1 Farvardin jy 00:00 IRST to 1 Farvardin jy+1 00:00 IRST.
 * Returned as ISO strings because the `date` fields are stored as ISO strings, which sort
 * lexicographically in chronological order.
 */
export const jalaliYearRange = (jy: number) => {
    const startOf = (y: number) => {
        const { gy, gm, gd } = jalaaliToGregorian(y);
        return new Date(Date.UTC(gy, gm - 1, gd) - IRST_OFFSET_MS).toISOString();
    };
    return { start: startOf(jy), end: startOf(jy + 1) };
};

const jalaaliToGregorian = (jy: number) => jalaali.toGregorian(jy, 1, 1);
