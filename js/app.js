gsap.ticker.lagSmoothing(0);

// ===== Keep hero exactly filling the first fold (viewport minus ticker+header) =====
(function () {
  const ticker = document.querySelector(".ticker-wrap");
  const header = document.querySelector(".site-header");
  function setChromeHeight() {
    const h = (ticker ? ticker.offsetHeight : 0) + (header ? header.offsetHeight : 0);
    document.documentElement.style.setProperty("--chrome-h", h + "px");
  }
  setChromeHeight();
  window.addEventListener("resize", setChromeHeight);
})();

// ===== Hero entrance (staggered) =====
gsap.set(".hero-sub, .hero-note, .eyebrow, .cta-btn--lg", { y: 20 });

gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
  .to(".eyebrow", { opacity: 1, y: 0, duration: 0.7 }, 0.1)
  .from(".hero-title span", { y: 40, opacity: 0, stagger: 0.12 }, 0.25)
  .to(".hero-sub", { opacity: 1, y: 0 }, 0.55)
  .to(".cta-btn--lg", { opacity: 1, y: 0, duration: 0.7 }, 0.7)
  .to(".hero-note", { opacity: 1, y: 0 }, 0.9);

// ===== Feedback carousel (autoplay, slides one item at a time through all slides) =====
(function () {
  const track = document.getElementById("carouselTrack");
  const carousel = document.getElementById("carousel");
  if (!track || !carousel) return;

  const slides = Array.from(track.children);
  const count = slides.length;
  let index = 0;
  let timer;

  function step() {
    const first = track.firstElementChild;
    const slideWidth = first.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    index++;
    track.style.transition = "transform 0.7s cubic-bezier(0.65,0,0.35,1)";
    track.style.transform = "translateX(-" + index * (slideWidth + gap) + "px)";

    if (index >= count) {
      // after the animated step reaches the cloned tail, snap back to the real start with no transition
      setTimeout(() => {
        index = 0;
        track.style.transition = "none";
        track.style.transform = "translateX(0px)";
      }, 720);
    }
  }

  // clone the first few slides (matching max visible count) and append them, so the
  // wrap-around always has real content to slide into and the snap-back is invisible
  slides.slice(0, 4).forEach((s) => track.appendChild(s.cloneNode(true)));

  function start() {
    timer = setInterval(step, 2600);
  }
  function stop() {
    clearInterval(timer);
  }

  carousel.addEventListener("mouseenter", stop);
  carousel.addEventListener("mouseleave", start);

  start();
})();
