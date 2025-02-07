// Wait until the DOM is fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", () => {
  /* -------------------------------------------------------------------------
     1. Toggle Navigation Menu
  ------------------------------------------------------------------------- */
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector("header nav ul");

  // Toggle the visibility of the navigation menu when the hamburger icon is clicked
  if (hamburger) {
    hamburger.addEventListener("click", toggleMenu);
  }

  function toggleMenu() {
    navMenu.classList.toggle("show-menu"); // CSS should define .show-menu for mobile display
  }

  /* -------------------------------------------------------------------------
     2. Smooth Scrolling for Navigation Links
  ------------------------------------------------------------------------- */
  const navLinks = document.querySelectorAll("header nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
      // Optional: Close the mobile menu after clicking a link
      if (navMenu.classList.contains("show-menu")) {
        navMenu.classList.remove("show-menu");
      }
    });
  });

  /* -------------------------------------------------------------------------
     3. Projects Filter Feature
  ------------------------------------------------------------------------- */
  // Assume filter buttons have a class "filter-btn" and a data-category attribute
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll("#projects article");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const category = this.dataset.category;
      filterProjects(category);
    });
  });

  function filterProjects(category) {
    projects.forEach((project) => {
      // Each project should have a data-category attribute to match filter criteria
      if (category === "all" || project.dataset.category === category) {
        project.style.display = "block";
      } else {
        project.style.display = "none";
      }
    });
  }

  /* -------------------------------------------------------------------------
     4. Lightbox Effect for Project Images
  ------------------------------------------------------------------------- */
  // Create a lightbox container element
  const lightbox = document.createElement("div");
  lightbox.id = "lightbox";
  document.body.appendChild(lightbox);

  // Style for active lightbox should be defined in CSS (.active)
  const projectImages = document.querySelectorAll("#projects img");

  projectImages.forEach((img) => {
    img.addEventListener("click", function () {
      lightbox.classList.add("active");
      // Clear any previous content
      lightbox.innerHTML = "";
      // Create an image element for the lightbox view
      const lightboxImage = document.createElement("img");
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightbox.appendChild(lightboxImage);
    });
  });

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", function () {
    lightbox.classList.remove("active");
  });

  /* -------------------------------------------------------------------------
     5. Contact Form Validation
  ------------------------------------------------------------------------- */
  const contactForm = document.querySelector("#contact form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      let valid = true;
      // Get input elements
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      // Clear previous error messages
      clearErrors();

      // Validate Name
      if (nameInput.value.trim() === "") {
        showError(nameInput, "Please enter your name");
        valid = false;
      }

      // Validate Email
      if (emailInput.value.trim() === "") {
        showError(emailInput, "Please enter your email");
        valid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        showError(emailInput, "Please enter a valid email");
        valid = false;
      }

      // Validate Message
      if (messageInput.value.trim() === "") {
        showError(messageInput, "Please enter your message");
        valid = false;
      }

      // Prevent form submission if any field is invalid
      if (!valid) {
        e.preventDefault();
      }
    });
  }

  // Helper function to display error messages
  function showError(inputElement, message) {
    const errorElement = document.createElement("span");
    errorElement.className = "error-message";
    errorElement.style.color = "red";
    errorElement.innerText = message;
    inputElement.parentNode.insertBefore(
      errorElement,
      inputElement.nextSibling
    );
  }

  // Helper function to clear error messages
  function clearErrors() {
    const errors = document.querySelectorAll(".error-message");
    errors.forEach((error) => error.remove());
  }

  // Simple email validation using regex
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
});
