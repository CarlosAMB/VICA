// Navbar compartida: un único lugar para editar los enlaces del menú.
(function () {
  var enlaces = [
    { t: "Inicio", h: "index.html" },
    { t: "Ramos", h: "index.html#ramos" },
    { t: "Aniversario", h: "index.html#aniversario" },
    { t: "Flores eternas", h: "index.html#flores-eternas" },
    { t: "Catálogo", h: "catalogo.html" },
    { t: "Contacto", h: "index.html#contactos" }
  ];
  var pagina = location.pathname.split("/").pop() || "index.html";
  // En catálogo y producto se marca "Catálogo"; en la landing, "Inicio"
  var activo = (pagina === "catalogo.html" || pagina === "producto.html") ? "catalogo.html" : "index.html";

  var nav = document.createElement("header");
  nav.className = "navbar";
  nav.innerHTML =
    '<div class="contenedor">' +
      '<a class="marca" href="index.html">Vica</a>' +
      '<button class="burger" aria-label="Abrir menú" aria-expanded="false"><span></span><span></span><span></span></button>' +
      "<ul>" + enlaces.map(function (e) {
        return '<li><a href="' + e.h + '"' + (e.h === activo ? ' class="activo"' : "") + ">" + e.t + "</a></li>";
      }).join("") + "</ul>" +
    "</div>";
  document.body.insertBefore(nav, document.body.firstChild);

  var burger = nav.querySelector(".burger");
  burger.addEventListener("click", function () {
    var abierto = nav.classList.toggle("abierto");
    burger.setAttribute("aria-expanded", abierto);
  });
  nav.querySelectorAll("ul a").forEach(function (a) {
    a.addEventListener("click", function () { nav.classList.remove("abierto"); });
  });
})();
