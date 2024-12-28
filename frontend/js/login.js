document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      alert("Login successful");
      localStorage.setItem("token", data.token);
      window.location.href = "/frontend/pages/discover.html";
    } else {
      document.getElementById("error").textContent =
        data.message || "Login failed";
    }
  } catch (error) {
    console.error(error);
    document.getElementById("error").textContent = "An error occurred.";
  }
});
