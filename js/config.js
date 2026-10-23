// Datos del negocio: cambiar aquí y se actualiza todo el sitio.
window.VICA = {
  nombre: "Vica Floristería",
  // Número del logo: 7632-6603. Código de país 503 (El Salvador), confirmado.
  telefonoLocal: "76326603",
  codigoPais: "503",
  facebook: "https://www.facebook.com/share/19bBPhiMf1/",
  instagram: "https://www.instagram.com/floristeria_vica",
  tiktok: "https://www.tiktok.com/@floristeria.vica4",
  waLink(mensaje) {
    const base = "https://wa.me/" + this.codigoPais + this.telefonoLocal;
    return mensaje ? base + "?text=" + encodeURIComponent(mensaje) : base;
  }
};
