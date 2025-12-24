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

  const mq = window.matchMedia('(max-width: 768px)');

  let raf = null;
  const speed = 0.18; // 0.12 = suave, 0.25 = más notorio

  const update = () => {
    raf = null;
    if (!mq.matches) {
      hero.style.removeProperty('--bg-offset');
      return;
    }
    const r = hero.getBoundingClientRect();
    const offset = Math.round(r.top * speed);
    hero.style.setProperty('--bg-offset', `${offset}px`);
  };

  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update);
  mq.addEventListener?.('change', update);
})();