(function () {
  "use strict";

  var SITIO = window.SITIO || {};
  var PRODUCTOS = window.PRODUCTOS || [];
  var TIENDAS = window.TIENDAS || [];

  document.documentElement.classList.add("js");

  // ---------- Helpers ----------
  function el(tag, props, children) {
    var n = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      if (k === "class") n.className = props[k];
      else if (k === "text") n.textContent = props[k];
      else n.setAttribute(k, props[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }

  function icono(path) {
    var ns = "http://www.w3.org/2000/svg";
    var s = document.createElementNS(ns, "svg");
    s.setAttribute("viewBox", "0 0 24 24");
    s.setAttribute("fill", "none");
    s.setAttribute("stroke", "currentColor");
    s.setAttribute("stroke-width", "2");
    s.setAttribute("stroke-linecap", "round");
    s.setAttribute("stroke-linejoin", "round");
    s.setAttribute("aria-hidden", "true");
    var p = document.createElementNS(ns, "path");
    p.setAttribute("d", path);
    s.appendChild(p);
    return s;
  }

  var ICON = {
    pin: "M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11zM12 12a2 2 0 100-4 2 2 0 000 4z",
    reloj: "M12 7v5l3 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    tel: "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
    flecha: "M5 12h14M13 6l6 6-6 6"
  };

  function normalizar(t) {
    return String(t || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }

  function urlMapa(t) {
    if (t.mapa) return t.mapa;
    var q = [t.nombre, t.direccion, t.ciudad, SITIO.estado, "México"].filter(Boolean).join(", ");
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  }

  // ---------- Menú móvil ----------
  var toggle = document.querySelector(".nav__toggle");
  var links = document.getElementById("menu");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var abierto = links.classList.toggle("abierto");
      toggle.setAttribute("aria-expanded", String(abierto));
      toggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("abierto");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menú");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && links.classList.contains("abierto")) {
        links.classList.remove("abierto");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // ---------- Contacto desde SITIO ----------
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    var msg = a.getAttribute("data-wa") || "";
    a.href = "https://wa.me/" + SITIO.whatsapp + (msg ? "?text=" + encodeURIComponent(msg) : "");
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.querySelectorAll("[data-tel]").forEach(function (a) {
    a.href = "tel:+" + SITIO.whatsapp;
    a.textContent = SITIO.telefono;
  });
  document.querySelectorAll("[data-email]").forEach(function (a) {
    a.href = "mailto:" + SITIO.email;
    a.textContent = SITIO.email;
  });
  ["instagram", "facebook"].forEach(function (red) {
    document.querySelectorAll('[data-red="' + red + '"]').forEach(function (li) {
      if (SITIO[red]) {
        var a = li.querySelector("a");
        a.href = SITIO[red];
        a.target = "_blank";
        a.rel = "noopener";
      } else {
        li.remove();
      }
    });
  });
  document.querySelectorAll("[data-anio]").forEach(function (n) { n.textContent = new Date().getFullYear(); });

  // ---------- Productos (home) ----------
  var contProd = document.getElementById("productos-lista");
  if (contProd) {
    PRODUCTOS.forEach(function (p) {
      // Los precios no se publican: se cotizan por WhatsApp según el tipo de cliente y la ciudad.
      var pedir = el("a", {
        class: "btn",
        href: "https://wa.me/" + SITIO.whatsapp + "?text=" + encodeURIComponent("Hola, quiero pedir Chorizo Oscar's " + p.peso.toLowerCase() + ". Mi ciudad es: "),
        target: "_blank",
        rel: "noopener",
      }, [document.createTextNode("Pedir por WhatsApp")]);
      var card = el("article", { class: "etiqueta-prod rev" }, [
        p.ejemplo ? el("span", { class: "marca-ejemplo", text: "Ejemplo" }) : null,
        p.foto ? el("img", { class: "etiqueta-prod__foto", src: p.foto, alt: p.fotoAlt || "", width: "900", height: "675", loading: "lazy" }) : null,
        el("div", { class: "etiqueta-prod__cuerpo" }, [
          el("p", { class: "etiqueta etiqueta-prod__peso", text: p.peso }),
          el("h3", { text: p.nombre }),
          el("p", { text: p.descripcion }),
          el("div", { class: "etiqueta-prod__pedir" }, [pedir]),
        ]),
      ]);
      contProd.appendChild(card);
    });
  }

  // ---------- Dónde comprar: vista previa en el home ----------
  var fachadas = document.getElementById("fachadas");
  if (fachadas) {
    TIENDAS.filter(function (t) { return t.foto; }).slice(0, 3).forEach(function (t) {
      fachadas.appendChild(el("figure", { class: "fachada rev" }, [
        el("img", { src: t.foto, alt: "Fachada de " + t.nombre + " con una cazuela de Oscar's Chorizo", width: "1140", height: "855", loading: "lazy" }),
        el("figcaption", {}, [el("strong", { text: t.nombre }), el("span", { text: t.ciudad })]),
      ]));
    });
    var cuenta = document.getElementById("tiendas-cuenta");
    if (cuenta) cuenta.textContent = TIENDAS.length;
  }

  // ---------- Directorio completo ----------
  var grid = document.getElementById("tiendas-grid");
  if (grid) {
    var busqueda = document.getElementById("buscar");
    var chipsBox = document.getElementById("chips");
    var contador = document.getElementById("contador");
    var ciudadActiva = "";

    var ciudades = [];
    TIENDAS.forEach(function (t) { if (t.ciudad && ciudades.indexOf(t.ciudad) < 0) ciudades.push(t.ciudad); });
    ciudades.sort(function (a, b) { return a.localeCompare(b, "es"); });

    function chip(label, valor) {
      var b = el("button", { class: "chip", type: "button", "aria-pressed": String(valor === ciudadActiva), text: label });
      b.addEventListener("click", function () {
        ciudadActiva = valor;
        chipsBox.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
        b.setAttribute("aria-pressed", "true");
        pintar();
      });
      return b;
    }
    chipsBox.appendChild(chip("Todas", ""));
    ciudades.forEach(function (c) { chipsBox.appendChild(chip(c, c)); });

    function tarjeta(t) {
      var datos = el("ul", { class: "tienda__datos" }, [
        (t.direccion || t.ciudad) ? el("li", {}, [icono(ICON.pin), el("span", { text: [t.direccion, t.ciudad].filter(Boolean).join(", ") })]) : null,
        t.horario ? el("li", {}, [icono(ICON.reloj), el("span", { text: t.horario })]) : null,
        t.telefono ? el("li", {}, [icono(ICON.tel), el("a", { href: "tel:" + t.telefono.replace(/[^\d+]/g, ""), text: t.telefono })]) : null,
      ]);
      var cta = el("a", { class: "btn", href: urlMapa(t), target: "_blank", rel: "noopener" }, [
        document.createTextNode("Cómo llegar"), icono(ICON.flecha),
      ]);
      return el("article", { class: "tienda" }, [
        t.ejemplo ? el("span", { class: "marca-ejemplo", text: "Ejemplo" }) : null,
        t.foto
          ? el("img", { class: "tienda__foto", src: t.foto, alt: "Fachada de " + t.nombre + " con una cazuela de Oscar's Chorizo", width: "1140", height: "855", loading: "lazy" })
          : el("div", { class: "tienda__sin-foto", "aria-hidden": "true" }, [el("img", { src: "assets/brand/svg/logo-oro.svg", alt: "", width: "120", height: "120", loading: "lazy" })]),
        el("div", { class: "tienda__cuerpo" }, [
          t.tipo ? el("p", { class: "etiqueta tienda__tipo", text: t.tipo }) : null,
          el("h3", { text: t.nombre }),
          datos,
          cta,
        ]),
      ]);
    }

    function tarjetaCta() {
      var a = el("a", { class: "btn", "data-wa": "Hola, quiero vender Oscar's Chorizo en mi negocio." }, [document.createTextNode("Escríbenos")]);
      a.href = "https://wa.me/" + SITIO.whatsapp + "?text=" + encodeURIComponent("Hola, quiero vender Oscar's Chorizo en mi negocio.");
      a.target = "_blank";
      a.rel = "noopener";
      return el("article", { class: "tienda tienda--cta" }, [
        el("h3", { text: "¿Tienes un negocio?" }),
        el("p", { text: "Vende Oscar's Chorizo y suma un producto que sí regresa a pedir." }),
        a,
      ]);
    }

    function pintar() {
      var q = normalizar(busqueda.value.trim());
      var lista = TIENDAS.filter(function (t) {
        if (ciudadActiva && t.ciudad !== ciudadActiva) return false;
        if (!q) return true;
        return normalizar([t.nombre, t.tipo, t.ciudad, t.direccion].join(" ")).indexOf(q) >= 0;
      });
      grid.textContent = "";
      lista.forEach(function (t) { grid.appendChild(tarjeta(t)); });
      if (!lista.length) {
        grid.appendChild(el("div", { class: "vacio" }, [
          el("h3", { text: "No encontramos tiendas con ese filtro" }),
          el("p", { text: "Prueba con otra ciudad o escríbenos por WhatsApp y te decimos dónde conseguirlo." }),
        ]));
      } else {
        grid.appendChild(tarjetaCta());
      }
      contador.textContent = lista.length + (lista.length === 1 ? " punto de venta" : " puntos de venta");
    }
    busqueda.addEventListener("input", pintar);
    pintar();
  }

  // ---------- Revelado al hacer scroll ----------
  var rev = document.querySelectorAll(".rev");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("visto"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    rev.forEach(function (n) { io.observe(n); });
  } else {
    rev.forEach(function (n) { n.classList.add("visto"); });
  }
})();
