"use client"

import Input from "@/module/Input";
import Loader from "@/module/Loader";
import Link from "next/link";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { MdOutlineMarkEmailRead } from "react-icons/md";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sentMessage, setSentMessage] = useState<string | null>(null);

    const submitHandler = async (event: any) => {
        event.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if (data.error) toast.error(data.error);
            else setSentMessage(data.message);
        } catch {
            toast.error("ارتباط با سرور برقرار نشد. لطفاً دوباره تلاش کنید.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="shell flex min-h-[calc(100dvh-14rem)] items-center justify-center py-12" >
            <div className="card w-full max-w-sm p-6 sm:p-8" >
                <div className="mb-6 grid gap-1">
                    <span className="eyebrow">پنل مدیریت</span>
                    <h1 className="text-2xl font-extrabold" >فراموشی رمز عبور</h1>
                </div>

                { sentMessage ? (
                    <div className="grid gap-5" role="status">
                        <div className="flex gap-3 rounded-xl bg-accent-soft p-4 text-accent-ink">
                            <MdOutlineMarkEmailRead aria-hidden className="mt-1 shrink-0 text-xl" />
                            <p className="text-[0.9375rem] leading-7">{sentMessage}</p>
                        </div>
                        <p className="text-sm leading-7 text-ink-muted">لینک ارسال‌شده تنها ۳۰ دقیقه معتبر است. پوشهٔ هرزنامه (Spam) را هم بررسی کنید.</p>
                        <Link href="/signin" className="btn btn-secondary btn-block">بازگشت به صفحهٔ ورود</Link>
                    </div>
                ) : (
                    <form className="grid gap-5" onSubmit={submitHandler} noValidate>
                        <p className="text-sm leading-7 text-ink-muted">ایمیل حساب مدیریتی خود را وارد کنید تا لینک تعیین رمز عبور جدید برایتان ارسال شود.</p>
                        <Input
                            value={ email }
                            name="email"
                            changeHandler={ (e: any) => setEmail(e.target.value) }
                            label="ایمیل:"
                            type="email"
                            inputMode="email"
                            textarea={false} />
                        {
                            loading ? <div className="flex justify-center"><Loader /></div> :
                                <button type="submit" className="btn btn-primary btn-block">ارسال لینک بازیابی</button>
                        }
                        <Link href="/signin" className="link justify-self-center text-sm">بازگشت به صفحهٔ ورود</Link>
                    </form>
                )}
            </div>
            <Toaster />
        </div>
    );
};

export default ForgotPassword;
