document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const currentYear = document.getElementById("current-year");

  // Set the footer year automatically.
  if (currentYear) currentYear.textContent = new Date().getFullYear();

  // Restore the user's theme preference, if one was saved.
  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "dark") body.classList.add("dark-theme");

  function updateThemeButton() {
    const isDark = body.classList.contains("dark-theme");
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    themeToggle.setAttribute("title", isDark ? "Switch to light theme" : "Switch to dark theme");
    themeToggle.innerHTML = isDark
      ? '<svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path></svg>'
      : '<svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 15.1A8.7 8.7 0 0 1 8.9 3.2 8.8 8.8 0 1 0 20.8 15.1Z"></path></svg>';
  }

  updateThemeButton();

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    localStorage.setItem("portfolio-theme", body.classList.contains("dark-theme") ? "dark" : "light");
    updateThemeButton();
  });

  // Mobile navigation.
  function closeMenu() {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) closeMenu();
  });
});
