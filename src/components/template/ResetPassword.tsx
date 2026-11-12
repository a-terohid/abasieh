"use client"

import Input from "@/module/Input";
import Loader from "@/module/Loader";
import { ERROR } from "@/types/enums";
import Link from "next/link";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { MdOutlineCheckCircle, MdOutlineErrorOutline } from "react-icons/md";

const MIN_PASSWORD_LENGTH = 8;

const ResetPassword = ({ token }: { token: string }) => {

    const [password, setPassword] = useState("");
    const [repeat, setRepeat] = useState("");
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState<string | null>(null);
    const [linkError, setLinkError] = useState<string | null>(token ? null : ERROR.RESET_LINK_INVALID);

    const submitHandler = async (event: any) => {
        event.preventDefault();
        if (password.length < MIN_PASSWORD_LENGTH) { toast.error(ERROR.WEAK_PASSWORD); return; }
        if (password !== repeat) { toast.error(ERROR.REPEAT_PASSWORD); return; }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                body: JSON.stringify({ token, password }),
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if (data.error) {
                if (res.status === 400) setLinkError(data.error);
                else toast.error(data.error);
            } else {
                setDone(data.message);
            }
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
                    <h1 className="text-2xl font-extrabold" >تعیین رمز عبور جدید</h1>
                </div>

                { done ? (
                    <div className="grid gap-5" role="status">
                        <div className="flex gap-3 rounded-xl bg-success-soft p-4 text-success">
                            <MdOutlineCheckCircle aria-hidden className="mt-1 shrink-0 text-xl" />
                            <p className="text-[0.9375rem] leading-7">{done}</p>
                        </div>
                        <Link href="/signin" className="btn btn-primary btn-block">ورود به پنل</Link>
                    </div>
                ) : linkError ? (
                    <div className="grid gap-5" role="alert">
                        <div className="flex gap-3 rounded-xl bg-danger-soft p-4 text-danger">
                            <MdOutlineErrorOutline aria-hidden className="mt-1 shrink-0 text-xl" />
                            <p className="text-[0.9375rem] leading-7">{linkError}</p>
                        </div>
                        <Link href="/forgot-password" className="btn btn-primary btn-block">درخواست لینک جدید</Link>
                        <Link href="/signin" className="link justify-self-center text-sm">بازگشت به صفحهٔ ورود</Link>
                    </div>
                ) : (
                    <form className="grid gap-5" onSubmit={submitHandler} noValidate>
                        <Input
                            value={ password }
                            name="password"
                            changeHandler={ (e: any) => setPassword(e.target.value) }
                            label="رمز عبور جدید:"
                            type="password"
                            textarea={false} />
                        <p className="-mt-3 text-xs text-ink-subtle">حداقل ۸ کاراکتر</p>
                        <Input
                            value={ repeat }
                            name="repeat"
                            changeHandler={ (e: any) => setRepeat(e.target.value) }
                            label="تکرار رمز عبور جدید:"
                            type="password"
                            textarea={false} />
                        {
                            loading ? <div className="flex justify-center"><Loader /></div> :
                                <button type="submit" className="btn btn-primary btn-block">ذخیرهٔ رمز عبور</button>
                        }
                    </form>
                )}
            </div>
            <Toaster />
        </div>
    );
};

export default ResetPassword;
