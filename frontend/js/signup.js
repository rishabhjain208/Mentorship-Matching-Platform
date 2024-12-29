document
  .getElementById("signup-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const errorDiv = document.getElementById("error");
    const successDiv = document.getElementById("success");
    errorDiv.textContent = "";
    successDiv.textContent = "";

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      role: document.getElementById("role").value,
      bio: document.getElementById("bio").value,
      skills: document
        .getElementById("skills")
        .value.split(",")
        .map((s) => s.trim()),
      interests: document
        .getElementById("interests")
        .value.split(",")
        .map((i) => i.trim()),
    };

    try {
      const response = await fetch(
        "https://mentorship-matching-platform-backend-q6w3.onrender.com/api/auth/register", // Replace with your API URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      successDiv.textContent = "Signup successful! Redirecting...";
      document.getElementById("signup-form").reset();

      // Redirect to the main document after a successful signup
      setTimeout(() => {
        window.location.href = "../pages/login.html"; // Replace with your main document URL
      }, 2000); // 2-second delay for user to read the success message
    } catch (error) {
      errorDiv.textContent = error.message;
    }
  });
