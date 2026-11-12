"use client"

import Link from "next/link";
import { useEffect } from "react";

// Route-level error boundary. It does not swallow errors: they are still logged on the
// server (and here in the browser console); this only replaces the blank 500 page with a
// readable state and a retry action.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="shell">
            <div className="state min-h-[60dvh] content-center">
                <span className="state-mark" aria-hidden>!</span>
                <h1 className="state-title">بارگذاری این صفحه با خطا روبه‌رو شد</h1>
                <p className="state-text">لطفاً چند لحظه دیگر دوباره تلاش کنید. اگر مشکل ادامه داشت، با مدیر سایت تماس بگیرید.</p>
                {error?.digest ? <p className="text-xs text-ink-subtle nums" dir="ltr">ref: {error.digest}</p> : null}
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                    <button type="button" onClick={() => reset()} className="btn btn-primary">تلاش دوباره</button>
                    <Link href="/" className="btn btn-secondary">بازگشت به خانه</Link>
                </div>
            </div>
        </div>
    );
}
