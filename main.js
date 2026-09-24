// Mobile nav
const burger = document.getElementById("burger");
const mnav = document.getElementById("mnav");
const overlay = document.getElementById("moverlay");

function closeNav() {
  burger.classList.remove("open");
  mnav.classList.remove("open");
  overlay.classList.remove("open");
}
burger.addEventListener("click", () => {
  burger.classList.toggle("open");
  mnav.classList.toggle("open");
  overlay.classList.toggle("open");
});
overlay.addEventListener("click", closeNav);
document.querySelectorAll("#mnav a").forEach((a) => a.addEventListener("click", closeNav));

// Header + floating buttons on scroll
const header = document.getElementById("siteHeader");
const backToTop = document.getElementById("backToTop");
const waFloat = document.getElementById("waFloat");
const footer = document.querySelector("footer.site");
let footerVisible = false;

if (footer) {
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => (footerVisible = e.isIntersecting));
    },
    { threshold: 0.05 }
  );
  footerObserver.observe(footer);
}

function onScroll() {
  const scrolled = window.scrollY > 40;
  header.classList.toggle("sc", scrolled);

  const show = window.scrollY > 500 && !footerVisible;
  backToTop.classList.toggle("show", show);
  waFloat.classList.toggle("show", show);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Reveal on scroll
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
if (reduceMotion) {
  revealEls.forEach((el) => el.classList.add("in"));
} else {
  const ro = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          ro.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => ro.observe(el));
}
