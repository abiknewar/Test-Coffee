// Mobile navigation toggle
(function () {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    // Close menu when a link is tapped (mobile)
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
})();

// Hero photo slider
(function () {
  const slider = document.querySelector(".slider");
  if (!slider) return;

  const slides = Array.from(slider.querySelectorAll(".slide"));
  const dotsWrap = slider.querySelector(".slider-dots");
  const prev = slider.querySelector(".slider-btn.prev");
  const next = slider.querySelector(".slider-btn.next");
  if (slides.length < 2) return;

  let index = 0;
  let timer = null;
  const INTERVAL = 5000;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Build dot indicators
  const dots = slides.map((_, i) => {
    const dot = document.createElement("button");
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-label", "Go to slide " + (i + 1));
    dot.addEventListener("click", () => go(i, true));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function render() {
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === index);
      d.setAttribute("aria-selected", String(i === index));
    });
  }

  function go(i, restart) {
    index = (i + slides.length) % slides.length;
    render();
    if (restart) start();
  }

  function start() {
    stop();
    if (reduceMotion) return;
    timer = setInterval(() => go(index + 1), INTERVAL);
  }
  function stop() { if (timer) clearInterval(timer); timer = null; }

  prev.addEventListener("click", () => go(index - 1, true));
  next.addEventListener("click", () => go(index + 1, true));
  slider.addEventListener("mouseenter", stop);
  slider.addEventListener("mouseleave", start);
  slider.addEventListener("focusin", stop);
  slider.addEventListener("focusout", start);
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") go(index - 1, true);
    if (e.key === "ArrowRight") go(index + 1, true);
  });

  render();
  start();
})();

// Contact form: client-side validation + friendly confirmation
(function () {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const status = form.querySelector(".form-status");
  const fields = ["name", "email", "message"].map((id) => form.querySelector("#" + id));
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valid = true;

    fields.forEach((field) => {
      if (!field) return;
      const empty = !field.value.trim();
      const badEmail = field.type === "email" && field.value.trim() && !emailRe.test(field.value.trim());
      const bad = empty || badEmail;
      field.classList.toggle("invalid", bad);
      if (bad) valid = false;
    });

    if (!valid) {
      status.textContent = "Please fill in every field with a valid email.";
      status.className = "form-status err";
      return;
    }

    // No backend wired up — acknowledge and reset.
    status.textContent = "Thanks! Your message has been sent — we'll be in touch soon.";
    status.className = "form-status ok";
    form.reset();
  });
})();
