import USER from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { hashPassword } from "@/utils/auth";
import { NextResponse } from "next/server";
import { hashResetToken, MIN_PASSWORD_LENGTH, rateLimited } from "@/utils/passwordReset";

// POST { token, password } — sets a new password if the one-time token is valid and unexpired.
// The token is cleared on success, so a link works only once.
export const POST = async (req: Request) => {
    try {
        const body = await req.json().catch(() => ({}));
        const token = typeof body?.token === "string" ? body.token.trim() : "";
        const password = typeof body?.password === "string" ? body.password : "";

        if (!/^[a-f0-9]{64}$/.test(token)) {
            return NextResponse.json({ error: ERROR.RESET_LINK_INVALID }, { status: 400 });
        }
        if (password.length < MIN_PASSWORD_LENGTH) {
            return NextResponse.json({ error: ERROR.WEAK_PASSWORD }, { status: 422 });
        }

        const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
        if (rateLimited(`reset:${ip}`, 20)) {
            return NextResponse.json({ error: ERROR.TOO_MANY_REQUESTS }, { status: 429 });
        }

        await connectDB();

        const user = await USER.findOne({
            resetPasswordTokenHash: hashResetToken(token),
            resetPasswordExpires: { $gt: new Date() },
        });
        if (!user) {
            return NextResponse.json({ error: ERROR.RESET_LINK_INVALID }, { status: 400 });
        }

        user.password = await hashPassword(password);
        user.resetPasswordTokenHash = null;
        user.resetPasswordExpires = null;
        await user.save();

        return NextResponse.json({ message: MESSAGE.PASSWORD_RESET }, { status: 200 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 });
    }
};
