//---------------------------------------------------------------------------CARRITO MUESTRA DE PRODUCTOS Y COSTO DE ENVIO-------------------------------------------------------
// nos traemos el carrito desde localStorage lo pasamos de json a jscript y
// mostramos el carrito en la pagina, en la seccion carritoFin
const carritoFin = document.querySelector("#carritoFin");
let carrito = localStorage.getItem("productos");

if (carrito) {
  carrito = JSON.parse(carrito);

  //CREO TITULO -> RESUMEN DE COMPRA
  let titulo = document.createElement("div");
  titulo.classList.add("titulo");
  titulo.innerHTML = `
      <h3>${"Resumen de compra"}</h3>
    `;
  carritoFin.appendChild(titulo);

  //CREO PRECIO TOTAL (SUMANDO TODOS LOS PRECIOS DE LOS PRODUCTOS DEL CARRITO) -> LO AGREGO AL FINAL COMO ULTIMO HIJO DE LA SECCION CARRITOFIN
  let precioTotal = document.createElement("div");
  precioTotal.classList.add("precioTotal");
  precioTotal.innerHTML = `
      <h4>${"Pagás: $" + sumarArreglo(carrito)}</h4>
    `;

  //RECORREMOS EL CARRITO QUE NOS TRAJIMOS DEL LOCAL STORAGE, Y CON ESOS DATOS CREAMOS UN DIV EN LA SECCION carritoFin QUE CONTIENE ( IMG DEL PRODUCTO + DIV(TITULO + PRECIO) )
  for (let i = 0; i < carrito.length; i++) {
    let divElement = document.createElement("div");
    divElement.classList.add("producto-carrito");
    let imgElement = document.createElement("img");
    imgElement.src = carrito[i].imagen;
    divElement.appendChild(imgElement);
    let infoElement = document.createElement("div");
    infoElement.classList.add("producto-info");
    infoElement.innerHTML = `
      <p>${carrito[i].articulo}</p>
      <p>${carrito[i].precio}</p>
    `;
    /*Se crea un div que contiene la imagen del producto + otro div que 
    contien la informacion del mismo (titulo + precio) */
    divElement.appendChild(infoElement);
    carritoFin.appendChild(divElement);
  }

  let envio = document.createElement("div");
  let imgElement = document.createElement("img");
  envio.classList.add("producto-carrito");
  imgElement.src = "camioncito.png";
  let infoElement = document.createElement("div");
  infoElement.classList.add("producto-info");
  infoElement.id = "costo-envio";
  infoElement.innerHTML = `
    <p>${"Costo de envio"}</p>
    <p>${"$0.0"}</p>
  `;

  //Se crea un div que contiene la imagen del envio y otro div que contien la informacion del mismo (titulo + precio)
  envio.appendChild(imgElement);
  envio.appendChild(infoElement);
  carritoFin.appendChild(envio);

  // Se agrega como ultimo hijo de la seccion carritoFin, al precio total, Pagas: $...
  carritoFin.appendChild(precioTotal);
}

//funcion para sumar arreglo.precios
function sumarArreglo(carrito) {
  let total = 0.0;
  for (let i = 0; i < carrito.length; i++) {
    total += parseFloat(carrito[i].precio.replace("$", ""));
  }
  return total;
}

// -----------------------------------------------------------------------------------CHECKsBOX-------------------------------------------------------------------------------------

// Esta procion de codigo no permite que ambos checkbox (1y2) esten marcados y que sucede si se ponene en true cada uno en particular
const checkbox1 = document.querySelector("#checkbox1");
const checkbox2 = document.querySelector("#checkbox2");
const contenido = document.querySelector(".contenido");

//declaro la cantidad de hijos que tiene carritoFin antes de que se aprete en algun checkbox
let hijosCarritoAntes = carritoFin.children.length;


//Iniciamos la pagina con checkbox2 que significa que el coste de envio es 0 y el cliente lo retirar por algun punto de encuentro o sucursal
checkbox2.checked = true;

