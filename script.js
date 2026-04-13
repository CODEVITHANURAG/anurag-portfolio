const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const form = document.getElementById("messageForm");
const formNote = document.getElementById("formNote");
const yearSpan = document.getElementById("year");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
  });
});

// Simple front-end form behavior for demo in a single-file setup.
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = form.name.value.trim();
  formNote.textContent =
    "Thanks " + name + ", your message has been recorded.";
  form.reset();
});

yearSpan.textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => observer.observe(el));