const buscarInput = document.getElementById("buscar");
const productos = document.getElementsByClassName("producto");
const footer = document.querySelector(".pie");
const siguienteInput = document.getElementById("siguiente");
const anteriorInput = document.getElementById("anterior");
const h3Element = document.getElementById("numero-pagina");
const cruz = document.getElementById("borrar-busquedad");
const filtroBorrar = document.getElementById("borrar-filtros");
var arregloProductos = [];
const divTotal = document.createElement("div");

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


/*EL BUCLE FOR EACH RECORRE TODOS LOS PRODUCTOS COLOCADOS EN LA PÁGINA, Y CUANDO EN ALGUNO DE ELLOS SE APRETA EL BOTÓN "AGREGAR AL CARRITO" 
DE UN PRODUCTO, SE CREA UN NUEVO ELEMENTO EN LA SECCIÓN DEL CARRITO QUE CONTIENE LA INFORMACIÓN DE ESE PRODUCTO. DE ESTA MANERA, SE VA 
CONSTRUYENDO DINÁMICAMENTE EL CONTENIDO DEL CARRITO A MEDIDA QUE SE VAN AGREGANDO PRODUCTOS.*/

window.addEventListener('DOMContentLoaded', (event) => {
  const apiURL = "https://mateocunsolo.pythonanywhere.com/productos";

  // Realizar solicitud a la API
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      // Manipular los datos obtenidos de la API
      const productosContainer = document.querySelector(".productos");

      data.forEach((producto) => {
        // Crear un nuevo elemento <div> con la clase "producto"
        const productoElement = document.createElement("div");
        productoElement.classList.add("producto");

        // Crear elementos internos para mostrar los valores del producto
        const imagenElement = document.createElement("img");
        imagenElement.src = producto.imagen;

        const nombreElement = document.createElement("h3");
        nombreElement.textContent = producto.descripcion;

        const cantidadElement = document.createElement("h5");
        let mensaje = "";
        if (producto.cantidad > 1) {
          mensaje = "Stock disponible";
        } else if (producto.cantidad === 1) {
          mensaje = "Último disponible!";
        } else {
          mensaje = "No disponible";
        }
        cantidadElement.textContent = mensaje;
        
        const cantidadValor = document.createElement("h6");
        cantidadValor.textContent = producto.cantidad;

        const precioElement = document.createElement("p");
        precioElement.textContent = producto.precio;
        

        const carritoButton = document.createElement("button");
        carritoButton.classList.add("carrito");
        carritoButton.textContent = "Agregar al carrito";

        // Agregar elementos internos al elemento producto
        productoElement.appendChild(imagenElement);
        productoElement.appendChild(nombreElement);
        productoElement.appendChild(precioElement);
        productoElement.appendChild(cantidadElement);
        productoElement.appendChild(carritoButton);
        productoElement.appendChild(cantidadValor);
        cantidadValor.style.display = "none";

        // Agregar el elemento producto al contenedor de productos
        if (mensaje !== "No disponible") {
          productosContainer.appendChild(productoElement);
        }
      });


      
      const botonesCarrito = document.querySelectorAll(".carrito");
      botonesCarrito.forEach((boton) => {
          boton.addEventListener("click", (event) => {
            boton.disabled = true;
            const contadorCarrito = document.querySelector("#contadorCarrito");
            contadorCarrito.textContent = contarHijosSeccionCarrito();
            contadorCarrito.style.color = "RED";

            const contenedorProducto = boton.closest(".producto");
            const nombreProducto = contenedorProducto.querySelector("h3").textContent;
            var precioProducto = contenedorProducto.querySelector("p").textContent;
            const imagenProducto = contenedorProducto.querySelector("img").src;
            var cantidad = contenedorProducto.querySelector("h6").textContent;
            let contador = 1;

            const infoProducto = document.createElement("div");
            infoProducto.classList.add("producto-carrito");
            infoProducto.innerHTML = `
                              <img src="${imagenProducto}">
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
            
            
            
            // SUMA el precio total por producto dependiendo cuantos items tenga incluido, y si ya le dimos comprar y restamos un producto, tambien se actualiza el valor total de la compra
            const botonSumar = infoProducto.querySelector(".boton-sumar");
            botonSumar.addEventListener("click", (event) => {
              if ( contador != cantidad) {
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
                confirmar.querySelector("p").textContent =
                  "Precio total del carrito: $" + carritoTotal;
              } else { alert("STOCK NO DISPONIBLE") }


            });

            // RESTA el precio total por producto dependiendo cuantos items tenga incluido, y si ya le dimos comprar y restamos un producto, tambien se actualiza el valor total de la compra
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
                boton.disabled = false;
              }

              let carritoTotal = 0;
              for (let i = 0; i < arregloProductos.length; i++) {
                let elementoP = arregloProductos[i].querySelector("p");
                let contenidoP = elementoP.textContent;
                carritoTotal = carritoTotal + parseFloat(contenidoP.replace("$", ""));
              }

              const confirmar = document.querySelector("#confirmar");
              confirmar.querySelector("p").textContent =
                "Precio total del carrito: $" + carritoTotal;
            });
          });
        
      });


      ///click en comprar y nos muestra el valor final y nos sale un boton nuevo que dice "confirmar compra" para pasar a la pagina de confirmacion
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

        //cuando le damos a confirmar compra, se guarda el carrito en el local storage,
        //para despues poder acceder desde el otro html a los prodctos que cargo el cliente en el carrito final
        const botonConfirmar = document.querySelector("#btn-confirmar");
        botonConfirmar.addEventListener("click", () => {
          //si hay prodcutos en el carrito se pasa al local storage, si no los hay se muestra en alerta "Carrito vacio, porfavor ingresa productos"
          if (carritoTotal != 0) {
            let productosFinales = []; // Declarar el arreglo de productosFinales
            for (let i = 0; i < arregloProductos.length; i++) {
              // Acceder al contenido de cada etiqueta (descripción del producto y su precio)
              let nombre = arregloProductos[i].querySelector("h6");
              let precio = arregloProductos[i].querySelector("p");
              let img = arregloProductos[i].querySelector("img");

              let objeto = {
                articulo: nombre.textContent,
                precio: precio.textContent,
                imagen: img.src,
              };
              // Agregar objeto al arreglo productosFinales
              productosFinales[i] = objeto;
            }
            // Convertir el arreglo a un JSON
            let objetoJSON = JSON.stringify(productosFinales);
            // Almacenar el arreglo completo en el localStorage
            localStorage.setItem("productos", objetoJSON);
            // Redireccionar hacia la página "confirmar-compra.html"
            window.location.href = "confirmar-compra.html";
          }
          else {
            alert("Carrito vacio, porfavor ingresa productos");
          }
        });
      });

      const botonEliminar = document.querySelector("#boton-eliminar");
      botonEliminar.addEventListener("click", (event) => {
        const seccion = document.querySelector("#seccion-carrito");
        let i = seccion.children.length;
        while (seccion.children[i - 1] && i > 1) {
          //ELIMINO LOS HIJOS (PRODUCTOS) DE LA SEECCION CARRITO
          seccion.removeChild(seccion.lastChild);
          i--;
        }

        contadorCarrito.textContent = 0;
        contadorCarrito.style.color = "white";
        arregloProductos.splice(0, arregloProductos.length); //BORRO EL ARREGLO, PARA QUE SE RENICIE EL CARRITO Y EL VALOR TOTAL
      });


      const carritoEnCelu = document.querySelector("#carritoEnCelu");
      let clickeado = false;
      carritoEnCelu.addEventListener("click", function () {
        clickeado = !clickeado; // Cambiar el valor de clickeado a su opuesto
        const seccionCarritoCelu = document.querySelector(".nav");
        carritoEnCelu.style.marginLeft = "15px";
        if (clickeado) {
          carritoEnCelu.style.border = "solid red"
          carritoEnCelu.style.borderRadius = "3px";
          const scrollTopPos = window.scrollY + 40;
          seccionCarritoCelu.style.marginTop = `${scrollTopPos}px`;
          seccionCarritoCelu.style.display = "block";
          seccionCarritoCelu.style.position = "absolute";
          seccionCarritoCelu.style.background = "white";
          seccionCarritoCelu.style.border = "solid black";
        } else {
          seccionCarritoCelu.style.display = "none";
          carritoEnCelu.style.border = "solid  #69c7ca";
          carritoEnCelu.style.borderRadius = "3px";
        }
      });

      function contarHijosSeccionCarrito() {
        const seccionDestino = document.querySelector("#seccion-carrito");
        var cantidadHijos = seccionDestino.childElementCount;
        return cantidadHijos;
      }


    })
    .catch(error => {
      console.error('Error:', error);
    });
});



