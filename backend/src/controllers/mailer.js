import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { smptPassword, smptUsername } from "../../secret.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: smptUsername,
    pass: smptPassword,
  },
});

// e-mail formats
var mailGenerator = new Mailgen({
  theme: "default",
  product: {

    name: "Shopy-icecream",
    link: 'https://mailgen.js/'

  },
});

/** POST: http://localhost:8080/api/registerMail 
 * @param: {
  "username" : "example123",
  "userEmail" : "admin123",
  "text" : "",
  "subject" : "",
}
*/




export const registerMail = async (req, res) => {
  const { username, email, text, subject } = req.body;
  var emailData = {
    body: {
      name: username,
      intro:
        text ||
        "Welcome to Daily Tuition! We're very excited to have you on board.",
      outro:
        "Need help, or have questions? Just reply to this email, we'd love to help.",
    },
  };

  var emailBody = mailGenerator.generate(emailData);

  let message = {
    from: smptUsername,
    to: email,
    subject: subject || "Signup Successful",
    html: emailBody,
  };

  // send mail to the user
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail(message);
    //console.log("Message sent: %s", info.messageId);
    res.send("Mail send successfull")
  } catch (err) {
    console.error("Error sending email", err);
    res.status(500).send(err.message);
  }
};
