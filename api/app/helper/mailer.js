const sgMail = require('@sendgrid/mail')
const {adminDB} = require("../auth/adminDB.js")

exports.sendEmail = async (emailFrom, emailTo, title, textContent, htmlContent) => {
  try {
    

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
      to: emailTo, // Change to your recipient
      from: emailFrom, // Change to your verified sender
      subject: title,
      text: textContent,
      html: htmlContent,
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })

  } catch (err) {
  }
}
