import { createHash, randomBytes } from "crypto";
import { Resend } from "resend";

export const RESET_TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes
export const MIN_PASSWORD_LENGTH = 8;

/** New one-time token: the raw value goes in the emailed link, only its hash is stored. */
export const createResetToken = () => {
    const token = randomBytes(32).toString("hex");
    return { token, hash: hashResetToken(token) };
};

export const hashResetToken = (token: string) => createHash("sha256").update(token).digest("hex");

export const isValidEmail = (value: unknown): value is string =>
    typeof value === "string" && value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

/**
 * Best-effort in-memory rate limit (per server instance). It slows down scripted abuse of the
 * "forgot password" endpoint; on serverless hosts each instance keeps its own counter.
 */
const hits = new Map<string, number[]>();
export const rateLimited = (key: string, max = 5, windowMs = 15 * 60 * 1000) => {
    const now = Date.now();
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(key, recent);
    return recent.length > max;
};

/** Absolute base URL for links in emails: NEXTAUTH_URL when set, otherwise the request origin. */
export const appBaseUrl = (req: Request) =>
    (process.env.NEXTAUTH_URL || new URL(req.url).origin).replace(/\/+$/, "");

const escapeHtml = (s: string) =>
    s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

/**
 * Sends the reset email through Resend (already used by the contact form).
 * Sender: RESEND_FROM_EMAIL (must be an address on a domain verified in Resend).
 * Without it, Resend's test sender is used, which only delivers to the Resend account owner.
 * Returns false when sending is not possible so the caller can log it.
 */
export const sendResetEmail = async (to: string, link: string): Promise<boolean> => {
    if (process.env.NODE_ENV !== "production") {
        // Local development convenience: the link is printed to the server terminal.
        console.info(`[password-reset] reset link for ${to}: ${link}`);
    }
    if (!process.env.RESEND_API_KEY) return false;

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const safeLink = escapeHtml(link);

    const { error } = await resend.emails.send({
        from: `هیئت سقایی عباسیه جولان <${from}>`,
        to: [to],
        subject: "بازیابی رمز عبور پنل مدیریت",
        text: `برای تعیین رمز عبور جدید روی لینک زیر کلیک کنید (معتبر تا ۳۰ دقیقه):\n${link}\n\nاگر شما این درخواست را نداده‌اید، این ایمیل را نادیده بگیرید.`,
        html: `<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;line-height:2;color:#1f1b16">
  <h2 style="margin:0 0 12px">بازیابی رمز عبور</h2>
  <p>برای پنل مدیریت هیئت سقایی عباسیه جولان درخواست تغییر رمز عبور ثبت شده است.</p>
  <p><a href="${safeLink}" style="display:inline-block;background:#0e5c61;color:#fff;padding:10px 18px;border-radius:10px;text-decoration:none">تعیین رمز عبور جدید</a></p>
  <p style="color:#5c544a;font-size:13px">این لینک تنها یک بار و تا ۳۰ دقیقه معتبر است. اگر شما این درخواست را نداده‌اید، این ایمیل را نادیده بگیرید؛ رمز عبور شما تغییری نمی‌کند.</p>
</div>`,
    });
    if (error) {
        // Log the actual reason (the error object itself serialises as "{}" in the Next.js log).
        const e = error as { name?: string; message?: string; statusCode?: number };
        console.error(`[password-reset] email failed: ${e.name ?? "error"} (${e.statusCode ?? "?"}): ${e.message ?? String(error)} — from=${from}`);
        if (!process.env.RESEND_FROM_EMAIL) {
            console.error("[password-reset] RESEND_FROM_EMAIL is not set; Resend's test sender only delivers to the Resend account owner's address. Verify a domain in Resend and set RESEND_FROM_EMAIL.");
        }
        return false;
    }
    return true;
};
