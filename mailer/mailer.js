const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    requireTLS: true,
    auth: {
        user: process.env.SMTP_MAIL, // Your email
        pass: process.env.SMTP_PASSWORD, // Your password
    },
});

const sendMail = async (email, subject, content) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_MAIL, // Sender address
            to: email, // Receiver's email address
            subject: subject, // Subject of the email
            html: content, // HTML body content
        };

        // Await the sendMail function
        let info = await transporter.sendMail(mailOptions);

        // Log the messageId to confirm that the mail has been sent
        console.log("Mail Sent:", info.messageId);
        
    } catch (error) {
        // Log the error if sending fails
        console.error("Error sending email:", error);
    }
};

module.exports = sendMail;
