const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
  console.log("email verification data", process.env.MAIL_HOST, process.env.MAIL_PASS, email);

  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: true, // Ensure secure connection for Gmail SMTP
    });

    let info = await transporter.sendMail({
      from: `"Studynotion | SkillSpectrum" <${process.env.MAIL_USER}>`, // sender address
      to: email, // list of receivers
      subject: title, // Subject line 
      html: body, // html body
    });
    // console.log(info.response);
    return info;
  } catch (error) {
    console.error(error.message); // Use console.error for errors
    return error.message;
  }
};  

module.exports = mailSender;
