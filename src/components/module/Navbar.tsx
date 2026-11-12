"use client"

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

//icons
import { HiMoon } from "react-icons/hi";
import { BsSun } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { FiBookOpen } from "react-icons/fi";
import { GoNote } from "react-icons/go";
import { IoNewspaperOutline } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";
import { MdOutlineCall } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiSchoolLine, RiAdminLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import BrandMark from "./BrandMark";

// Same destinations and order as before; labels only corrected for Persian spacing.
const NAV_ITEMS = [
    { href: "/", label: "خانه", icon: AiOutlineHome },
    { href: "/zekr", label: "ذکرها", icon: GoNote },
    { href: "/ziartnameh", label: "زیارت‌نامه‌ها", icon: FiBookOpen },
    { href: "/", label: "مقاله‌ها", icon: IoNewspaperOutline, key: "articles" },
    { href: "/donate", label: "کمک به هیئت", icon: TbMoneybag },
    { href: "/oldSlaves", label: "پیرغلامان", icon: HiOutlineUserGroup },
    { href: "/ceromony", label: "مراسم‌ها", icon: RiSchoolLine },
    { href: "/trustess", label: "هیئت امنا", icon: FaPeopleGroup },
    { href: "/contactus", label: "ارتباط با ما", icon: MdOutlineCall },
];

const Navbar = () => {

    //session
    const { status } = useSession();
    const pathname = usePathname();

    // Theme Handeling
    const { resolvedTheme, setTheme } = useTheme();
    const [ mounted , setMounted ] = useState(false);
    useEffect(() => setMounted(true), []);
    const isDark = mounted && resolvedTheme === "dark";
    const themeHandler = () => setTheme(isDark ? "light" : "dark");

    // Menue flag
    const [ hamMenue , setHamMenue ] = useState( false )
    const menueHandler = () => setHamMenue( !hamMenue )
    const closeMenu = () => setHamMenue(false)

    useEffect(() => {
        if (!hamMenue) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setHamMenue(false); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [hamMenue]);

    const isActive = (href: string, key?: string) =>
        !key && (href === "/" ? pathname === "/" : pathname?.startsWith(href));

    return (
        <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur supports-[backdrop-filter]:bg-bg/80">
            <nav aria-label="منوی اصلی" className="shell flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
                <Link href="/" className="flex min-w-0 items-center gap-3" onClick={closeMenu}>
                    <BrandMark className="h-9 w-8 shrink-0 text-accent" />
                    <span className="flex min-w-0 flex-col leading-tight">
                        <span className="text-[0.875rem] font-extrabold leading-snug text-ink min-[400px]:text-[0.95rem] sm:text-base">هیئت سقایی عباسیه جولان</span>
                        <span className="hidden text-xs text-ink-subtle sm:block">همدان</span>
                    </span>
                </Link>

                <ul className="hidden items-center gap-1 xl:flex">
                    { status == "authenticated" ? <li><Link href="/admin-panel" className="flex h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-semibold text-accent-ink hover:bg-accent-soft"><RiAdminLine aria-hidden />پنل ادمین</Link></li> : null }
                    { NAV_ITEMS.map(item => {
                        const active = isActive(item.href, item.key);
                        return (
                            <li key={item.key || item.href}>
                                <Link
                                    href={item.href}
                                    aria-current={active ? "page" : undefined}
                                    className={`relative flex h-10 items-center rounded-lg px-3 text-sm font-semibold transition-colors ${active ? "text-ink after:absolute after:inset-x-3 after:-bottom-[0.9rem] after:h-0.5 after:rounded-full after:bg-accent" : "text-ink-muted hover:bg-surface-2 hover:text-ink"}`}>
                                    {item.label}
                                </Link>
                            </li>
                        );
                    }) }
                </ul>

                <div className="flex items-center gap-1">
                    <button type="button" className="icon-btn" aria-label="جستجو"><FiSearch aria-hidden /></button>
                    <button type="button" className="icon-btn" onClick={ themeHandler } aria-label={ isDark ? "حالت روشن" : "حالت تیره" }>
                        { isDark ? <BsSun aria-hidden /> : <HiMoon aria-hidden /> }
                    </button>
                    <button
                        type="button"
                        onClick={ menueHandler }
                        className="icon-btn xl:hidden"
                        aria-expanded={hamMenue}
                        aria-controls="mobile-menu"
                        aria-label={ hamMenue ? "بستن منو" : "باز کردن منو" }>
                        { hamMenue ? <RxCross2 aria-hidden /> : <RxHamburgerMenu aria-hidden /> }
                    </button>
                </div>
            </nav>
            {
                hamMenue ? <>
                    <div className="fixed inset-0 top-16 z-20 bg-night/40 animate-fade-in xl:hidden" onClick={closeMenu} aria-hidden />
                    <div id="mobile-menu" className="absolute inset-x-0 top-full z-30 border-b border-line bg-surface shadow-[var(--shadow-overlay)] animate-sheet-in xl:hidden">
                        <ul onClick={ closeMenu } className="shell grid gap-1 py-3 sm:grid-cols-2 sm:gap-x-4">
                            { status == "authenticated" ? <li className="sm:col-span-2"><Link href="/admin-panel" className="flex min-h-12 items-center gap-3 rounded-xl px-3 font-semibold text-accent-ink hover:bg-accent-soft"><span className="text-lg"><RiAdminLine aria-hidden /></span>پنل ادمین</Link></li> : null }
                            { NAV_ITEMS.map(item => {
                                const Icon = item.icon;
                                const active = isActive(item.href, item.key);
                                return (
                                    <li key={item.key || item.href}>
                                        <Link
                                            href={item.href}
                                            aria-current={active ? "page" : undefined}
                                            className={`flex min-h-12 items-center gap-3 rounded-xl px-3 font-semibold transition-colors ${active ? "bg-accent-soft text-accent-ink" : "text-ink hover:bg-surface-2"}`}>
                                            <span className={`text-lg ${active ? "text-accent-ink" : "text-ink-subtle"}`}><Icon aria-hidden /></span>
                                            {item.label}
                                        </Link>
                                    </li>
                                );
                            }) }
                        </ul>
                    </div>
                </> : null
            }
        </header>
    );
};

export default Navbar;
