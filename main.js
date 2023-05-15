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

// ocultar productos pag2 y pag3... asi quedan solo los de la pag1const h3Element = document.getElementById("numero-pagina");
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



const botonesCarrito = document.querySelectorAll(".carrito");
var arregloProductos = [];
const divTotal = document.createElement("div");

botonesCarrito.forEach((boton) => {
  boton.addEventListener("click", (event) => {
    const contenedorProducto = boton.closest(".producto");
    const nombreProducto = contenedorProducto.querySelector("h3").textContent;
    var precioProducto = contenedorProducto.querySelector("p").textContent;
    const imagenProducto = contenedorProducto.querySelector("img").src;
    let contador = 1;


    const infoProducto = document.createElement("div");
    infoProducto.classList.add("producto-carrito");
    infoProducto.innerHTML = `
    <img src="${imagenProducto}" alt="${nombreProducto}">
    <h6>${nombreProducto}</h6>
    <p>${"$" + precioProducto}</p>
    <button class="boton-sumar">+</button>
    <button class="boton-restar">-</button>
    <h6>${contador}</h6>
  	`;
    arregloProductos.push(infoProducto);
    const seccionDestino = document.querySelector("#seccion-carrito");
    seccionDestino.appendChild(infoProducto);


    divTotal.style.display = "none";

    const botonSumar = infoProducto.querySelector(".boton-sumar");
    botonSumar.addEventListener("click", (event) => {

      var precio = infoProducto.querySelector("p");
      var contadorDiv = infoProducto.querySelector("h6:last-of-type");

      contador = contador + 1;
      let precioTotal = contador * parseFloat(precioProducto);

      contadorDiv.textContent = contador;
      precio.textContent = "$" + precioTotal;
      let carritoTotal = 0;
      for (let i = 0; i < arregloProductos.length; i++) {
        let elementoP = arregloProductos[i].querySelector("p");
        let contenidoP = elementoP.textContent;
        carritoTotal += parseFloat(contenidoP.replace("$", ""));
      }

      const confirmar = document.querySelector("#confirmar");
      confirmar.querySelector("p").textContent = "Precio total del carrito: $" + carritoTotal;

    });


    const botonRestar = infoProducto.querySelector(".boton-restar");
    botonRestar.addEventListener("click", (event) => {

      var precio = infoProducto.querySelector("p");
      var contadorDiv = infoProducto.querySelector("h6:last-of-type");

      contador = contador - 1;
      let precioTotal = contador * parseFloat(precioProducto);

      contadorDiv.textContent = contador;
      precio.textContent = "$" + precioTotal;


      if (contador < 1) {
        let index = arregloProductos.indexOf(infoProducto);
        arregloProductos.splice(index, 1);
        infoProducto.remove();
      }
      

      let carritoTotal = 0;
      for (let i = 0; i < arregloProductos.length; i++) {
        let elementoP = arregloProductos[i].querySelector("p");
        let contenidoP = elementoP.textContent;
        carritoTotal = carritoTotal + parseFloat(contenidoP.replace("$", ""));
        alert(i);
      }

      const confirmar = document.querySelector("#confirmar");
      confirmar.querySelector("p").textContent = "Precio total del carrito: $" + carritoTotal;


    });

  });
});


const botonComprar = document.querySelector("#boton-comprar");
botonComprar.addEventListener("click", (event) => {
  
    let carritoTotal = 0;
    for (let i = 0; i < arregloProductos.length; i++) {
    let elementoP = arregloProductos[i].querySelector("p");
    let contenidoP = elementoP.textContent;
    carritoTotal += parseFloat(contenidoP.replace("$", ""));
    }

    divTotal.style.display = "Block";
    divTotal.id = "confirmar";
    divTotal.innerHTML = `
      <p>${"Precio total del carrito: $" + carritoTotal}</p>
      <button id="btn-confirmar"> Confirmar comprar </button>
    `;

    const seccionDestino = document.querySelector("#seccion-carrito");
    seccionDestino.appendChild(divTotal);

    const botonConfirmar = document.querySelector("#btn-confirmar");
    botonConfirmar.addEventListener("click", () => {
    window.location.href = "confirmar-compra.html";
    ///crear aca el sildebar y main de confirmar.compra.html
    });

});

const botonEliminar = document.querySelector("#boton-eliminar");
botonEliminar.addEventListener("click", (event) => {
  const seccion = document.querySelector("#seccion-carrito");
  let i = seccion.children.length;
  while ((seccion.children[i - 1]) && (i > 1)) { //ELIMINO LOS HIJOS (PRODUCTOS) DE LA SEECCION CARRITO
    seccion.removeChild(seccion.lastChild);
    i--;
  }
  arregloProductos.splice(0, arregloProductos.length); //BORRO EL ARREGLO, PARA QUE SE RENICIE EL CARRITO Y EL VALOR TOTAL
});