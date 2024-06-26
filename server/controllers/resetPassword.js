const User = require("../models/User")
// const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt")
const crypto = require("crypto")



// write mailsender function becouse exporting mailsender is not working so we can write a new function.

const nodemailer = require('nodemailer');

async function mailSender(email, title, body) {
  try {
    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false // Set to false to bypass SSL certificate validation
      }
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Studynotion | SkillSpectrum" <${process.env.MAIL_USER}>`, // sender address
      to: email, // list of receivers
      subject: title, // Subject line
      html: body,  // html 
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

 

// console.log("mailSender function is : ", mailSender)
exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
      });
    }
    const token = crypto.randomBytes(20).toString("hex");

    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpires: Date.now() + 3600000,
      },
      { new: true }
    );
    console.log("DETAILS", updatedDetails);

    const url = `http://localhost:3000/update-password/${token}`;
    console.log("token is", token);

    await mailSender(
      email,
      "Password Reset",
      `Your Link for email verification is ${url}. <br/> Please click this url to reset your password.`
    );

    res.json({
      success: true,
      message: "Email Sent Successfully, Please Check Your Email to Continue Further",
      msg: url
    });
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Sending the Reset Message`,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body

    if (confirmPassword !== password) {
      return res.json({
        success: false,
        message: "Password and Confirm Password Does not Match",
      })
    }
    const userDetails = await User.findOne({ token: token })
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token is Invalid",
      })
    }
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(403).json({
        success: false,
        message: `Token is Expired, Please Regenerate Your Token`,
      })
    }
    const encryptedPassword = await bcrypt.hash(password, 10)
    await User.findOneAndUpdate(
      { token: token },
      { password: encryptedPassword },
      { new: true }
    )
    res.json({
      success: true,
      message: `Password Reset Successful`,
    })
  } catch (error) {
    return res.json({
      error: error.message,
      success: false,
      message: `Some Error in Updating the Password`,
    })
  }
}
