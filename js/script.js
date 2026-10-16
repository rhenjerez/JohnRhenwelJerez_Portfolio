/* ==========================================================================
   script.js — renders the page from data.js and wires up interactions.
   You normally don't need to edit this file to personalize the portfolio.
   ========================================================================== */
(function () {
  "use strict";

  const D = window.PORTFOLIO || PORTFOLIO;
  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const el = (tag, cls, html) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  };
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ------------------------------- THEME --------------------------------- */
  const root = document.documentElement;
  const themeIcon = $("[data-theme-icon]");

  function setTheme(mode) {
    root.setAttribute("data-theme", mode);
    if (themeIcon) themeIcon.textContent = mode === "dark" ? "☀️" : "🌙";
    try { localStorage.setItem("portfolio-theme", mode); } catch (e) { /* storage unavailable */ }
  }
  let saved = null;
  try { saved = localStorage.getItem("portfolio-theme"); } catch (e) { saved = null; }
  setTheme(saved === "light" || saved === "dark" ? saved : "dark");

  $("#themeToggle").addEventListener("click", () => {
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  /* ----------------------------- NAVIGATION ------------------------------ */
  const nav = $("#nav");
  const navLinks = $("#navLinks");
  const navToggle = $("#navToggle");

  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("scroll", () => {
    nav.classList.toggle("is-stuck", window.scrollY > 8);
  }, { passive: true });

  /* ------------------------------- BRANDING ------------------------------ */
  $("[data-brand]").textContent = D.site.brand;
  $("[data-fullname]").textContent = D.site.fullName;
  $("[data-role]").textContent = D.site.role;
  $("[data-greeting]").textContent = D.hero.greeting;
  $("[data-tagline]").textContent = D.hero.tagline;
  $("[data-footer-name]").textContent = D.site.fullName;
  $("[data-footer-role]").textContent = D.site.role;
  $("[data-copyright]").textContent = D.site.copyright;
  document.title = D.site.fullName + " — " + D.site.role;

  const avatar = $("[data-avatar]");
  if (D.site.photo) {
    avatar.style.backgroundImage = "url('" + D.site.photo + "')";
    avatar.classList.add("has-photo");
  }

  const p1 = $("[data-cta-primary]"), p2 = $("[data-cta-secondary]");
  p1.textContent = D.hero.primaryCta.label;   p1.href = D.hero.primaryCta.href;
  p2.textContent = D.hero.secondaryCta.label; p2.href = D.hero.secondaryCta.href;

  /* --------------------------------- HERO -------------------------------- */
  $("[data-tools]").innerHTML = D.hero.tools.map((t) =>
    '<span class="tools__chip"><span>' + esc(t.icon) + "</span><span>" + esc(t.label) + "</span></span>"
  ).join("");

  const socialHtml = D.social.map((s) =>
    '<li><a href="' + esc(s.href) + '" target="_blank" rel="noopener" title="' + esc(s.label) +
    '" aria-label="' + esc(s.label) + '">' + esc(s.icon) + "</a></li>"
  ).join("");
  $("[data-social]").innerHTML = socialHtml;
  $("[data-footer-social]").innerHTML = socialHtml;

  /* -------------------------------- ABOUT -------------------------------- */
  $("[data-about-eyebrow]").textContent = D.about.eyebrow;
  $("[data-about-heading]").textContent = D.about.heading;
  $("[data-about-copy]").innerHTML = D.about.paragraphs.map((t) => "<p>" + esc(t) + "</p>").join("");
  $("[data-about-capabilities]").innerHTML =
    D.about.capabilities.map((c) => "<li>" + esc(c) + "</li>").join("");

  /* -------------------------------- SKILLS ------------------------------- */
  $("[data-skills-eyebrow]").textContent = D.skills.eyebrow;
  $("[data-skills-heading]").textContent = D.skills.heading;
  $("[data-skills]").innerHTML = D.skills.cards.map((c) =>
    '<article class="card">' +
      '<div class="skill__icon">' + esc(c.icon) + "</div>" +
      '<h3 class="skill__title">' + esc(c.title) + "</h3>" +
      '<ul class="skill__list">' + c.items.map((i) => "<li>" + esc(i) + "</li>").join("") + "</ul>" +
    "</article>"
  ).join("");

  /* ------------------------------- PROJECTS ------------------------------ */
  $("[data-projects-eyebrow]").textContent = D.projects.eyebrow;
  $("[data-projects-heading]").textContent = D.projects.heading;

  const gallery = []; // every previewable item, for the lightbox

  function projectCard(p) {
    const idx = gallery.push({ image: p.image, caption: p.title + " — " + p.category }) - 1;
    const actions = [];
    if (p.links && p.links.demo) {
      actions.push('<a class="btn btn--sm btn--solid" href="' + esc(p.links.demo) +
        '" target="_blank" rel="noopener">Live demo</a>');
    }
    if (p.links && p.links.repo) {
      actions.push('<a class="btn btn--sm btn--ghost" href="' + esc(p.links.repo) +
        '" target="_blank" rel="noopener">GitHub</a>');
    }
    if (p.links && p.links.details) {
      actions.push('<button class="btn btn--sm btn--ghost" type="button" data-preview="' + idx + '">Details</button>');
    }

    return '<article class="card pcard" data-category="' + esc(p.category) + '">' +
      '<button class="thumb' + (p.image ? " has-image" : "") + '" type="button" data-preview="' + idx +
        '" data-placeholder="PROJECT IMAGE"' +
        (p.image ? ' style="background-image:url(\'' + esc(p.image) + "')\"" : "") +
        ' aria-label="Preview ' + esc(p.title) + '">' +
        '<span class="thumb__tag">' + esc(p.category) + "</span>" +
      "</button>" +
      '<div class="pcard__body">' +
        '<h3 class="pcard__title">' + esc(p.title) + "</h3>" +
        '<p class="pcard__desc">' + esc(p.description) + "</p>" +
        '<div class="tags">' + p.tags.map((t) => '<span class="tag">' + esc(t) + "</span>").join("") + "</div>" +
        '<div class="pcard__actions">' + actions.join("") + "</div>" +
      "</div>" +
    "</article>";
  }

  $("[data-project-groups]").innerHTML = D.projects.groups.map((g) => {
    const showFilters = g.filters !== false;
    const cats = ["All"].concat(g.items.map((i) => i.category).filter((c, i, a) => a.indexOf(c) === i));
    return '<section class="pgroup">' +
      '<header class="pgroup__head">' +
        "<div>" +
          '<p class="pgroup__num">// ' + esc(g.number) + " — Projects</p>" +
          '<h3 class="pgroup__title">' + esc(g.title) + "</h3>" +
          (g.blurb ? '<p class="pgroup__blurb">' + esc(g.blurb) + "</p>" : "") +
        "</div>" +
        (showFilters ? '<div class="filters">' + cats.map((c, i) =>
          '<button class="filter' + (i === 0 ? " is-active" : "") + '" type="button" data-filter="' +
          esc(c) + '">' + esc(c) + "</button>").join("") + "</div>" : "") +
      "</header>" +
      '<div class="grid grid--projects">' + g.items.map(projectCard).join("") + "</div>" +
    "</section>";
  }).join("");

  // Category filters (scoped to their own group)
  $$(".pgroup").forEach((group) => {
    group.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      const pick = btn.dataset.filter;
      $$(".filter", group).forEach((b) => b.classList.toggle("is-active", b === btn));
      $$(".pcard", group).forEach((card) => {
        card.hidden = pick !== "All" && card.dataset.category !== pick;
      });
    });
  });

  /* ----------------------------- CERTIFICATES ---------------------------- */
  $("[data-certs-eyebrow]").textContent = D.certificates.eyebrow;
  $("[data-certs-heading]").textContent = D.certificates.heading;

  $("[data-certificates]").innerHTML = D.certificates.items.map((c) => {
    const idx = gallery.push({ image: c.image, caption: c.name + " — " + c.issuer }) - 1;
    return '<article class="card cert">' +
      '<button class="thumb' + (c.image ? " has-image" : "") + '" type="button" data-preview="' + idx +
        '" data-placeholder="CERTIFICATE IMAGE"' +
        (c.image ? ' style="background-image:url(\'' + esc(c.image) + "')\"" : "") +
        ' aria-label="Preview ' + esc(c.name) + '"></button>' +
      '<div class="cert__body">' +
        '<p class="cert__issuer">' + esc(c.issuer) + "</p>" +
        '<h3 class="cert__name">' + esc(c.name) + "</h3>" +
        '<p class="cert__desc">' + esc(c.description) + "</p>" +
        '<div class="cert__meta"><span>📅 ' + esc(c.date) + "</span>" +
          (c.id ? "<span>ID: " + esc(c.id) + "</span>" : "") + "</div>" +
        '<div class="cert__actions">' +
          '<a class="btn btn--sm btn--ghost" href="' + esc(c.verifyUrl || "#") +
          '" target="_blank" rel="noopener">View certificate</a>' +
        "</div>" +
      "</div>" +
    "</article>";
  }).join("");

  /* -------------------------------- CONTACT ------------------------------ */
  $("[data-contact-eyebrow]").textContent = D.contact.eyebrow;
  $("[data-contact-heading]").textContent = D.contact.heading;
  $("[data-contact-blurb]").textContent = D.contact.blurb;

  $("[data-contact-channels]").innerHTML = D.contact.channels.map((c) => {
    const inner =
      '<span class="channel__icon">' + esc(c.icon) + "</span>" +
      '<span class="channel__label">' + esc(c.label) + "</span>" +
      '<span class="channel__value">' + esc(c.value) + "</span>";
    return c.href
      ? '<a class="channel" href="' + esc(c.href) + '" target="_blank" rel="noopener">' + inner + "</a>"
      : '<div class="channel">' + inner + "</div>";
  }).join("");

  /* ------------------------------- LIGHTBOX ------------------------------ */
  const lb = $("#lightbox");
  const lbStage = $("[data-lb-stage]");
  const lbCaption = $("[data-lb-caption]");
  let lbIndex = 0, lastFocus = null;

  function renderLb() {
    const item = gallery[lbIndex];
    if (!item) return;
    if (item.image) {
      lbStage.style.backgroundImage = "url('" + item.image + "')";
      lbStage.textContent = "";
    } else {
      lbStage.style.backgroundImage = "none";
      lbStage.textContent = "Image coming soon";
    }
    lbCaption.textContent = item.caption;
  }
  function openLb(i) {
    lbIndex = i; lastFocus = document.activeElement;
    renderLb(); lb.hidden = false;
    document.body.style.overflow = "hidden";
    $("[data-lb-close]").focus();
  }
  function closeLb() {
    lb.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  function step(dir) {
    lbIndex = (lbIndex + dir + gallery.length) % gallery.length;
    renderLb();
  }

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-preview]");
    if (trigger) openLb(Number(trigger.dataset.preview));
  });
  $("[data-lb-close]").addEventListener("click", closeLb);
  $("[data-lb-prev]").addEventListener("click", () => step(-1));
  $("[data-lb-next]").addEventListener("click", () => step(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  /* --------------------------- SCROLLSPY + REVEAL ------------------------ */
  const sections = $$("main section[id]");
  const linkFor = {};
  $$(".nav__links a").forEach((a) => { linkFor[a.getAttribute("href").slice(1)] = a; });

  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        Object.values(linkFor).forEach((a) => a.classList.remove("is-active"));
        const active = linkFor[entry.target.id];
        if (active) active.classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));

    const reveals = $$(".section__head, .card, .about__panel, .channel, .hero__text");
    reveals.forEach((n) => n.classList.add("reveal"));
    const shower = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-in"); obs.unobserve(entry.target); }
      });
    }, { threshold: .12 });
    reveals.forEach((n) => shower.observe(n));
  }
})();
