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
(function () {
  const videos = [
    "entrevista.mp4",
    "videos/video2.mp4",
    "videos/video3.mp4"
  ];

  const mount = document.getElementById("videoMount");
  const prevBtn = document.querySelector(".video-prev");
  const nextBtn = document.querySelector(".video-next");
  const dotsWrap = document.getElementById("videoDots");

  if (!mount || !prevBtn || !nextBtn) return;

  let index = 0;

  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    videos.forEach((_, i) => {
      const d = document.createElement("button");
      d.type = "button";
      d.className = "video-dot" + (i === index ? " is-active" : "");
      d.setAttribute("aria-label", `Ir al video ${i + 1}`);
      d.addEventListener("click", () => loadVideo(i));
      dotsWrap.appendChild(d);
    });
  }

  function mountVideo(src) {
    // Re-crea el <video> desde cero (soluciona el “no vuelve a cargar”)
    mount.innerHTML = `
      <video class="video-player" controls playsinline preload="metadata">
        <source src="${src}?v=${Date.now()}" type="video/mp4" />
        Tu navegador no soporta video HTML5.
      </video>
    `;
  }

  function loadVideo(i) {
    index = (i + videos.length) % videos.length;
    mountVideo(videos[index]);
    renderDots();

    // Intentar autoplay (si el navegador no deja, igual queda cargado)
    const v = mount.querySelector("video");
    if (v) v.play().catch(() => {});
  }

  prevBtn.addEventListener("click", () => loadVideo(index - 1));
  nextBtn.addEventListener("click", () => loadVideo(index + 1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") loadVideo(index - 1);
    if (e.key === "ArrowRight") loadVideo(index + 1);
  });

  // Inicial
  loadVideo(0);
})();


