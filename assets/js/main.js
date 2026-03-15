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

  // Project image viewer (lightbox)
  const viewer = document.getElementById("image-viewer");
  const viewerImage = document.getElementById("viewer-image");
  const viewerCaption = document.getElementById("viewer-caption");
  const viewerClose = document.getElementById("viewer-close");
  const viewerPrev = document.getElementById("viewer-prev");
  const viewerNext = document.getElementById("viewer-next");
  const viewerOverlay = viewer ? viewer.querySelector("[data-viewer-close]") : null;
  const images = Array.from(document.querySelectorAll("[data-viewer-image]"));

  if (viewer && viewerImage && viewerCaption && images.length > 0) {
    let currentIndex = 0;

    images.forEach((image, index) => {
      image.setAttribute("tabindex", "0");
      image.addEventListener("click", () => openViewer(index));
      image.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openViewer(index);
        }
      });
    });

    const renderImage = () => {
      const image = images[currentIndex];
      viewerImage.src = image.src;
      viewerImage.alt = image.alt || "Project screenshot";
      viewerCaption.textContent = image.alt || "Project screenshot";
    };

    const openViewer = index => {
      currentIndex = index;
      renderImage();
      viewer.classList.add("is-open");
      viewer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const closeViewer = () => {
      viewer.classList.remove("is-open");
      viewer.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    const showPrevious = () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      renderImage();
    };

    const showNext = () => {
      currentIndex = (currentIndex + 1) % images.length;
      renderImage();
    };

    if (viewerClose) {
      viewerClose.addEventListener("click", closeViewer);
    }

    if (viewerOverlay) {
      viewerOverlay.addEventListener("click", closeViewer);
    }

    if (viewerPrev) {
      viewerPrev.addEventListener("click", showPrevious);
    }

    if (viewerNext) {
      viewerNext.addEventListener("click", showNext);
    }

    document.addEventListener("keydown", event => {
      if (!viewer.classList.contains("is-open")) {
        return;
      }

      if (event.key === "Escape") {
        closeViewer();
      } else if (event.key === "ArrowLeft") {
        showPrevious();
      } else if (event.key === "ArrowRight") {
        showNext();
      }
    });
  }
});
