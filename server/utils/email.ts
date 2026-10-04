interface SendEmailBinding {
    send(message: {
        from: string;
        to: string;
        subject: string;
        text?: string;
        html?: string;
    }): Promise<void>;
}

const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://resumeforfree.com'
    : 'http://localhost:3000';

const FROM_ADDRESS = 'Resume For Free <noreply@contact.resumeforfree.com>';

export async function sendPasswordResetEmail(
    sender: SendEmailBinding,
    email: string,
    token: string,
): Promise<boolean> {
    const resetUrl = `${BASE_URL}/auth/reset-password?token=${token}`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #3b82f6; margin: 0;">Resume For Free</h1>
    </div>

    <h2 style="color: #1f2937; margin-bottom: 20px;">Reset Your Password</h2>

    <p style="margin-bottom: 20px;">
        We received a request to reset your password. Click the button below to create a new password:
    </p>

    <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}"
           style="display: inline-block; background-color: #3b82f6; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">
            Reset Password
        </a>
    </div>

    <p style="margin-bottom: 10px; color: #6b7280; font-size: 14px;">
        This link will expire in 1 hour.
    </p>

    <p style="margin-bottom: 20px; color: #6b7280; font-size: 14px;">
        If you didn't request a password reset, you can safely ignore this email.
    </p>

    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

    <p style="color: #9ca3af; font-size: 12px; text-align: center;">
        If the button doesn't work, copy and paste this link into your browser:<br>
        <a href="${resetUrl}" style="color: #3b82f6; word-break: break-all;">${resetUrl}</a>
    </p>
</body>
</html>
    `.trim();

    const textContent = `Reset your password\n\nWe received a request to reset your password. Open the link below to create a new password:\n\n${resetUrl}\n\nThis link expires in 1 hour. If you didn't request this, ignore this email.`;

    try {
        await sender.send({
            from: FROM_ADDRESS,
            to: email,
            subject: 'Reset Your Password - Resume For Free',
            html: htmlContent,
            text: textContent,
        });
        return true;
    }
    catch (error) {
        console.error('Failed to send password reset email:', error);
        return false;
    }
}

export async function sendContactNotificationEmail(
    sender: SendEmailBinding,
    adminAddress: string,
    submission: { name: string; email: string; subject: string; message: string },
): Promise<boolean> {
    const escapeHtml = (s: string) =>
        s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h2 style="color: #1f2937; margin-bottom: 16px;">New contact form submission</h2>
    <table style="width: 100%; border-collapse: collapse;">
        <tr><td style="padding: 6px 0; color: #6b7280; width: 90px;">From</td><td><strong>${escapeHtml(submission.name)}</strong> &lt;${escapeHtml(submission.email)}&gt;</td></tr>
        <tr><td style="padding: 6px 0; color: #6b7280;">Subject</td><td>${escapeHtml(submission.subject)}</td></tr>
    </table>
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
    <div style="white-space: pre-wrap;">${escapeHtml(submission.message)}</div>
</body>
</html>
    `.trim();

    const textContent = `New contact form submission\n\nFrom: ${submission.name} <${submission.email}>\nSubject: ${submission.subject}\n\n${submission.message}`;

    try {
        await sender.send({
            from: FROM_ADDRESS,
            to: adminAddress,
            subject: `[Contact] ${submission.subject}`,
            html: htmlContent,
            text: textContent,
        });
        return true;
    }
    catch (error) {
        console.error('Failed to send contact notification email:', error);
        return false;
    }
}
