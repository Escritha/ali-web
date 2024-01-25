function onChangeEmail() {
  toggleButtonsDisable();
  toggleEmailErrors();
}

function onChangePassword() {
  toggleButtonsDisable();
  togglePasswordErrors();
}

function login() {
  firebase
    .auth()
    .signInWithEmailAndPassword(form.email().value, form.password().value)
    .then((response) => {
      console.log("success", response);
      window.location.href = "pages/forms/forms.html";
    })
    .catch((error) => {
      alert("Usuário não cadastrado!");
      console.log("error", error);
    });
}

function isEmailValid() {
  const email = form.email().value;
  if (!email) {
    return false;
  }
  return validateEmail(email);
}

function toggleEmailErrors() {
  const email = form.email().value;
  form.emailRequiredError().style.display = email ? "none" : "block";

  form.emailInvalidError().style.display = validateEmail(email)
    ? "none"
    : "block";
}

function togglePasswordErrors() {
  const password = form.password().value;
  form.passwordRequiredError().style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
  const emailValid = isEmailValid();
  form.recoverPassword().disabled = !emailValid;

  const passWordValid = isPasswordValid();
  form.loginButton().disabled = !emailValid || !passWordValid;
}

function isPasswordValid() {
  const password = form.password().value;
  if (!password) {
    return false;
  }
  return true;
}

const form = {
  email: () => document.getElementById("email"),
  emailRequiredError: () => document.getElementById("email-required-error"),
  emailInvalidError: () => document.getElementById("email-invalid-error"),
  loginButton: () => document.getElementById("login-button"),
  password: () => document.getElementById("password"),
  passwordRequiredError: () =>
    document.getElementById("password-required-error"),
  recoverPassword: () => document.getElementById("recover-password-button"),
};
