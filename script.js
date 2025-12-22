// Menú móvil
const toggle = document.querySelector(".nav__toggle");
const nav = document.querySelector(".nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Cerrar menú al tocar un link
  nav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Año en footer
document.querySelectorAll("#year").forEach(el => el.textContent = new Date().getFullYear());

// Form demo (no envía a backend)
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      if (note) note.textContent = "Completá los campos obligatorios.";
      return;
    }
    if (note) note.textContent = "Mensaje listo. Conectá un backend (Formspree/EmailJS) para enviarlo.";
    form.reset();
  });
}

