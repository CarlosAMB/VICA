(function () {
  var RUTA_IMG = "assets/img/productos/";
  var grilla = document.getElementById("grilla");
  var filtros = document.getElementById("filtros");
  var datos, actual = "todos";

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function pintarFiltros() {
    var cats = [{ id: "todos", nombre: "Todos" }].concat(datos.categorias);
    filtros.innerHTML = cats.map(function (c) {
      return '<button data-cat="' + esc(c.id) + '" class="' + (c.id === actual ? "activo" : "") + '">' + esc(c.nombre) + "</button>";
    }).join("");
  }

  function pintarGrilla() {
    var lista = datos.productos.filter(function (p) { return actual === "todos" || p.categoria === actual; });
    if (!lista.length) { grilla.innerHTML = '<p class="vacio">No hay productos en esta categoría todavía.</p>'; return; }
    var nombres = {};
    datos.categorias.forEach(function (c) { nombres[c.id] = c.nombre; });
    grilla.innerHTML = lista.map(function (p) {
      return '<a class="item" href="producto.html?id=' + encodeURIComponent(p.id) + '">' +
        '<div class="arco"><img src="' + RUTA_IMG + esc(p.imagenes[0]) + '" alt="' + esc(p.nombre) + '" loading="lazy" ' +
        "onerror=\"this.parentElement.classList.add('sin-imagen');this.remove()\"></div>" +
        "<h3>" + esc(p.nombre) + "</h3><small>" + esc(nombres[p.categoria] || "") + "</small></a>";
    }).join("");
  }

  filtros.addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b) return;
    actual = b.dataset.cat;
    pintarFiltros();
    pintarGrilla();
  });

  fetch("data/productos.json")
    .then(function (r) { return r.json(); })
    .then(function (d) {
      datos = d;
      var cat = new URLSearchParams(location.search).get("cat");
      if (cat) actual = cat;
      pintarFiltros();
      pintarGrilla();
    })
    .catch(function () {
      grilla.innerHTML = '<p class="vacio">No se pudo cargar el catálogo. Si abriste el archivo directamente, usa un servidor local (ver README).</p>';
    });
})();