// que sucede a marcar la casilla "checkbox1 -> Llegan entre 2 a 5 dias habiles a tu domicilio"
checkbox1.addEventListener("change", function () {
  if (this.checked) {
    checkbox2.checked = false;

    let ultimoHijo = contenido.lastChild;
    contenido.removeChild(ultimoHijo);

    ultimoHijo = contenido.lastChild;
    contenido.removeChild(ultimoHijo);


    /*verifica si la cantidad de hijos del elemento con ID "carritoFin" 
    ha aumentado desde un punto anterior. Si la cantidad de hijos ha aumentado, se selecciona y
    elimina el último hijo del elemento. Que aqui estaria eliminando el hijo que muestra los datos del cliente
    con los atributos de los input: quien retira por la sucursal principal*/
    let hijosCarritoDespues = carritoFin.children.length;
    if(hijosCarritoDespues > hijosCarritoAntes)
    {
      ultimoHijo = carritoFin.lastChild;
      carritoFin.removeChild(ultimoHijo);
    }
    


    //cambio el costo de envio de 0.0 a -> "$ Esperando codigo postal..." ya que todavia no se coloco el codigo postal para calcular el envio
    let envio = document.querySelector("#costo-envio");
    envio.innerHTML = `
    <p>${"$ Esperando codigo postal..."}</p>
     `;
    let ciudad = document.createElement("input");
    ciudad.classList.add("direccionCodeCity");
    ciudad.type = "text";
    ciudad.placeholder = "Ingrese su ciudad...";

    //crear la caja de texto, para que el cliente coloque su ciudad
    let direccionInput = document.createElement("input");
    direccionInput.classList.add("direccionCodeCity");
    direccionInput.type = "text";
    direccionInput.placeholder = "Ingrese su dirección...";

    //crear la caja de texto, para que el cliente coloque quien recibe el producto
    let nombreQuienRecibe = document.createElement("input");
    nombreQuienRecibe.classList.add("direccionCodeCity");
    nombreQuienRecibe.type = "text";
    nombreQuienRecibe.placeholder = "Ingrese nombre de quien recibe el paquete...";

    //crear el conteiner de codigoPostal, para que el cliente coloque su codigo postal(input) y si no lo sabe pueda consultarlo en el link(a) de correo argentino.
    let codigoPostalContainer = document.createElement("div");
    codigoPostalContainer.classList.add("codigoPostalContainer");
    let codigoPostalInput = document.createElement("input");
    codigoPostalInput.classList.add("direccionCodeCity");
    codigoPostalInput.type = "text";
    codigoPostalInput.placeholder = "Ingrese su código postal...";
    let calcularCodigoPostalLink = document.createElement("a");
    calcularCodigoPostalLink.href =
      "https://www.correoargentino.com.ar/formularios/cpa";
    calcularCodigoPostalLink.textContent = "Saber mi código postal";
    calcularCodigoPostalLink.target = "_blank";
    //agrega al conteiner del codigo postal hijos nuevos que son el input donde se espera el codigo postal del cliente y el element a, que te lleva a correo argentino
    codigoPostalContainer.appendChild(codigoPostalInput);
    codigoPostalContainer.appendChild(calcularCodigoPostalLink);

    //Se crea boton para poder calcular coste de envio, con los atributos (cidudad - direccio - codigo postal)
    let calcularCostoEnvio = document.createElement("button");
    calcularCostoEnvio.textContent = "Calcular costo de Envío";


    /*si al apretar el boton de "calcular costo de envio" y si el input de codigo postal,ciudad y direccion tienen contenido, se modifica el 
    costo de envio a $1500 en la seccion del carrito y en la checkbox1 se cambia "$ Esperando codigo postal" a -> $1500" Y ademas se muestran los datos del cliente
    en la seccion carritoFin */
    calcularCostoEnvio.addEventListener("click", function () {
      calcularCostoEnvio.disabled = true;

      let valorCPIngresado = codigoPostalInput.value;
      let ciudadIngresada = ciudad.value;
      let direccionIngresada = direccionInput.value;
      let nombreRecibeIngresada = nombreQuienRecibe.value;

      if (valorCPIngresado != "" && ciudadIngresada != "" && direccionIngresada != "") {
        let datosCliente = document.createElement("div");
        datosCliente.id = "datosCliente00";
        datosCliente.style.marginLeft = "20px";
        datosCliente.innerHTML = `
            <h3>${"------------[ ENVIO A DOMICILIO ]------------"}</h3>
            <p>${"CIUDAD: " + ciudadIngresada}</p>
            <p>${"DIRECCION: " + direccionIngresada}</p>
            <p>${"QUIEN RECIBE: " + nombreRecibeIngresada}</p>
            <p>${"CODIGO POSTAL: " + valorCPIngresado}</p>
          `;
        carritoFin.appendChild(datosCliente);

        calcularCostoEnvio.style.backgroundColor = "red";
        calcularCostoEnvio.style.color = "white";
        setTimeout(function () { calcularCostoEnvio.style.backgroundColor = "rgb(190, 190, 190)"; }, 2000);
        calcularCostoEnvio.textContent = "Ya calculado"; //cambia el texto del boton de "Calcular costo de Envío" -> "Ya calculado"

        let envio = document.querySelector("#costo-envio");
        envio.innerHTML = `
          <p>${"Costo de envio"}</p>
          <p>${"$1500"}</p>
       `;

        let precio = document.querySelectorAll(".precio");
        precio[0].innerHTML = `
          <p>${"$ 1500"}</p>
        `;

        //actualiza el precio del carrito sumandole el valor de 1500 correspondiente a lo que sale el envio
        let precioTotal = document.querySelector(".precioTotal");
        let precioXEnvio = 1500;
        let precioFinalCarrito = precioXEnvio + sumarArreglo(carrito);
        precioTotal.innerHTML = `
          <h4>${"Pagás: $" + precioFinalCarrito}</h4>
        `;
      }
    });

    // se agregan los hijos a la seccion contenido, en orden: direccion->codigoPostal->boton:CalcularCostoEnvio
    contenido.appendChild(ciudad);
    contenido.appendChild(direccionInput);
    contenido.appendChild(nombreQuienRecibe);
    contenido.appendChild(codigoPostalContainer);
    contenido.appendChild(calcularCostoEnvio);

  } else {
    checkbox2.checked = true;
  }
});


