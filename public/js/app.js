// Toggle the drawer trigger icon
const toggleIcon = (elem) => {
  return (elem.firstElementChild.innerText =
    elem.firstElementChild.innerText !== "menu" ? "menu" : "arrow_back");
};
