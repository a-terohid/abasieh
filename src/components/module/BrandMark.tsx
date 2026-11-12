// Placeholder identity mark: a simple saqakhaneh niche (arch) outline with a water line.
// It is NOT the Heyat's official emblem — replace with the real logo when supplied.
const BrandMark = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 32 40" fill="none" className={className} aria-hidden="true">
        <path d="M3 38V17C3 9.3 8.8 3 16 3s13 6.3 13 14v21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M9 38V19c0-4.2 3.1-7.6 7-7.6s7 3.4 7 7.6v19" stroke="var(--brass)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M11.5 29c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M1.5 38h29" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
);

export default BrandMark;
