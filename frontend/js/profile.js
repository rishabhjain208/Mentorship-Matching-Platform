const token = localStorage.getItem("token");

async function fetchProfile() {
  try {
    const res = await fetch(
      "https://mentorship-matching-platform-backend-q6w3.onrender.com/api/user/profile",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.ok) {
      const profile = await res.json();
      document.getElementById("profileDetails").innerHTML = `
        <p>Name: ${profile.name}</p>
        <p>Email: ${profile.email}</p>
        <p>Role: ${profile.role}</p>
      `;
    } else {
      document.getElementById("error").textContent = "Failed to load profile";
    }
  } catch (error) {
    console.error(error);
    document.getElementById("error").textContent = "An error occurred.";
  }
}

document.getElementById("deleteProfile").addEventListener("click", async () => {
  try {
    const res = await fetch(
      "https://mentorship-matching-platform-backend-q6w3.onrender.com/api/user/profile",
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.ok) {
      alert("Profile deleted");
      localStorage.removeItem("token");
      window.location.href = "/frontend/pages/signup.html";
    } else {
      document.getElementById("error").textContent = "Failed to delete profile";
    }
  } catch (error) {
    console.error(error);
    document.getElementById("error").textContent = "An error occurred.";
  }
});

fetchProfile();
