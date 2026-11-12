import YearFilter from "./YearFilter";

// Year filter for the zekr archive. Previously a native <select> + "apply" link; now the
// shared Jalali year chips (same `?year=` contract on /zekr).
const ZekrFilterSection = ({ Years, activeYear }: { Years: string[]; activeYear?: string }) => (
    <YearFilter years={Years ?? []} active={activeYear} basePath="/zekr" label="سال ذکر" />
);

export default ZekrFilterSection;
