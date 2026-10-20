// email.config.js

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config({
    path: "../../.env",
});


// using gmail
export const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: process.env.GMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});


// verify connection configuration
// transporter.verify(function (error, success) {
//     if (error) {
//         console.log("Email configuration is invalid:", error);
//     } else {
//         console.log("Email configuration is valid:", success);
//     }
// });

// sent email
export const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"💎MoodBlog✨" <${process.env.GMAIL_USER}>`,
            to,
            subject,
            text,
            html,
        });
        // console.log("Email sent:", info.messageId);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};



// html 
export const generateEmailTemplate = (content) => {
  return `
  <div style="background-color: #f4f4f7; padding: 40px 0; font-family: Arial, sans-serif; color: #333;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
      <tr>
        <td style="padding: 30px 40px 20px 40px; text-align: center;">
          <img src="https://www.123-reg.co.uk/blog/wp-content/uploads/elementor/thumbs/Email-Hosting-1440x460-1-scaled-r7tr004t1rwnuzhzek0hxsspxfrrhy1biorip2x4ag.jpg" alt="Company Logo" style="height: 40px; margin-bottom: 20px;" />
          <h2 style="margin: 0; color: #333;">Verify Your Login</h2>
        </td>
      </tr>
      <tr>
        <td style="padding: 0 40px 20px 40px;">
          <p style="font-size: 16px; line-height: 1.6;">
            ${content}
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 0 40px;">
          <p style="font-size: 16px;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px 40px;">
          <p style="font-size: 16px; color: #666;">
            Best regards,<br />
            <strong>MoodBlog Team</strong>
          </p>
        </td>
      </tr>
      <tr>
        <td style="background-color: #f0f0f0; padding: 20px 40px; text-align: center; font-size: 12px; color: #999;">
          © ${new Date().getFullYear()} 💎MoodBlog✨. All rights reserved.
        </td>
      </tr>
    </table>
  </div>
  `;
};

