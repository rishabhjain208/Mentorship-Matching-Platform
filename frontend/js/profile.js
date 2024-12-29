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
        <p><strong>Name:</strong> ${profile.name}</p>
        <p><strong>Email:</strong> ${profile.email}</p>
        <p><strong>Role:</strong> ${profile.role}</p>
      `;
      document.getElementById("bio").value = profile.bio || "";
      document.getElementById("skills").value =
        profile.skills?.join(", ") || "";
      document.getElementById("interests").value =
        profile.interests?.join(", ") || "";
    } else {
      document.getElementById("error").textContent = "Failed to load profile.";
    }
  } catch (error) {
    console.error(error);
    document.getElementById("error").textContent = "An error occurred.";
  }
}

document
  .getElementById("updateProfileForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const bio = document.getElementById("bio").value;
    const skills = document
      .getElementById("skills")
      .value.split(",")
      .map((s) => s.trim());
    const interests = document
      .getElementById("interests")
      .value.split(",")
      .map((i) => i.trim());

    try {
      const res = await fetch(
        "https://mentorship-matching-platform-backend-q6w3.onrender.com/api/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bio, skills, interests }),
        }
      );

      if (res.ok) {
        alert("Profile updated successfully!");
        fetchProfile();
      } else {
        document.getElementById("error").textContent =
          "Failed to update profile.";
      }
    } catch (error) {
      console.error(error);
      document.getElementById("error").textContent = "An error occurred.";
    }
  });

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
      alert("Profile deleted.");
      localStorage.removeItem("token");
      window.location.href = "/frontend/pages/signup.html";
    } else {
      document.getElementById("error").textContent =
        "Failed to delete profile.";
    }
  } catch (error) {
    console.error(error);
    document.getElementById("error").textContent = "An error occurred.";
  }
});

fetchProfile();
