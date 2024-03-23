// const nodemailer = require('nodemailer');

// async function mailSender(email, subject, body) {
//   try {
//     // Create a Nodemailer transporter
//     let transporter = nodemailer.createTransport({
//       service: 'Gmail',
//       auth: {
//         user: process.env.MAIL_USER,
//         pass: process.env.MAIL_PASS,
//       },
//       tls: {
//         rejectUnauthorized: false // Set to false to bypass SSL certificate validation
//       }
//     });

//     // Send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: `"Studynotion | SkillSpectrum" <${process.env.MAIL_USER}>`, // sender address
//       to: email, // list of receivers
//       subject: subject, // Subject line
//       html: body, // HTML body content
//     });

//     console.log("Message sent: %s", info.messageId);
//   } catch (error) {
//     console.error("Error sending email:", error);
//     throw error;
//   }
// }

// module.exports = mailSender;
