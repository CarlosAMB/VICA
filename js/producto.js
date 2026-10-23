(function () {
  var RUTA_IMG = "assets/img/productos/";
  var cont = document.getElementById("contenido");
  var id = new URLSearchParams(location.search).get("id");

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var fallo = "onerror=\"this.parentElement.classList.add('sin-imagen');this.remove()\"";

  function noEncontrado() {
    cont.innerHTML = '<div class="pagina-titulo"><h1>Producto no encontrado</h1><p><a href="catalogo.html">Volver al catálogo</a></p></div>';
  }

  fetch("data/productos.json")
    .then(function (r) { return r.json(); })
    .then(function (d) {
      var p = d.productos.find(function (x) { return x.id === id; });
      if (!p) return noEncontrado();
      var cat = d.categorias.find(function (c) { return c.id === p.categoria; });
      document.title = p.nombre + " | Vica Floristería";

      var fotos = p.imagenes.length > 1
        ? '<div class="scroll-fotos" tabindex="0" aria-label="Fotos de ' + esc(p.nombre) + '">' + p.imagenes.map(function (im, i) {
            return '<img src="' + RUTA_IMG + esc(im) + '" alt="' + esc(p.nombre) + " - foto " + (i + 1) + '"' + (i ? ' loading="lazy"' : "") + ">";
          }).join("") + "</div>"
        : '<img src="' + RUTA_IMG + esc(p.imagenes[0]) + '" alt="' + esc(p.nombre) + '" ' + fallo + ">";

      var enlace = new URL("producto.html?id=" + encodeURIComponent(p.id), location.href).href;
      var msg = "Hola Vica, me interesa: " + p.nombre + "\n" + enlace;
      var rel = d.productos.filter(function (x) { return x.categoria === p.categoria && x.id !== p.id; }).slice(0, 4);

      cont.innerHTML =
        '<section class="detalle">' +
          '<div class="galeria"><div class="arco">' + fotos + "</div></div>" +
          "<div>" +
            '<span class="cat">' + esc(cat ? cat.nombre : "") + "</span>" +
            "<h1>" + esc(p.nombre) + "</h1>" +
            '<p class="descripcion">' + esc(p.descripcion) + "</p>" +
            '<div class="acciones"><a class="btn" target="_blank" rel="noopener" href="' + VICA.waLink(msg) + '">Pedir por WhatsApp</a>' +
            '<a class="btn sec" href="catalogo.html">Volver al catálogo</a></div>' +
          "</div>" +
        "</section>" +
        (rel.length ? '<section class="relacionados"><h2>También te puede gustar</h2><div class="grilla">' + rel.map(function (x) {
          return '<a class="item" href="producto.html?id=' + encodeURIComponent(x.id) + '"><div class="arco"><img src="' + RUTA_IMG + esc(x.imagenes[0]) + '" alt="' + esc(x.nombre) + '" loading="lazy" ' + fallo + "></div><h3>" + esc(x.nombre) + "</h3></a>";
        }).join("") + "</div></section>" : "");
    })
    .catch(noEncontrado);
})();
