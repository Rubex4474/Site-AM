gsap.ticker.lagSmoothing(0);

// ===== Hero entrance (staggered) =====
gsap.set(".hero-sub, .hero-note, .eyebrow, .cta-btn--lg", { y: 20 });

gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
  .to(".eyebrow", { opacity: 1, y: 0, duration: 0.7 }, 0.1)
  .from(".hero-title span", { y: 40, opacity: 0, stagger: 0.12 }, 0.25)
  .to(".hero-sub", { opacity: 1, y: 0 }, 0.55)
  .to(".cta-btn--lg", { opacity: 1, y: 0, duration: 0.7 }, 0.7)
  .to(".hero-note", { opacity: 1, y: 0 }, 0.9);
