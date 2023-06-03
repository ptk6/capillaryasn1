// const form = document.querySelector("#registerForm");

// form.addEventListener("submit", function (event) {
//   event.preventDefault();

//   var username = document.querySelector("#username").value;
//   var password = document.querySelector("#password").value;

//   alert("Username:" + username + "\n password:" + password);

//   form.reset();
// });
// Function to send a POST request to the server

const registerButton = document.getElementById("register-btn");
const registerForm = document.getElementById("registration-form");

async function postData(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Function to handle user registration
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Get the input values from the user
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  // Validate the input values
  // if (username.length < 5) {
  //   alert("Username must be at least 5 characters long!");
  //   return;
  // }

  // if (password.length < 7) {
  //   alert("Password must be at least 8 characters long!");
  //   return;
  // }

  // Create a new user object with the input values
  let user = {
    username: username,
    password: password,
  };

  // Send the user object to the server for registration
  console.log(user);
  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("User registered successfully!");
    })
    .catch((error) => {
      console.error(error);
      alert(
        "An error occurred while registering the user. Please try again later."
      );
      console.log(error);
    });
});
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-btn");

// Function to handle user login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Get the input values from the user
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  // Validate the input values
  // if (username.length < 5) {
  //   alert("Username must be at least 5 characters long!");
  //   return;
  // }

  // if (password.length < 7) {
  //   alert("Password must be at least 8 characters long!");
  //   return;
  // }

  // Create a new user object with the input values
  let user = {
    username: username,
    password: password,
  };

  // Send the user object to the server for authentication
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // alert("User logged in successfully!");
      window.location.href = "games/game.html";
    })
    .catch((error) => {
      console.error(error);
      alert("An error occurred while logging in. Please try again later.");
    });
});

// Get a reference to the registration form
// let registrationForm = document.getElementById("registration-form");

// // Add an event listener to the registration form
// registrationForm.addEventListener("submit", function (event) {
//   event.preventDefault(); // Prevent the form from submitting

//   handleUserRegistration(); // Call the function to handle user registration
// });

// // Get a reference to the login form
// let loginForm = document.getElementById("login-form");

// // Add an event listener to the login form
// loginForm.addEventListener("submit", function (event) {
//   event.preventDefault(); // Prevent the form from submitting

//   handleUserLogin(); // Call the function to handle user login
// });

// const loginForm = document.getElementById("loginForm");
// loginForm.addEventListener("submit", handleLogin);
