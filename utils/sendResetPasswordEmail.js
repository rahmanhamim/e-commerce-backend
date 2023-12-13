const sendEmail = require("./sendEmail");

const sendResetPasswordEmail = async ({
  name,
  email,
  resetPasswordToken,
  origin,
}) => {
  const resetPasswordURL = `${origin}/reset-password?token=${resetPasswordToken}&email=${email}`;
  const message = `<p> Please reset password by clicking on the following link: 
    <a href="${resetPasswordURL}">Reset Password</a>
  </p>`;

  return await sendEmail({
    to: email,
    subject: "Reset Password",
    html: `<h4>Hi ${name}</h4> <br/> ${message}`,
  });
};

module.exports = sendResetPasswordEmail;
