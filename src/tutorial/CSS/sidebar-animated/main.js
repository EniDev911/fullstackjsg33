const btnToggle = document.querySelector(".toggle-btn"),
  sidebar = document.getElementById("sidebar");

btnToggle.addEventListener("click", () => {
  sidebar.classList.toggle("active");
})