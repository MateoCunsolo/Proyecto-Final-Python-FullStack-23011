const buscarInput = document.getElementById("buscar");
const productos = document.getElementsByClassName("producto");
const footer = document.querySelector(".pie");
const siguienteInput = document.getElementById("siguiente");
const anteriorInput = document.getElementById("anterior");
const h3Element = document.getElementById("numero-pagina");
const cruz = document.getElementById("borrar-busquedad");
const filtroBorrar = document.getElementById("borrar-filtros");

buscarInput.addEventListener("input", function () {
  const searchTerm = buscarInput.value.toLowerCase();
  Array.from(productos).forEach(function (producto) {
    const nombreProducto = producto
      .getElementsByTagName("h3")[0]
      .textContent.toLowerCase();
    if (nombreProducto.includes(searchTerm) && searchTerm.length >= 3) {
      producto.style.display = "Block";
      footer.style.display = "none";
    } else {
      producto.style.display = "none";
      footer.style.display = "none";
    }
    if (searchTerm == "") {
      footer.style.display = "flex";
      h3Element.textContent = "1 de 3";
      mostrarElementosPorClase("pag1");
      ocultarElementosPorClase("pag2");
      ocultarElementosPorClase("pag3");
    }
  });
});

///al apretar la cruz roja, llama al afuncion buscarInput
cruz.addEventListener("click", function () {
  buscarInput.value = "";
  buscarInput.dispatchEvent(new Event("input"));
});

// ocultar productos por clase
function ocultarElementosPorClase(clase) {
  const elementos = document.getElementsByClassName(clase);
  for (let i = 0; i < elementos.length; i++) {
    elementos[i].style.display = "none";
  }
}

// mostrar prodcutos por clase
function mostrarElementosPorClase(clase) {
  const elementos = document.getElementsByClassName(clase);
  for (let i = 0; i < elementos.length; i++) {
    elementos[i].style.display = "block";
  }
}

// ocultar productos pag2 y pag3... asi quedan solo los de la pag1
ocultarElementosPorClase("pag2");
ocultarElementosPorClase("pag3");
anteriorInput.style.display = "none";

// footer siguiente y anterior
siguienteInput.addEventListener("click", function () {
  if (h3Element.textContent === "1 de 3") {
    ocultarElementosPorClase("pag1");
    mostrarElementosPorClase("pag2");
    anteriorInput.style.display = "Block";
    h3Element.textContent = "2 de 3";
  } else if (h3Element.textContent === "2 de 3") {
    ocultarElementosPorClase("pag2");
    mostrarElementosPorClase("pag3");
    anteriorInput.style.display = "Block";
    siguienteInput.style.display = "none";
    h3Element.textContent = "3 de 3";
  }
});

anteriorInput.addEventListener("click", function () {
  if (h3Element.textContent === "2 de 3") {
    ocultarElementosPorClase("pag2");
    mostrarElementosPorClase("pag1");
    h3Element.textContent = "1 de 3";
    anteriorInput.style.display = "none";
    siguienteInput.style.display = "Block";
  } else if (h3Element.textContent === "3 de 3") {
    ocultarElementosPorClase("pag3");
    mostrarElementosPorClase("pag2");
    h3Element.textContent = "2 de 3";
    anteriorInput.style.display = "Block";
    siguienteInput.style.display = "Block";
  }
});


///-------FILTROS--------------

//ALIMENTOS
document.getElementById("alimentos").addEventListener("click", function () {
  ocultarElementosPorClase("F-juguetes");
  ocultarElementosPorClase("F-varios");
  ocultarElementosPorClase("F-estetica");
  mostrarElementosPorClase("F-alimentos");
  footer.style.display = "none";
});

//JUGETES
document.getElementById("juguetes").addEventListener("click", function () {
  ocultarElementosPorClase("F-alimentos");
  ocultarElementosPorClase("F-varios");
  ocultarElementosPorClase("F-estetica");
  mostrarElementosPorClase("F-juguetes");
  footer.style.display = "none";
});

//VARIOS
document.getElementById("varios").addEventListener("click", function () {
  ocultarElementosPorClase("F-juguetes");
  ocultarElementosPorClase("F-alimentos");
  ocultarElementosPorClase("F-estetica");
  mostrarElementosPorClase("F-varios");
  footer.style.display = "none";
  
});

//ESTETICA
document.getElementById("estetica").addEventListener("click", function () {
  ocultarElementosPorClase("F-juguetes");
  ocultarElementosPorClase("F-varios");
  ocultarElementosPorClase("F-alimentos");
  mostrarElementosPorClase("F-estetica");
  footer.style.display = "none";
});

//eliminar filtro

filtroBorrar.addEventListener("click", function () {
  buscarInput.value = "";
  buscarInput.dispatchEvent(new Event("input"));
});


