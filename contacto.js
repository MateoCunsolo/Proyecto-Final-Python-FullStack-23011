const input = document.querySelector('input');
    const button = document.querySelector('button');
    const razacontainer = document.querySelector('.raza-container');

    button.addEventListener('click', (e) => {
      e.preventDefault();
      traerRaza(input.value);});

    function traerRaza(pokemon) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.name) {
            crearRaza(data);
          } else {
            obtenerPokemonAleatorio();
          }
        })
        .catch((error) => {
          obtenerPokemonAleatorio();
        });
    }

    function obtenerPokemonAleatorio() {
      const totalPokemons = 898;
      const randomIndex = Math.floor(Math.random() * totalPokemons) + 1;
      const randomPokemon = randomIndex.toString();

      fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}/`)
        .then((res) => res.json())
        .then((data) => {
          crearRaza(data);
        });
    }

    function crearRaza(pokemon) {
      const img = document.createElement('img');
      img.src = pokemon.sprites.front_default;

      const h3 = document.createElement('h3');
      h3.textContent = pokemon.name;

      const div = document.createElement('div');
      div.appendChild(img);
      div.appendChild(h3);

      razacontainer.appendChild(div);
    }

    const buttonChuck = document.querySelector('.one button');
    const fraseChuck = document.querySelector('.one h2');

    buttonChuck.addEventListener('click', getData);

    async function getData() {
      try {
        const data = await fetch('https://api.chucknorris.io/jokes/random');
        const json = await data.json();
        fraseChuck.textContent = json.value;
      } catch (error) {
        console.error(error);
      }
    }

    const marvel = {
      render: () => {
        const urlAPI =
          'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=58a7bea3c0d694b5f9e2e99c9b1d08a6&hash=fb0ea8b97d64a5c71b57f2843914c80e';
        const container = document.querySelector('#marvel-row');
        let contentHTML = '';

        fetch(urlAPI)
          .then((res) => res.json())
          .then((json) => {
            for (const hero of json.data.results) {
              let urlHero = hero.urls[0].url;
              contentHTML += `
                <div class="col-md-4">
                    <a href="${urlHero}" target="_blank">
                      <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                    </a>
                    <h3 class="title">${hero.name}</h3>
                </div>`;
            }
            container.innerHTML = contentHTML;
          });
      },
    };

    marvel.render();

    // Función para obtener personajes aleatorios
    function getRandomCharacters() {
      fetch('https://apisimpsons.fly.dev/api/personajes')
        .then((response) => response.json())
        .then((data) => {
          // Obtener 5 personajes aleatorios
          const randomCharacters = getRandomItems(data, 5);

          // Obtener el contenedor donde se mostrarán los personajes
          const charactersContainer = document.getElementById('characters-container');

          // Limpiar el contenedor
          charactersContainer.innerHTML = '';

          // Mostrar los personajes
          randomCharacters.forEach((character) => {
            // Crear un elemento de imagen y establecer la URL de la imagen
            const image = document.createElement('img');
            image.src = character.imagen;

            // Crear un elemento de párrafo y establecer el nombre del personaje
            const name = document.createElement('p');
            name.textContent = character.nombre;

            // Crear un contenedor para el personaje y añadir la imagen y el nombre
            const characterContainer = document.createElement('div');
            characterContainer.appendChild(image);
            characterContainer.appendChild(name);

            // Añadir el contenedor del personaje al contenedor principal
            charactersContainer.appendChild(characterContainer);
          });
        })
        .catch((error) => {
          console.log('Error:', error);
        });
    }

    // Función para obtener elementos aleatorios de un arreglo
    function getRandomItems(array, count) {
      const shuffled = array.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    // Asignar evento de clic al botón
    const generateButton = document.getElementById('btn-generate');
    generateButton.addEventListener('click', getRandomCharacters);