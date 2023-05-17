class Character {
    constructor(id, name, gender, species, image) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.species = species;
        this.image = image;
    }
}

// Obtener los personajes de la API
fetch('https://rickandmortyapi.com/api/character/')
    .then(response => response.json())
    .then(data => {
        const characters = data.results.map(result => new Character(result.id, result.name, result.gender, result.species, result.image));
        // Llenar la lista desplegable con los nombres de los personajes
        let characterSelect = document.getElementById('character-select');
        characters.forEach(character => {
            const option = document.createElement('option');
            option.value = character.id;
            option.textContent = character.name;
            characterSelect.appendChild(option);
        });
    // Actualizar la lista de personajes en la pantalla
    const updateCharacterList = (characterData) => {
        const characterList = document.getElementById('character-list');
        characterList.innerHTML = '';
        characterData.forEach(character => {
            const col = document.createElement('div');
            col.classList.add('col-lg-4', 'col-md-6', 'mb-4');
            const card = document.createElement('div');
            card.classList.add('card', 'h-100', 'border-0');
            const img = document.createElement('img');
            img.src = character.image;
            img.classList.add('card-img-top');
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            const h4 = document.createElement('h4');
            h4.classList.add('card-title');
            h4.textContent = character.name;
            const p = document.createElement('p');
            p.classList.add('card-text');
            p.textContent = `Género: ${character.gender}, Especie: ${character.species}`;
            cardBody.appendChild(h4);
            cardBody.appendChild(p);
            card.appendChild(img);
            card.appendChild(cardBody);
            col.appendChild(card);
            characterList.appendChild(col);
        });
    };

    // Manejar la búsqueda de personajes por nombre
    const searchBtn = document.getElementById('search-btn');

    // Mostrar personaje seleccionado de la lista desplegable
    characterSelect = document.getElementById('character-select');
    characterSelect.addEventListener('change', () => {
        const selectedCharacterId = characterSelect.value;
        if (selectedCharacterId !== '') {
            const selectedCharacter = characters.find(character => character.id === selectedCharacterId);
            if (selectedCharacter) {
                const selectedCharacters = [selectedCharacter];
                updateCharacterList(selectedCharacters);
            }
        } else {
            updateCharacterList(characters);
        }
    });
    // Mostrar todos los personajes al cargar la página
    updateCharacterList(characters); 

     // Función para buscar y mostrar información del personaje seleccionado
     const searchCharacter = () => {
        const selectedCharacterId = characterSelect.value;
        if (selectedCharacterId !== '') {
            fetch(`https://rickandmortyapi.com/api/character/${selectedCharacterId}`)
                .then(response => response.json())
                .then(characterData => {
                    const selectedCharacter = new Character(
                        characterData.id,
                        characterData.name,
                        characterData.gender,
                        characterData.species,
                        characterData.image
                    );
                    const selectedCharacters = [selectedCharacter];
                    updateCharacterList(selectedCharacters);
                });
        } else {
            updateCharacterList(characters);
        }
    };
    // Asocia la función de búsqueda al botón "Buscar"
    searchBtn.addEventListener('click', searchCharacter);          
});