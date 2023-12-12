const sendEmail = require("./sendEmail");

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verificationURL = `${origin}/auth/verify-email?token=${verificationToken}&email=${email}`;

  const message = `
  <h1>Hello ${name}, Please click the link to verify your email</h1>
  <a href=${verificationURL} clicktracking=off>${verificationURL}</a>
`;

  return sendEmail({
    to: email,
    subject: "Verify your email",
    html: message,
  });
};

module.exports = sendVerificationEmail;
