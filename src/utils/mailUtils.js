const fs = require('fs/promises')
const path = require('path')


async function otpEmailTemplate(otp) {

  const templatePath = path.join(
    __dirname,
    '/template/email-otp.html'
  )

  let otpTemplateString = await fs.readFile(
    templatePath,
    'utf-8'
  )

  otpTemplateString = otpTemplateString.replace(
    "{{otp}}",
    otp
  )

  return otpTemplateString

}

module.exports = {
  otpEmailTemplate,
};