"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

// Visual-only helper: highlights the current admin section.
const AdminNavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const pathname = usePathname();
    const active = pathname === href || pathname?.startsWith(href + "/");
    return (
        <Link
            href={href}
            aria-current={active ? "page" : undefined}
            className={`flex min-h-10 shrink-0 items-center whitespace-nowrap rounded-lg px-3 text-sm font-semibold transition-colors lg:min-h-11 lg:text-[0.9375rem] ${active ? "bg-accent-soft text-accent-ink" : "text-ink-muted hover:bg-surface-2 hover:text-ink"}`}>
            {children}
        </Link>
    );
};

export default AdminNavLink;
