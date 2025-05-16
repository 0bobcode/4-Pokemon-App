function fetchPokemonInfo() {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    const pokemonNameDisplay = document.getElementById('pokemonNameDisplay');
    const pokemonTypes = document.getElementById('pokemonTypes');
    const pokemonAbilities = document.getElementById('pokemonAbilities');
    const pokemonDetails = document.getElementById('pokemonDetails');

    if (!pokemonName) {
        alert("Please enter a Pokémon name!");
        return;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found!');
            }
            return response.json();
        })
        .then(data => {
            
            // Extracting Pokémon information
            const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            const types = data.types.map(type => type.type.name).join(", ");
            const abilities = data.abilities.map(ability => ability.ability.name).join(", ");

            // Displaying Pokémon info
            pokemonNameDisplay.textContent = `Name: ${name}`;
            pokemonTypes.textContent = `Types: ${types}`;
            pokemonAbilities.textContent = `Abilities: ${abilities}`;

            pokemonDetails.style.display = "block";
        })
        .catch(error => {
            alert(error.message);
            pokemonDetails.style.display = "none";
        });
}
