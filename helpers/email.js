const emailClient = require("./emailClient");

const htmlMarkup = () => {
  return (
    `` +
    `Website Contact Submission<br>` +
    `&mdash;&mdash;&mdash;&mdash;<br>` +
    `Name: %NAME%<br>` +
    `Email: %EMAIL%<br><br>` +
    `Comment:<br>%COMMENT%`
  );
};

/**
 * @desc Handle the contact form submission
 */
const sendEmail = (name, email, comment) => {
  const htmlEmail = htmlMarkup()
    .replace(/%NAME%/g, name)
    .replace(/%EMAIL%/g, email)
    .replace(/%COMMENT%/g, comment);

  /** @desc Send email */
  emailClient(
    process.env.ADMIN_EMAIL_ADDRESS,
    process.env.ADMIN_EMAIL_ADDRESS,
    "Contact Submission",
    htmlEmail
  );

  /** @desc Auto-responder to the visitor */
  emailClient(
    `Kosal Vann <no-reply@kosalvann.com>`,
    email,
    "Hey, this is Kosal",
    `Hey ${name.split(" ")[0]},<br><br>
		You had stopped by my website and sent a message.<br><br>
		Thanks again for reaching out. If you need a response, I'll be in touch with you very soon.<br><br>
		&ndash; Kosal<br><br><br>
		<div style="Margin:20px 0;font-size:12px;color:#999;">
		<span style="display:block;width:50px;height:1px;padding:6px 0;border-top:1px solid #ddd;"></span>
		* * This is an auto-responder</div>`
  );
};

module.exports = sendEmail;
