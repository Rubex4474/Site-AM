gsap.ticker.lagSmoothing(0);

// ===== Hero entrance (staggered) =====
gsap.set(".hero-sub, .hero-note, .eyebrow, .cta-btn--lg", { y: 20 });

gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
  .to(".eyebrow", { opacity: 1, y: 0, duration: 0.7 }, 0.1)
  .from(".hero-title span", { y: 40, opacity: 0, stagger: 0.12 }, 0.25)
  .to(".hero-sub", { opacity: 1, y: 0 }, 0.55)
  .to(".cta-btn--lg", { opacity: 1, y: 0, duration: 0.7 }, 0.7)
  .to(".hero-note", { opacity: 1, y: 0 }, 0.9);

// ===== Feedback carousel (autoplay) =====
(function () {
  const track = document.getElementById("carouselTrack");
  const dotsWrap = document.getElementById("carouselDots");
  const carousel = document.getElementById("carousel");
  if (!track || !dotsWrap || !carousel) return;

  const count = track.children.length;
  let index = 0;
  let timer;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("button");
    dot.className = "carousel-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Ir para o feedback " + (i + 1));
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  }
  const dots = dotsWrap.children;

  function goTo(i) {
    index = (i + count) % count;
    track.style.transform = "translateX(-" + index * 100 + "%)";
    Array.from(dots).forEach((d, di) => d.classList.toggle("active", di === index));
  }

  function start() {
    timer = setInterval(() => goTo(index + 1), 3500);
  }
  function stop() {
    clearInterval(timer);
  }

  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);

  start();
})();
