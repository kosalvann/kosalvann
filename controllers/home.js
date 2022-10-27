const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

// Required by express-recaptcha to get data from body or query.
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", async (req, res, next) => {
  res.render("home", {
    bodyClassName: "home",
    helpers: {
      parseLang(str) {
        return str.replace(
          /activecampaign/i,
          `<a href="https://activecampaign.com" target="blank" rel="noopener">ActiveCampaign</a>`
        );
      },
    },
  });
});

module.exports = router;
