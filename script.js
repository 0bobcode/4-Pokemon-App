function fetchPokemonInfo() {
    const pokemonName = document.getElementById('pokemonName').value.toLowerCase();
    //grab elements to wich we will display result
    const pokemonNameDisplay = document.getElementById('pokemonNameDisplay');
    const pokemonTypes = document.getElementById('pokemonTypes');
    const pokemonAbilities = document.getElementById('pokemonAbilities');
    const pokemonDetails = document.getElementById('pokemonDetails');

    //validate input 
    if (!pokemonName) {
        console.warn('NO POKEMON NAME ENTERED')
        alert("Please enter a Pokémon name!");
        return;
    }

    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(url)
        .then(response => {
            //log the raw httpp status(CODE)
            console.log('HTTP status code:', response.status)
            //demonstrate handaling of VARIOUS status codes
            if (response.status===200) {
                console.log('Pokémon found HTTP status code:', response.status)
                return response.json()
            }
            else if(response.status===404){
                console.error("404 not found and you can go now")
                throw new Error('Pokémon not found(404)')
                
            }

            else if(response.status===429){
                console.error("429 uh... excuse(to many requests)")
                throw new Error('rate limit exceeded(429) try again LATER')
            }

            else if(response.status>=500&& response.status < 600){
                console.error(`response status: ${response.status} server error`)
                throw new Error(`response status: ${response.status} server error please try again`)
            }

            else{
                console.error(`(${response.status}) unexpected status`)
            }
            
        })
        .then(data => {
            //inspect JSON paylod
            console.log(`Raw JSON data: ${data}`)

            
            // Extracting Pokémon information
            const name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
            console.log('formatted_name: ', name)
            const types = data.types.map(type => type.type.name).join(", ");
            console.log('types array: ', data.types, 'joined types: ', types)
            const abilities = data.abilities.map(ability => ability.ability.name).join(", ");
            console.log('abillities array: ', data.abilities, 'joined abbilities: ', abilities)

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
