const sendEmail = require("./sendEmail");

const sendResetPasswordEmail = async ({
  name,
  email,
  resetPasswordToken,
  origin,
}) => {
  //   const resetPasswordURL = `${origin}/auth/reset-password?token=${resetPasswordToken}&email=${email}`;
  //   const message = `
  //   <h1>Hello ${name}, Please click the link to reset your password</h1>
  //   <a href=${resetPasswordURL} clicktracking=off>${resetPasswordURL}</a>
  // `;
  //   return sendEmail({
  //     to: email,
  //     subject: "Reset your password",
  //     html: message,
  //   });
  // ON_PROGRESS
};

module.exports = sendResetPasswordEmail;
