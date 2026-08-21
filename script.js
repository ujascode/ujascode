const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const year = document.getElementById("year");
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const cursorGlow = document.querySelector(".cursor-glow");

year.textContent = new Date().getFullYear();

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

navAnchors.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.addEventListener("mousemove", (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name");
  formStatus.textContent = `Thanks ${name}. Your project request is ready to connect to a backend/email service.`;
  formStatus.style.color = "#000";
  form.reset();
});

// Close mobile navigation with Escape.
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    navLinks?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});
