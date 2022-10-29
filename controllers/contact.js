const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const geoip = require("geoip-lite");
const Recaptcha = require("express-recaptcha").RecaptchaV3;
const recaptcha = new Recaptcha(
  process.env.CAPTCHA_SITEKEY,
  process.env.CAPTCHA_SECRETKEY,
  { callback: "cb" }
);
const sendEmail = require("../helpers/email");

// Required by express-recaptcha to get data from body or query.
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", async (req, res, next) => {
  const { name, email, comment } = req.body;
  const geo = geoip.lookup(req.ip);

  if (!(name && email && comment)) {
    res
      .status(422)
      .json({ status: "Error", message: "All fields are required" });
  }

  await recaptcha.verify(req, function (error, data) {
    if (error) {
      console.warn(error);
      return;
    }
    sendEmail(name, email, comment, geo);
    res.status(200).json({ status: "Success" });
  });
});

module.exports = router;
