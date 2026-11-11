(() => {
  const phrases = [
    "Fullstack Developer",
    "Python • C# • Kotlin • JS • C++",
    "AI / LLM Enthusiast",
    "System Architect",
    "Open Source Lover"
  ];

  const typedEl = document.getElementById("typed");
  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      typedEl.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1800);
        return;
      }
      setTimeout(typeLoop, 55 + Math.random() * 60);
    } else {
      typedEl.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeLoop, 400);
        return;
      }
      setTimeout(typeLoop, 28);
    }
  }
  typeLoop();

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-tilt]").forEach((card) => {
    const strength = 12;

    card.addEventListener("mouseenter", () => {
      if (prefersReducedMotion) return;
      card.style.transition = "transform 0.08s ease-out, box-shadow 0.35s, border-color 0.35s";
    });

    card.addEventListener("mousemove", (e) => {
      if (prefersReducedMotion) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (card.classList.contains("project-card")) {
        card.style.transform =
          `perspective(1000px) scale(1.04) translateY(-8px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg)`;
      } else {
        card.style.transform =
          `perspective(900px) rotateY(${x * strength * 0.8}deg) rotateX(${-y * strength * 0.8}deg)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s, border-color 0.5s";
      card.style.transform = "";
    });
  });

  const glow = document.getElementById("cursorGlow");
  if (glow) {
    let gx = window.innerWidth / 2;
    let gy = window.innerHeight / 2;
    let tx = gx;
    let ty = gy;

    window.addEventListener("mousemove", (e) => {
      tx = e.clientX;
      ty = e.clientY;
      glow.style.opacity = "1";
    });

    document.addEventListener("mouseleave", () => {
      glow.style.opacity = "0";
    });

    function animateGlow() {
      gx += (tx - gx) * 0.1;
      gy += (ty - gy) * 0.1;
      glow.style.left = gx + "px";
      glow.style.top = gy + "px";
      requestAnimationFrame(animateGlow);
    }
    if (!prefersReducedMotion && window.matchMedia("(min-width: 721px)").matches) {
      animateGlow();
    } else {
      glow.style.display = "none";
    }
  }

  const canvas = document.getElementById("particles");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function createParticles() {
      const count = Math.min(65, Math.floor(window.innerWidth / 24));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.4
      }));
    }
    createParticles();
    window.addEventListener("resize", createParticles);

    function drawParticles() {
      ctx.clearRect(0, 0, w, h);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(160, 170, 255, 0.55)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(109, 93, 252, ${0.14 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      if (!prefersReducedMotion) requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  const sections = document.querySelectorAll("header[id], section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  function onScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    let currentId = "hero";

    sections.forEach((sec) => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = sec.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  const discordBtn = document.getElementById("discordCopy");
  if (discordBtn) {
    const NICK = "@samogonshik_03";
    discordBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(NICK);
        showToast("Discord скопирован: " + NICK);
      } catch {
        showToast("Discord: " + NICK);
      }
    });
  }
})();
