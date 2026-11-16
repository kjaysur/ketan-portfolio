/* Ketan Jaysur — portfolio interactions
   Vanilla JS, no dependencies. Fails silently if anything is missing. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile navigation ---------- */
  var nav = document.getElementById("primaryNav");
  var navToggle = document.getElementById("navToggle");

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  if (nav && navToggle) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      if (open) {
        closeNav();
      } else {
        nav.classList.add("is-open");
        navToggle.setAttribute("aria-expanded", "true");
        navToggle.setAttribute("aria-label", "Close menu");
      }
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 880) closeNav();
    });
  }

  /* ---------- Header state + scroll progress + to-top ---------- */
  var header = document.getElementById("siteHeader");
  var progress = document.getElementById("scrollProgress");
  var toTop = document.getElementById("toTop");
  var ticking = false;

  function onScrollFrame() {
    var y = window.scrollY || window.pageYOffset;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (header) header.classList.toggle("is-scrolled", y > 12);

    if (progress) {
      var pct = docHeight > 0 ? Math.min(100, (y / docHeight) * 100) : 0;
      progress.style.width = pct + "%";
    }

    if (toTop) toTop.classList.toggle("is-visible", y > 600);

    updateActiveSection();

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(onScrollFrame);
      }
    },
    { passive: true }
  );
  onScrollFrame();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll(".reveal"));

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px -6% 0px" }
    );

    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    revealEls.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      // Anything already on screen at load appears immediately.
      if (rect.top < viewportHeight * 0.96 && rect.bottom > 0) {
        el.classList.add("is-visible");
      } else {
        revealObserver.observe(el);
      }
    });
  }

  /* ---------- Number count-up in the stat strip ---------- */
  var counters = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    if (isNaN(target)) return;

    if (reduceMotion) {
      el.textContent = target + suffix;
      return;
    }

    var duration = 1200;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var t = Math.min(1, (ts - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (t < 1) window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCount);
    } else {
      var countObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              countObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach(function (el) { countObserver.observe(el); });
    }
  }

  /* ---------- Scroll-spy for nav ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll('#primaryNav a[href^="#"]')
  );
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href").slice(1);
      var section = document.getElementById(id);
      return section ? { link: link, section: section } : null;
    })
    .filter(Boolean);

  function setActive(link) {
    navLinks.forEach(function (l) { l.classList.remove("is-active"); });
    if (link) link.classList.add("is-active");
  }

  function updateActiveSection() {
    if (!sections || !sections.length) return;

    var scrollPos = (window.scrollY || window.pageYOffset) + 110;
    var current = null;

    sections.forEach(function (item) {
      if (item.section.offsetTop <= scrollPos) current = item;
    });

    var atBottom =
      window.innerHeight + (window.scrollY || window.pageYOffset) >=
      document.documentElement.scrollHeight - 4;

    if (atBottom) current = sections[sections.length - 1];

    setActive(current ? current.link : null);
  }

  window.updateActiveSection = updateActiveSection;

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Kick off nav state after setup ---------- */
  updateActiveSection();
})();
