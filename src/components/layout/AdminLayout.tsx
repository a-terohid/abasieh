import { adminLayoutProps } from "@/types/types";
import { BsPersonCircle } from "react-icons/bs"
import { ROLE } from "@/types/enums";
import AdminNavLink from "./AdminNavLink";

const AdminLayout = async ({ children , role , email }: adminLayoutProps ) => {

    return (
        <div className='shell flex flex-col gap-6 py-6 lg:flex-row lg:items-start lg:gap-8 lg:py-10' >
            <aside className='lg:sticky lg:top-24 lg:w-64 lg:shrink-0' aria-label="منوی پنل مدیریت">
                <div className='card overflow-hidden'>
                    <div className='hidden items-center gap-3 border-b border-line p-4 lg:flex' >
                        <BsPersonCircle aria-hidden className="shrink-0 text-3xl text-ink-subtle" />
                        <div className="min-w-0">
                            <p dir="ltr" className='truncate text-end text-sm font-semibold' title={email}>{ email }</p>
                            { role == ROLE.ADMIN ? <span className='badge badge-accent mt-1'>admin</span> : null }
                            { role == ROLE.OWNER ? <span className='badge badge-brass mt-1' >owner</span> : null }
                        </div>
                    </div>
                    <nav className='flex gap-1 overflow-x-auto p-2 lg:flex-col lg:overflow-visible'>
                        { role == ROLE.OWNER ? <AdminNavLink href="/admin-panel/admins" >مدیرها</AdminNavLink> : null }
                        { role == ROLE.OWNER ? <AdminNavLink href="/admin-panel/trustees" >هیئت امنا</AdminNavLink> : null }
                        <AdminNavLink href="/admin-panel/ziartnameh" >زیارت‌نامه‌ها</AdminNavLink>
                        <AdminNavLink href="/admin-panel/year" >سال‌ها</AdminNavLink>
                        <AdminNavLink href="/admin-panel/zekr" >ذکرها</AdminNavLink>
                        <AdminNavLink href="/admin-panel/blogs" >مقاله‌ها</AdminNavLink>
                        <AdminNavLink href="/admin-panel/ceremony" >مراسم‌ها</AdminNavLink>
                        <AdminNavLink href="/admin-panel/oldSlaves" >پیرغلام‌ها</AdminNavLink>
                    </nav>
                </div>
            </aside>
            <section className='card min-w-0 flex-1' >{ children }</section>
        </div>
    );
};

export default AdminLayout;
