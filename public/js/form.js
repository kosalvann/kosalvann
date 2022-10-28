const form = document.querySelector("#form");
const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const commentField = document.querySelector("#comment");
const successBox = document.querySelector(".notify-success");
const isRequired = (value) => (value === "" ? false : true);
const isBetween = (length, min, max) =>
  length < min || length > max ? false : true;

const validateName = () => {
  let valid = false;
  const min = 2,
    max = 100;
  const name = nameField.value.trim();

  if (!isRequired(name) || !isBetween(name.length, min, max)) {
    showError(nameField, "Your name is required");
  } else {
    showSuccess(nameField);
    valid = true;
  }
  return valid;
};

const validateEmail = () => {
  let valid = false;
  const name = emailField.value.trim();
  if (!isRequired(name) || !isEmailValid(name)) {
    showError(emailField, "Email address is blank or invalid");
  } else {
    showSuccess(emailField);
    valid = true;
  }
  return valid;
};

const isEmailValid = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validateComment = () => {
  let valid = false;
  const min = 2,
    max = 500;
  const name = commentField.value.trim();

  if (!isRequired(name) || !isBetween(name.length, min, max)) {
    showError(commentField, "Please enter some comment");
  } else {
    showSuccess(commentField);
    valid = true;
  }
  return valid;
};

const showError = (input, message) => {
  const formField = input.parentElement;
  formField.classList.remove("success");
  formField.classList.add("error");
  const error = formField.querySelector("small");
  error.textContent = message;
};

const showSuccess = (input) => {
  const formField = input.parentElement;
  formField.classList.remove("error");
  const error = formField.querySelector("small");
  error.textContent = "";
};

const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

form.addEventListener(
  "input",
  debounce(function (e) {
    switch (e.target.id) {
      case "name":
        validateName();
        break;
      case "email":
        validateEmail();
        break;
      case "comment":
        validateComment();
        break;
    }
  })
);

const handleFormSubmit = async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const url = form.action;

  let isNameValid = validateName(),
    isEmailValid = validateEmail(),
    isCommentValid = validateComment();
  isFormValid = isNameValid && isEmailValid && isCommentValid;

  if (isFormValid) {
    const formData = new FormData(form);
    const responseData = await postFormDataAsJson({ url, formData });
    return responseData;
  }
};

const postFormDataAsJson = async ({ url, formData }) => {
  const plainFormData = Object.fromEntries(formData.entries());
  const formDataJsonString = JSON.stringify(plainFormData);

  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: formDataJsonString,
  };

  const response = await fetch(url, fetchOptions);
  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
  if (response.ok) {
    form.style.display = "none";
    successBox.style.display = "block";
    successBox.textContent = "Thanks, your message was sent";
    (nameField.value = ""), (emailField.value = ""), (commentField.value = "");
  }

  return response;
};

form.addEventListener("submit", handleFormSubmit);