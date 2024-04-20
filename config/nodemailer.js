//Node mailer mailing service configuration
const nodemailer =require('nodemailer')
const dotenv =require('dotenv')
dotenv.config()
 const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NodeMailer_Mail,
      pass: process.env.NodeMailer_Pass,
    },
  });
  module.exports={transporter}