// Animaciones de entrada al hacer scroll. Solo escritorio y sin "reducir movimiento".
(function () {
  var activo = window.matchMedia("(min-width: 769px)").matches &&
               !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
               "IntersectionObserver" in window;
  if (!activo) return;

  document.documentElement.classList.add("reveal-on");

  document.addEventListener("DOMContentLoaded", function () {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    document.querySelectorAll("[data-reveal]").forEach(function (el) { io.observe(el); });
  });
})();
