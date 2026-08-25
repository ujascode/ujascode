const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const year = document.getElementById("year");
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const cursorGlow = document.querySelector(".cursor-glow");

if (year) {
  year.textContent = new Date().getFullYear();
}

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(open));
});

navAnchors.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");

    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.addEventListener("mousemove", (event) => {
  if (!cursorGlow) return;

  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

/*
 * UJASCODE CONTACT FORM
 * Formspree endpoint:
 * https://formspree.io/f/maewrbzl
 */

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = document.getElementById("submitButton");

  const data = new FormData(form);

  const name = String(data.get("name") || "there").trim();

  const endpoint = form.getAttribute("action");

  if (!endpoint) {
    formStatus.textContent =
      "Unable to send the request. Please try again later.";

    formStatus.style.color = "#b00020";

    return;
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.style.opacity = "0.55";
    submitButton.style.cursor = "wait";
  }

  formStatus.textContent = "Sending your project request...";

  formStatus.style.color = "#000";

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      formStatus.textContent = `Thanks ${name}. Your request has been sent successfully.`;

      formStatus.style.color = "#087f23";

      form.reset();
    } else {
      let message = "Something went wrong. Please try again.";

      try {
        const result = await response.json();

        if (result?.errors?.length) {
          message = result.errors.map((error) => error.message).join(" ");
        }
      } catch {
        // Keep fallback message.
      }

      formStatus.textContent = message;
      formStatus.style.color = "#b00020";
    }
  } catch (error) {
    console.error("Form submission error:", error);

    formStatus.textContent =
      "Network error. Please check your connection and try again.";

    formStatus.style.color = "#b00020";
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.style.opacity = "1";
      submitButton.style.cursor = "pointer";
    }
  }
});

// Close mobile navigation with Escape.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    navLinks?.classList.remove("open");

    menuToggle?.setAttribute("aria-expanded", "false");
  }
});
