import { Resend } from "resend";
import {EmailTemplate} from "./template/email.templates.tsx";


class MailService {
    public async sendEmail(
        email: string,
        subject: string,
        message: string
    ): Promise<void> {
        const resend = new Resend(process.env.EMAIL_API_KEY as string);
        await resend.emails.send({
            from: process.env.SENDER_EMAIL as string,
            to: email as string,
            subject: subject as string,
            react: <EmailTemplate message={message} />
        })
    }
}

export { MailService };
