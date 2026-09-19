const transporter = require('../../config/email.js');
// const transporter = require('../../assets/logo-white.png');

exports.sendMail = async (to, subject, html) => {
  try {

    const send = await transporter.sendMail({
      from: `"Kode OTP Sohbah" <${process.env.SMTP_USER}>`,
      to: to,
      subject: subject,
      html: html,
      attachments: {
        filename: 'logo',
        path: './src/assets/logo-white.png',
        cid: 'logo-123'
      }
    });

    return send;

  } catch (error) {

    throw new Error(error)

  }

}