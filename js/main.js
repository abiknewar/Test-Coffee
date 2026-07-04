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
