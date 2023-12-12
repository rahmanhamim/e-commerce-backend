const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailer.config");

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Rahman Hamim 👻" <rahmanhamiminfo@example.com>', // sender address
    to, // list of receivers
    subject,
    html,
  });
};

module.exports = sendEmail;
