const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const signInBtn = document.getElementById('signInBtn');


signInBtn.addEventListener("click", function (e) {
  e.preventDefault();

  //1- get the username input
  const username = usernameInput.value;

  //2- get the password input
  const password = passwordInput.value;

  //3- match password & username
  if (username == "admin" && password == "admin123") {
    alert("Sign in Successful");


    window.location.assign("./home.html");
  } else {
    alert("Sign in Failed");
    return;
  }
});