import Link from "next/link";

// Styled version of the framework's default 404 state (no new behaviour).
export default function NotFound() {
    return (
        <div className="shell">
            <div className="state min-h-[60dvh] content-center">
                <span className="state-mark" aria-hidden>۴۰۴</span>
                <h1 className="state-title">صفحه‌ای که دنبالش بودید پیدا نشد</h1>
                <p className="state-text">ممکن است نشانی را اشتباه وارد کرده باشید یا این صفحه جابه‌جا شده باشد.</p>
                <div className="mt-2 flex flex-wrap justify-center gap-3">
                    <Link href="/" className="btn btn-primary">بازگشت به خانه</Link>
                    <Link href="/zekr" className="btn btn-secondary">ذکرها</Link>
                </div>
            </div>
        </div>
    );
}
