const marvel = {
    render: () => {
      const urlAPI = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=58a7bea3c0d694b5f9e2e99c9b1d08a6&hash=fb0ea8b97d64a5c71b57f2843914c80e';
      const container = document.querySelector('#marvel-row');
      let contentHTML = '';
  
      fetch(urlAPI)
        .then(res => res.json())
        .then((json) => {
          for (const hero of json.data.results) {
            let urlHero = hero.urls[0].url;
            contentHTML += `
              <div class="col-md-3">
                  <a href="${urlHero}" target="_blank">
                    <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                  </a>
                  <h3 class="title">${hero.name}</h3>
              </div>`;
          }
          container.innerHTML = contentHTML;
        })
    }
  };
marvel.render();