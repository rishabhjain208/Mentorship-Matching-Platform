async function fetchConnections() {
  try {
    const res = await fetch("http://localhost:5000/api/connection/list", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const connections = await res.json();
      const connectionsHTML = connections
        .map(
          (c) => `<p>${c.sender.name} -> ${c.receiver.name} (${c.status})</p>`
        )
        .join("");
      document.getElementById("connectionsList").innerHTML = connectionsHTML;
    } else {
      document.getElementById("error").textContent =
        "Failed to load connections";
    }
  } catch (error) {
    console.error(error);
    document.getElementById("error").textContent = "An error occurred.";
  }
}

fetchConnections();
