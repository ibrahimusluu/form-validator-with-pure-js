const form = document.getElementById("form");

const username = document.getElementById("username");
const email = document.getElementById("email");
// const phone = document.getElementById("phone"); // no need here
const password = document.getElementById("password");
const repassword = document.getElementById("repassword");

function error(input, message) {
  input.className = "form-control is-invalid ";

  const div = input.nextElementSibling;
  div.innerText = message;
  div.className = "invalid-feedback";
}

function success(input) {
  input.className = "form-control is-valid";
}

const checkEmail = (email) => {
  console.log(email.value);
  const result = String(email.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  console.log(result);
  if (!result && email.value !== "") {
    error(email, "invalid email address");
  }
};

function checkRequired(inputs) {
  console.log(inputs);
  inputs.forEach(function (input) {
    if (input.value === "") {
      error(input, `${input.id} required`);
      //   error(input, `${input.previousElementSibling.textContent} required`);
    }
    //   else if (!validateEmail(email.value)) {
    //     error(email, "invalid email address");
    //   }
    else {
      success(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length !== 0) {
    if (input.value.length < min) {
      error(input, `${input.id} at least should be ${min} character`);
    } else if (input.value.length > max) {
      error(input, `${input.id} at most should be ${max} character`);
    } else {
      success(input);
    }
  }
}

function checkPasswords(input1, input2) {
  if (input1.value !== input2.value) {
    error(input2, "passwords are not match!");
  }
}

function checkPhone(input) {
  let exp = /^\d{10}$/;
  if (!exp.test(input.value)) {
    error(input, "phone number should be 10 characters.");
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, repassword, phone]);
  checkEmail(email);
  //   if (!checkEmail(email.value) && email.value !== "") {
  //     error(email, "invalid email address");
  //   }
  checkLength(username, 7, 15);
  checkLength(password, 7, 12);
  checkPasswords(password, repassword);
  checkPhone(phone);
});
