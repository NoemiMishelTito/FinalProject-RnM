const characterList = document.getElementById('location-list');
fetch('https://rickandmortyapi.com/api/character/')
  .then(response => response.json())
  .then(data => {
    const characters = data.results;
    characters.forEach(character => {
      const col = document.createElement('div');
      col.classList.add('col-lg-4', 'col-md-6', 'mb-4');
      const card = document.createElement('div');
      card.classList.add('card', 'h-100', 'border-0');
      const img = document.createElement('img');
      img.classList.add('card-img-top');
      img.src = character.image;
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      const h4 = document.createElement('h4');
      h4.classList.add('card-title');
      h4.textContent = character.name;
      const p1 = document.createElement('p');
      p1.classList.add('card-text');
      p1.textContent = `Estado: ${character.status}`;
      const p3 = document.createElement('p');
      p3.classList.add('card-text');
      p3.textContent = `Última ubicación conocida: ${character.location.name}`;
      const p4 = document.createElement('p');
      p4.classList.add('card-text');
      p4.textContent = `Primera vez visto en: ${character.origin.name}`;
      
      //Validación de colores card con respecto al estado
      if (character.status === 'Dead') {
        card.classList.add('card-dead');
      } else if (character.status === 'Alive') {
        card.classList.add('card-alive');
      } else if (character.status === 'unknown') {
        card.classList.add('card-unknown');
      }
      cardBody.appendChild(h4);
      cardBody.appendChild(p1);
      cardBody.appendChild(p3);
      cardBody.appendChild(p4);
      card.appendChild(img);
      card.appendChild(cardBody);
      col.appendChild(card);
      characterList.appendChild(col);
    });
  })
  .catch(error => console.error(error));