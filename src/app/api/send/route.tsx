import { ERROR, MESSAGE } from '@/types/enums';
import { EmailTemplate } from '@/utils/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
    try {

    const { Email, Name, Text, Subject } = await req.json();

    if( !Email || 
        !Name ||
        !Text || !Subject ) {
        return NextResponse.json(
            { error: ERROR.INVALID_DATA },
            { status : 422 }
        )
    }

    // Created per request so the build does not need RESEND_API_KEY.
    const resend = new Resend(process.env.RESEND_API_KEY);
    const username = Email.split('@')[0];


    await resend.emails.send({
        from: `${username}@resend.dev`, 
        to: ['abasiehjoulan@gmail.com'],
        subject: Subject,
        react: <EmailTemplate Name={Name} Email={Email} Text={Text} />,
    });


    return NextResponse.json(
        { message : MESSAGE.SEND_MESSAGE },
        { status : 201 },
    )
    

    } catch (error) {
        return NextResponse.json(
            { error : ERROR.SERVER_ERROR },
            { status : 500 }
        )
    }
}