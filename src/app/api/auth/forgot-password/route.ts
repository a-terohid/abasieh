import USER from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { appBaseUrl, createResetToken, isValidEmail, rateLimited, RESET_TOKEN_TTL_MS, sendResetEmail } from "@/utils/passwordReset";

// POST { email } — always answers with the same message whether or not the account exists,
// so the endpoint cannot be used to discover admin email addresses.
export const POST = async (req: Request) => {
    try {
        const body = await req.json().catch(() => ({}));
        const email = typeof body?.email === "string" ? body.email.trim() : "";

        if (!isValidEmail(email)) {
            return NextResponse.json({ error: ERROR.INVALID_EMAIL }, { status: 422 });
        }

        const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
        if (rateLimited(`ip:${ip}`, 10) || rateLimited(`email:${email.toLowerCase()}`, 3)) {
            return NextResponse.json({ error: ERROR.TOO_MANY_REQUESTS }, { status: 429 });
        }

        await connectDB();

        const user = await USER.findOne({ email });
        if (user) {
            const { token, hash } = createResetToken();
            user.resetPasswordTokenHash = hash;
            user.resetPasswordExpires = new Date(Date.now() + RESET_TOKEN_TTL_MS);
            await user.save();

            const link = `${appBaseUrl(req)}/reset-password?token=${token}`;
            const sent = await sendResetEmail(user.email, link);
            if (!sent) console.error("[password-reset] reset email was not delivered (check RESEND_API_KEY / RESEND_FROM_EMAIL)");
        }

        return NextResponse.json({ message: MESSAGE.RESET_LINK_SENT }, { status: 200 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 });
    }
};
