// Backend API URL
const API_URL =
  "https://mentorship-matching-platform-backend-q6w3.onrender.com/api/user/discover"; // Replace with your backend URL

document
  .getElementById("filter-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    // Collect form data
    const role = document.getElementById("role").value.trim();
    const skills = document.getElementById("skills").value.trim();
    const interests = document.getElementById("interests").value.trim();
    const search = document.getElementById("search").value.trim();

    // Build query parameters
    const queryParams = new URLSearchParams({
      ...(role && { role }),
      ...(skills && { skills }),
      ...(interests && { interests }),
      ...(search && { search }),
    }).toString();

    // Fetch filtered users
    try {
      const response = await fetch(`${API_URL}?${queryParams}`);
      if (!response.ok) throw new Error("Failed to fetch users.");

      const users = await response.json();
      displayUsers(users);
    } catch (error) {
      console.error(error);
      alert("An error occurred while fetching users.");
    }
  });

// Display users in the results section
function displayUsers(users) {
  const usersContainer = document.getElementById("users-container");
  usersContainer.innerHTML = "";

  if (users.length === 0) {
    usersContainer.innerHTML = "<p>No users found.</p>";
    return;
  }

  users.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.classList.add("user-card");

    userCard.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Role:</strong> ${user.role}</p>
      <p><strong>Bio:</strong> ${user.bio}</p>
      <p><strong>Skills:</strong> ${user.skills.join(", ")}</p>
      <p><strong>Interests:</strong> ${user.interests.join(", ")}</p>
    `;

    usersContainer.appendChild(userCard);
  });
}
