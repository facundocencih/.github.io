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

  if (!mount) return;

  let index = 0;
  let loaded = false;

  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = "";
    videos.forEach((_, i) => {
      const d = document.createElement("button");
      d.className = "video-dot" + (i === index ? " is-active" : "");
      d.onclick = () => loadVideo(i);
      dotsWrap.appendChild(d);
    });
  }

  function loadVideo(i) {
    index = (i + videos.length) % videos.length;

    mount.innerHTML = `
      <video class="video-player" controls playsinline preload="none">
        <source src="${videos[index]}" type="video/mp4">
      </video>
    `;

    renderDots();
  }

  mount.addEventListener("click", () => {
    if (!loaded) {
      loaded = true;
      loadVideo(index);
    }
  });

  prevBtn?.addEventListener("click", () => loadVideo(index - 1));
  nextBtn?.addEventListener("click", () => loadVideo(index + 1));

  renderDots();
})();

(() => {
  const hero = document.querySelector('.hero-bg');
  if (!hero) return;

  const isMobile = window.matchMedia('(max-width: 768px)');
  if (!isMobile.matches) return;

  const speed = 1; // más alto = acompaña más

  const update = () => {
    const scrollY = window.scrollY;
    hero.style.setProperty('--bg-offset', `${scrollY * speed}px`);
  };

  update();
  window.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
})();