if (checkbox2.checked == true) {
  let quienRetira = document.createElement("input");
  quienRetira.classList.add("direccionCodeCity");
  quienRetira.type = "text";
  quienRetira.placeholder = "Nombre y apellido de quien retira el paquete...";
  contenido.appendChild(quienRetira);

  let cargarNombreQuienRetira = document.createElement("button");
  cargarNombreQuienRetira.textContent = "Aplicar";
  contenido.appendChild(cargarNombreQuienRetira);
  cargarNombreQuienRetira.addEventListener("click", function () {
    var flag = 0;
    let quienRetiraIngresa = quienRetira.value;
    if (quienRetiraIngresa != "") {
      let datosCliente = document.createElement("div");
      datosCliente.id = "datosCliente00";
      datosCliente.style.marginLeft = "20px";
      datosCliente.innerHTML = `
            <h3>${"------[ RETIRO POR SUCURSAL PRINCIPAL ]------"}</h3>
            <p>${"QUIEN RETIRA: " + quienRetiraIngresa}</p>
          `;
      carritoFin.appendChild(datosCliente);
      cargarNombreQuienRetira.style.backgroundColor = "red";
      cargarNombreQuienRetira.style.color = "white";
      setTimeout(function () { cargarNombreQuienRetira.style.backgroundColor = "rgb(190, 190, 190)"; }, 2000);
      cargarNombreQuienRetira.textContent = "Ya aplicado"; //cambia el texto del boton de "Calcular costo de Envío" -> "Ya calculado"
      cargarNombreQuienRetira.disabled = true;
    }
  })

}

