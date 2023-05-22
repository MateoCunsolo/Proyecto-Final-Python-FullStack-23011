// Configurar las credenciales de la API de Mercado Pago (Node.js)
mercadopago.configure({
    access_token: 'TEST-2181120831952739-052118-e946b2aec90c69011bc92f78ed730141-1030700738', 
  });
  
 // Cargar el SDK de Mercado Pago (navegador)
const script = document.createElement('script');
script.src = 'https://sdk.mercadopago.com/js/v2';
document.body.appendChild(script);

// Esperar a que el SDK se cargue
script.onload = function () {
  // Configurar las credenciales de Mercado Pago (navegador)
  Mercadopago.setPublishableKey('TEST-f1f62a0a-c5c9-44c3-8182-23acc2863728');

  // Obtener referencia al botón de "Continuar"
  const continuarBtn = document.querySelector('.end');

  // Agregar un event listener al botón de "Continuar"
  continuarBtn.addEventListener('click', function () {
    // Crear una preferencia de pago
    Mercadopago.createPreference({
      items: [
        {
          title: 'Producto de ejemplo',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: 100,
        }
      ],
      payer: {
        name: 'Nombre del comprador',
        email: 'ejemplo@correo.com',
      }
    }, function (response) {
      // Obtener la URL de pago
      const paymentUrl = response.response.init_point;

      // Redireccionar al usuario a la página de pago
      window.location.href = paymentUrl;
    });
  });
};
