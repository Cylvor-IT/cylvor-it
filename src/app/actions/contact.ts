"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return { success: false, error: "All fields are required." };
    }

    try {
        // 1. Send Notification to info@cylvorit.com
        const { error: adminError } = await resend.emails.send({
            from: "Cylvor IT Contact Form <info@cylvorit.com>",
            to: "info@cylvorit.com",
            subject: `New Contact Form Submission from ${name}`,
            html: `
        <h2>New Message from Cylvor IT Contact Form</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
            replyTo: email,
        });

        if (adminError) {
            console.error("Resend API Admin Error:", adminError);
            return { success: false, error: "Failed to send email. Please try again later." };
        }

        // 2. Send Automated Reply to the user
        const { error: userError } = await resend.emails.send({
            from: "Cylvor IT <info@cylvorit.com>",
            to: email,
            subject: "Thank you for contacting Cylvor IT",
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Inter', sans-serif; background-color: #000000; color: #ffffff; padding: 40px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #18181b; padding: 40px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05); }
            .header { text-align: center; margin-bottom: 30px; }
            .title { font-family: 'Oswald', sans-serif; font-size: 24px; font-weight: bold; text-transform: uppercase; margin-bottom: 10px; }
            .title span { color: #a3e635; } /* lime-400 */
            .content { font-size: 16px; line-height: 1.6; color: #a1a1aa; } /* zinc-400 */
            .content strong { color: #ffffff; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #71717a; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="title">CYLVOR <span>IT</span></div>
            </div>
            <div class="content">
              <p>Hi <strong>${name}</strong>,</p>
              <p>We have successfully received your message.</p>
              <p>Thank you for reaching out to Cylvor IT! Our team is reviewing your inquiry and will get back to you shortly.</p>
              <br/>
              <p>Best Regards,</p>
              <p><strong>The Cylvor IT Team</strong></p>
            </div>
            <div class="footer">
              <p>&copy; ${new Date().getFullYear()} Cylvor IT. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
        `,
        });

        if (userError) {
            console.error("Resend API User Reply Error:", userError);
            // We log the error but still return success to the user so that they don't see a scary error when the admin email actually went through.
        }

        return { success: true };
    } catch (err) {
        console.error("Unexpected error sending email:", err);
        return { success: false, error: "An unexpected error occurred." };
    }
}
