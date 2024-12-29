// document.getElementById("loginForm").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;

//   try {
//     const res = await fetch(
//       "https://mentorship-matching-platform-backend-q6w3.onrender.com/api/auth/login",
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       }
//     );
//     const data = await res.json();

//     if (res.ok) {
//       alert("Login successful");
//       localStorage.setItem("token", data.token);
//       window.location.href = "/frontend/pages/discover.html";
//     } else {
//       document.getElementById("error").textContent =
//         data.message || "Login failed";
//     }
//   } catch (error) {
//     console.error(error);
//     document.getElementById("error").textContent = "An error occurred.";
//   }
// });
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email);
  console.log(password);
  try {
    const res = await fetch(
      "https://mentorship-matching-platform-backend-q6w3.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await res.json();
    console.log(data);
    if (res.ok) {
      alert("Login successful");

      // Store the token in localStorage
      localStorage.setItem("token", data.token);

      // Redirect to the discover page after successful login
      setTimeout(() => {
        window.location.href = "/frontend/pages/discover.html";
      }, 1000); // 1-second delay for user feedback
    } else {
      // Display error message on login failure
      document.getElementById("error").textContent =
        data.message || "Login failed";
    }
  } catch (error) {
    console.error(error);

    // Display generic error message on exception
    document.getElementById("error").textContent = "An error occurred.";
  }
});
