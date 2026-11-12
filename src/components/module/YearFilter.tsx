import Link from "next/link";
import { parseJalaliYear, toPersianDigits } from "@/utils/jalali";

type Props = {
    /** Available years (Jalali). Strings from the DB or numbers derived from dates. */
    years: (string | number)[];
    /** Raw `?year=` value from the URL. */
    active?: string;
    /** Route the filter links to (keeps the existing `?year=` query contract). */
    basePath: string;
    label?: string;
};

// Year chips: one tap filters, the active year is always visible, Persian digits,
// newest year first. Rendered as links so it works without client JavaScript.
const YearFilter = ({ years, active, basePath, label = "فیلتر بر اساس سال" }: Props) => {
    const unique = Array.from(new Set(years.map((y) => String(y).trim()).filter(Boolean)));
    const sorted = unique.sort((a, b) => (parseJalaliYear(b) ?? -1) - (parseJalaliYear(a) ?? -1));
    const activeYear = parseJalaliYear(active ?? "") ?? (active ? active.trim() : "");
    const isActive = (y: string) => String(parseJalaliYear(y) ?? y) === String(activeYear);

    if (!sorted.length) return null;

    return (
        <nav aria-label={label} className="min-w-0">
            <p className="mb-2 text-sm font-semibold text-ink-subtle">{label}</p>
            <ul className="chip-rail">
                <li>
                    <Link href={basePath} scroll={false} aria-current={!activeYear ? "page" : undefined} className="chip">همه</Link>
                </li>
                {sorted.map((y) => (
                    <li key={y}>
                        <Link
                            href={{ pathname: basePath, query: { year: y } }}
                            scroll={false}
                            aria-current={isActive(y) ? "page" : undefined}
                            className="chip nums">
                            {toPersianDigits(y)}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default YearFilter;