// que sucede a marcar la casilla "checkbox2 -> Retiro en puntos cercanos o sucursal"
checkbox2.addEventListener("change", function () {
  if (this.checked) {
    checkbox1.checked = false;
    //se establece el costo de envio en valor $0.0
    let envio = document.querySelector("#costo-envio");
    envio.innerHTML = `
      <p>${"Costo de envio"}</p>
      <p>${"$0.0"}</p>
    `;

    /*al inicar marcada la pagina en este checkbox, sucedia que si despues cambiabamos a el otro checkbox1, 
    el cual crea 5 hijos al .contenido (ciudad - direccion - quien recibe - codigoPostal - boton:Calcular Costo Envio) y luego queriamos 
    pasar de nuevo al checkbox2 esos hijos iban a seguir estando entonces se utiliza removechild, por 5 veces para 
    eliminar esos 5 hijos que corresoponde al checkbox1 y no al 2.*/

    let ultimoHijo = contenido.lastChild;
    contenido.removeChild(ultimoHijo);
    ultimoHijo = contenido.lastChild;
    contenido.removeChild(ultimoHijo);
    ultimoHijo = contenido.lastChild;
    contenido.removeChild(ultimoHijo);
    ultimoHijo = contenido.lastChild;
    contenido.removeChild(ultimoHijo);
    ultimoHijo = contenido.lastChild;
    contenido.removeChild(ultimoHijo);


    /*verifica si la cantidad de hijos del elemento con ID "carritoFin" 
    ha aumentado desde un punto anterior. Si la cantidad de hijos ha aumentado, se selecciona y
    elimina el último hijo del elemento. Que aqui estaria eliminando el hijo que muestra los datos del cliente
    con los atributos de los input: ciudad, direccion, quien recibe, codigo postal, boton de calcular costo de envio*/
    let hijosCarritoDespues = carritoFin.children.length;
    if(hijosCarritoDespues > hijosCarritoAntes)
    {
      ultimoHijo = carritoFin.lastChild;
      carritoFin.removeChild(ultimoHijo);
    }

    let quienRetira = document.createElement("input");
    quienRetira.classList.add("direccionCodeCity");
    quienRetira.type = "text";
    quienRetira.placeholder = "Nombre y apellido de quien retira el paquete...";
    contenido.appendChild(quienRetira);

    let cargarNombreQuienRetira = document.createElement("button");
    cargarNombreQuienRetira.textContent = "Aplicar";
    contenido.appendChild(cargarNombreQuienRetira);
    cargarNombreQuienRetira.addEventListener("click", function () {
      let quienRetiraIngresa = quienRetira.value;
      if (quienRetiraIngresa != "") {
        let datosCliente = document.createElement("div");
        datosCliente.id = "datosCliente00";
        datosCliente.style.marginLeft = "20px";
        datosCliente.innerHTML = `
            <h3>${"------------[ RETIRO POR SUCURSAL PRINICPAL ]------------"}</h3>
            <p>${"QUIEN RETIRA: " + quienRetiraIngresa}</p>
          `;
        carritoFin.appendChild(datosCliente);
        cargarNombreQuienRetira.disabled = true;
      }
      cargarNombreQuienRetira.style.backgroundColor = "red";
      cargarNombreQuienRetira.style.color = "white";
      setTimeout(function () { cargarNombreQuienRetira.style.backgroundColor = "rgb(190, 190, 190)"; }, 2000);
      cargarNombreQuienRetira.textContent = "Ya aplicado"; //cambia el texto del boton de "Calcular costo de Envío" -> "Ya calculado"
      cargarNombreQuienRetira.disabled = true;
    })




    /*si se marca el primer checkbox y se coloca el codigo postal pero despues se arrepiente y 
    se marca el segundo checkbox, el precio total iba a quedar con los 1500 sumados de la opcion 
    "envio a domicilio". Por eso se necesita volver a sumar el valor de los productos 
    sin sumarle los 1500*/
    let precioTotal = document.querySelector(".precioTotal");
    precioTotal.innerHTML = `
    <h4>${"Pagás: $" + sumarArreglo(carrito)}</h4>
    `;

    //Se actualia el precio del checkbox1, si fue marcado antes iba a estar en 1500. Al marcar el checkbox 2, pasa de 1500 a -> "$ Esperando codigo postal..."
    let precio = document.querySelectorAll(".precio");
    precio[0].innerHTML = `
      <p>${"$ Esperando codigo postal..."}</p>
       `;
  } else {
    checkbox1.checked = true;
  }
});


const botonMercadoPago = document.querySelector("#mp-btn");
botonMercadoPago.addEventListener("click", function () {
  const datosCliente = document.querySelector("#datosCliente00");
  const informacion = datosCliente.innerHTML;
  alert(informacion);

  /* LA IDEA ACA ES MANDAR AL MAIL DE LA EMPRESA, LA ORDEN DE COMPRA (CON DATOS DEL CLIENTE YA SEA POR ENVIO O RETIRO EN SUCURSAL) 
  Y UTLIZAR LA API DE MERCADOPAGO PARA PODER REALIZAR EL PAGO*/
  
});





