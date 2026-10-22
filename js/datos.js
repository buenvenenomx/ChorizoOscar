/* ==========================================================================
   Datos editables del sitio. Aquí se cambia el contenido real sin tocar HTML.
   Los registros con `ejemplo: true` se muestran con la etiqueta "Ejemplo":
   bórralos (o quita esa línea) cuando captures los datos reales.
   ========================================================================== */

window.SITIO = {
  whatsapp: "526393980854",          // solo dígitos, con lada de país
  telefono: "639 398 0854",
  email: "hola@oscarschorizo.com",
  instagram: "",                     // ej. "https://instagram.com/tu_usuario" — vacío = no se muestra
  facebook: "https://www.facebook.com/profile.php?id=61583204005604",
  estado: "Chihuahua",               // se añade a la búsqueda de "Cómo llegar" cuando la tienda no trae enlace de mapa
};

/* Presentaciones. No se publican precios: el distribuidor y la venta directa (según ciudad) tienen precios distintos,
   así que cada tarjeta cotiza por WhatsApp. */
window.PRODUCTOS = [
  {
    nombre: "Chorizo norteño",
    peso: "En bola",
    descripcion: "Con la etiqueta de Oscar's Chorizo, listo para llevar.",
    foto: "assets/img/bola.webp",
    fotoAlt: "Cazuela de barro con bolas de chorizo Oscar's, cada una con su etiqueta",
  },
  {
    nombre: "Chorizo norteño",
    peso: "En rollo",
    descripcion: "Enrollado y listo para cortar a la medida.",
    foto: "assets/img/rollo-tarjeta.webp",
    fotoAlt: "Rollo de chorizo anaranjado visto de cerca",
  },
  {
    nombre: "Chorizo norteño",
    peso: "En paquete",
    descripcion: "Piezas empacadas, con etiqueta y WhatsApp de pedido.",
    foto: "assets/img/paquete.webp",
    fotoAlt: "Cinco piezas de chorizo empacadas en una cazuela de barro",
  },
];

/* Puntos de venta. Campos opcionales: foto, direccion, horario, telefono y `mapa`
   (enlace de Google Maps; si falta, se busca por nombre + ciudad). Solo se muestra lo que exista. */
window.TIENDAS = [
  { nombre: "Frutería Dany's", ciudad: "Cárdenas" },
  { nombre: "Super El Triángulo", ciudad: "Cárdenas", foto: "assets/img/tienda-el-triangulo.webp" },
  { nombre: "Quesería Los Chatos", ciudad: "Cárdenas", foto: "assets/img/tienda-los-chatos.webp" },
  { nombre: "Abarrotes La Escuadra", ciudad: "Cárdenas" },
  { nombre: "Super Store", ciudad: "Cárdenas" },
  { nombre: "Super Alser", ciudad: "Cárdenas" },
  { nombre: "Abarrotes Los Novillos", ciudad: "Cárdenas" },
  { nombre: "Abarrotes Jarvy", ciudad: "Cárdenas", foto: "assets/img/tienda-jarvy.webp" },
  { nombre: "Abarrotes Los Nogales", ciudad: "Meoqui" },
  { nombre: "Abarrotes Beltrán", ciudad: "Cárdenas" },
  { nombre: "Abarrotes La Sierra", ciudad: "Cárdenas" },
  { nombre: "Abarrotes El Huizache", ciudad: "Cárdenas" },
  { nombre: "Abarrotes Tierra Blanca", ciudad: "Cárdenas" },
];
