"use client"

import { useTheme } from "next-themes";
import { useState } from "react";
import Link from "next/link";

//icons
import { HiMoon } from "react-icons/hi";
import { BsSun } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import { FiBookOpen } from "react-icons/fi";
import { GoNote } from "react-icons/go";
import { IoNewspaperOutline } from "react-icons/io5";
import { TbMoneybag } from "react-icons/tb";
import { MdOutlineCall } from "react-icons/md";
import { PiImages } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi";
import { RiSchoolLine } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import { useSession } from "next-auth/react";
import { RiAdminLine } from "react-icons/ri";



const Navbar = () => {

    //session
    const { status } = useSession();

    // Theme Handeling
    const { systemTheme, theme, setTheme } = useTheme();
    const themeHandler = () => theme == "dark"? setTheme('light'): setTheme("dark")

    // Menue flag
    const [ hamMenue , setHamMenue ] = useState( false )
    const menueHandler = () => setHamMenue( !hamMenue )

    return (
        <header className="z-20 fixed w-screen" >
            <nav className="bg-background-light-2 dark:bg-background-dark-2 py-4 lg:py-6" >
                <div className="flex justify-between items-center container">
                    <div className="flex items-center gap-x-4" >
                        <span onClick={ menueHandler } className="text-2xl lg:text-3xl text-primary-red-2" >{ hamMenue ? <RxCross2 /> : <RxHamburgerMenu /> }</span>
                        <h1 className="text-lg lg:text-xl font-bold">هیئت سقایی عباسیه جولان</h1>
                    </div>
                    <div className="flex items-center gap-x-3 text-xl lg:text-2xl text-primary-red-2">
                        <span className=" hover:cursor-pointer"><FiSearch /></span>
                        <span className=" hover:cursor-pointer" onClick={ themeHandler }>{theme === "light" ? <BsSun /> : <HiMoon className="" />}</span>
                    </div>
                </div>
            </nav>
            {
                        hamMenue ? <nav className="flex w-full " >
                                    <div className="bg-background-light-2 rounded-bl-2xl dark:bg-background-dark-2 animate-scale-up-ver-top px-9  py-6 " >
                                        <ul className=" flex flex-col mb-3 divide-y dark:divide-background-dark-5 lg:px-3  divide-gray-300 ">
                                            { status == "authenticated"  ? <li><Link href="/admin-panel" className="flex items-center gap-x-2 text-lg py-2"><span className="text-primary-green-3"><RiAdminLine/></span>پنل ادمین</Link></li> : null }
                                            <li><Link href="/" className="flex items-center gap-x-2 text-lg py-2"><span className="text-primary-red-2"><GoNote /></span>ذکر ها</Link></li>
                                            <li><Link href="/" className="flex items-center gap-x-2 text-lg py-2"><span className="text-primary-red-2"><FiBookOpen/></span>زیارت نامه ها</Link></li>
                                            <li><Link href="/" className="flex items-center gap-x-2 text-lg py-2"><span className="text-primary-red-2"><IoNewspaperOutline /></span>مقاله ها</Link></li>
                                            <li><Link href="/" className="flex items-center gap-x-2 text-lg py-2"><span className="text-primary-red-2"><PiImages /></span>گالری تصاویر</Link></li>
                                            <li><Link href="/" className="flex items-center gap-x-2 text-lg py-2"><span className="text-primary-red-2"><TbMoneybag /></span>کمک به هیئت</Link></li>
                                            <li><Link href="/" className="flex items-center gap-x-2 text-lg py-2"><span className="text-primary-red-2"><HiOutlineUserGroup /></span>پیر غلامان</Link></li>
                                            <li><Link href="/" className="flex items-center gap-x-2 text-lg py-2"><span className="text-primary-red-2"><RiSchoolLine /></span>مراسم ها</Link></li>
                                            <li><Link href="/" className="flex items-center gap-x-2 text-lg py-2"><span className="text-primary-red-2"><RxCalendar /></span>جلسه های هفتگی</Link></li>
                                            <li><Link href="/" className="flex items-center gap-x-2 text-lg py-2"><span className="text-primary-red-2"><FaPeopleGroup /></span>هیئت امنا</Link></li>
                                            <li><Link href="/" className="flex items-center gap-x-2 text-lg py-2"><span className="text-primary-red-2"><MdOutlineCall /></span>ارتباط با ما</Link></li>
                                        </ul>
                                    </div>
                        </nav> : null
                    }
        </header>
    );
};

export default Navbar;