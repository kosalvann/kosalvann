const locale2CharCode = (langCode) => {
  const lang = langCode ?? {};
  // Grab language code first two char
  const code = lang[0].slice(0, 2);
  return code ? code : "en";
};

module.exports = locale2CharCode;
