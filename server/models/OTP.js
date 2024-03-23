// const mongoose = require("mongoose");
// const mailSender = require("../utils/mailSender");
// const emailTemplate = require("../mail/templates/emailVerificationTemplate");
// const OTPSchema = new mongoose.Schema({
// 	email: {
// 		type: String,
// 		required: true,
// 	},
// 	otp: {
// 		type: String,
// 		required: true,
// 	},
// 	createdAt: {
// 		type: Date,
// 		default: Date.now,
// 		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
// 	},
// });

// // Define a function to send emails
// async function sendVerificationEmail(email, otp) {
// 	// Create a transporter to send emails

// 	// Define the email options

// 	// Send the email
// 	try {
// 		console.log("verifying email to send mail to user")
// 		const mailResponse = await mailSender(
// 			email,
// 			"Verification Email",
// 			emailTemplate(otp)
// 		);
// 		console.log("response received: ", mailResponse);
// 		if (mailResponse) {
// 			console.log("Email sent successfully: ", mailResponse.response);
// 		} else {
// 			console.log("Mail response is undefined");
// 		}
// 	} catch (error) {
// 		console.log("Error occurred while sending email: ", error);
// 		throw error;
// 	}
	
// }

// // Define a post-save hook to send email after the document has been saved
// OTPSchema.pre("save", async function (next) {
// 	console.log("New document saved to database");

// 	// Only send an email when a new document is created
// 	if (this.isNew) {
// 		await sendVerificationEmail(this.email, this.otp);
// 	}
// 	next();
// });

// const OTP = mongoose.model("OTP", OTPSchema);

// module.exports = OTP;

const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
require('dotenv').config()

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
    },
});

// Create a transporter to send emails
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false, // Use SSL/TLS
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false // Disable SSL certificate validation
    }
});

// Define a function to send verification emails
async function sendVerificationEmail(email, otp) {
    try {
        // Define the email options
        const mailOptions = {
            from: `"Studynotion | SkillSpectrum" <${process.env.MAIL_USER}>`,
            to: email,
            subject: "Verification Email",
            html: emailTemplate(otp),
        };

        // Send the email
        const mailResponse = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully: ", mailResponse);
        return mailResponse;
    } catch (error) {
        console.error("Error occurred while sending email: ", error);
        throw error;
    }
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
    console.log("New document saved to database");

    // Only send an email when a new document is created
    if (this.isNew) {
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;

