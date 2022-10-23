const nodemailer = require("nodemailer");

const emailClient = async (from, to, subject, html) => {
	/**
	 * Creating default SMTP transport method
	 */
	const configOptions = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: `${process.env.GMAIL_USERNAME}`,
			pass: `${process.env.GMAIL_PASSWORD}`,
		},
	});
	/**
	 * Sending mail
	 */
	await configOptions.sendMail({
		from: from,
		to: to,
		subject: subject,
		text: html.replace(/(<([^>]+)>)/gi, ''),
		html: html,
	});
};

module.exports = emailClient;