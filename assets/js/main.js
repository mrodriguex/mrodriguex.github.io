document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Hamburger Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
      });
    });
  }

  // Back to Top Button
  const backToTopButton = document.getElementById("back-to-top");
  if (backToTopButton) {
    // Show button when scrolled down
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
      } else {
        backToTopButton.style.display = "none";
      }
    });

    // Scroll to top on click
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
