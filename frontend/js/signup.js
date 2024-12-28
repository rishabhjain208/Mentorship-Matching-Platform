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
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      successDiv.textContent = "Signup successful! Please login.";
      document.getElementById("signup-form").reset();
    } catch (error) {
      errorDiv.textContent = error.message;
    }
  });
