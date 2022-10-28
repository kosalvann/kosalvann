const debounce = (func, wait = 500) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Toggle the drawer trigger icon
const toggleDrawerIcon = (elem) => {
  return (elem.firstElementChild.innerText =
    elem.firstElementChild.innerText !== "menu" ? "menu" : "arrow_back");
};
