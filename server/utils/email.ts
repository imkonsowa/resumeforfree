const BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://resumeforfree.com'
    : 'http://localhost:3000';

export async function sendPasswordResetEmail(
    resendApiKey: string,
    email: string,
    token: string,
): Promise<boolean> {
    if (!resendApiKey) {
        console.error('Resend API key not configured');
        return false;
    }

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

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${resendApiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Resume Builder <noreply@resumeforfree.com>',
                to: [email],
                subject: 'Reset Your Password - Resume Builder',
                html: htmlContent,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Resend API error:', errorData);
            return false;
        }

        return true;
    }
    catch (error) {
        console.error('Failed to send password reset email:', error);
        return false;
    }
}

export async function hashToken(token: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(token);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
