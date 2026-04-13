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

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    formNote.textContent = "Please fill in all fields before submitting.";
    return;
  }

  formNote.textContent = "Sending...";

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || "Failed to send your message.");
    }

    formNote.textContent = "Thanks " + name + ", your message has been saved.";
    form.reset();
  } catch (error) {
    formNote.textContent = error.message || "There was an error sending your message.";
  }
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