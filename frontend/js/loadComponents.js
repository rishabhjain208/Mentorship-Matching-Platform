async function loadComponent(id, path) {
  const element = document.getElementById(id);
  if (element) {
    const response = await fetch(path);
    const html = await response.text();
    element.innerHTML = html;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("header", "/frontend/components/header.html");
  loadComponent("footer", "/frontend/components/footer.html");
});
