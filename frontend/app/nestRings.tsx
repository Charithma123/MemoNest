export function NestRings({ className = "" }: { className?: string }) {
    return (
        <svg viewBox="0 0 400 400" fill="none" className={className} aria-hidden="true">
            <path d="M80 260a120 120 0 0 1 240 0" stroke="currentColor" strokeWidth="2" strokeOpacity="0.35" />
            <path d="M50 260a150 150 0 0 1 300 0" stroke="currentColor" strokeWidth="2" strokeOpacity="0.22" />
            <path d="M20 260a180 180 0 0 1 360 0" stroke="currentColor" strokeWidth="2" strokeOpacity="0.12" />
            <ellipse cx="200" cy="272" rx="86" ry="34" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.6" />
            <ellipse cx="200" cy="278" rx="60" ry="20" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4" />
        </svg>
    );
}