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
    showError(nameField, formMessage.name);
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
    showError(emailField, formMessage.email);
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
    showError(commentField, formMessage.comment);
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
  let formTitleText = document.querySelector(".drawer__title h1").textContent;

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
    successBox.textContent = formMessage.success;
    formTitleText.innerHTML = formMessage.successTitle;
    (nameField.value = ""), (emailField.value = ""), (commentField.value = "");
  }

  return response;
};

form.addEventListener("submit", handleFormSubmit);
