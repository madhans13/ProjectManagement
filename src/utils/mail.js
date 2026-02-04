import Mailgen from "mailgen";
import nodemailer from "nodemailer";
const sendEmail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://projectmanage.com"
        }
    })
    const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);
    const emailHtml = mailGenerator.generate(options.mailgenContent);
    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        }
    })
    const mail = {
        from: "mail.taskManager@example.com",
        to: options.email,
        subject: options.subject,
        text: emailTextual,
        html: emailHtml
    }
    try {
        await transporter.sendMail(mail);
    }
    catch (error) {
        console.error("Email service failed check the credentials");
        console.error(`error ${error}`);
    }
}

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to our app",
            action: {
                instruction:
                    "To verify your email click on the below button",
                button: {
                    color: "#31cd19",
                    text: "verify your account",
                    link: verificationUrl
                }
            },
            outro: "Need help or have questions, Please reply to this email"
        },
    }
}


const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "we got a request to reset your password for your account",
            action: {
                instruction:
                    "To reset your password click on the below button",
                button: {
                    color: "#1967cd",
                    text: "Reset Password",
                    link: passwordResetUrl
                }
            },
            outro: "Need help or have questions, Please reply to this email"
        },
    }
}

