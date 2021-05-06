const filterInput = document.querySelector('#filter')
const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const fetchPokemon = () => {
    const pokemonPromises = []
    for(let i = 1; i<=150; i++){
        if (i!== 48){
            pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
            
        }
        
    }
    
    Promise.all(pokemonPromises)
        .then(pokemons => {
        //console.log(pokemons)
        document.querySelector('.loader').style.display = "none"
        const lisPokemon = pokemons.reduce((acc, pokemon) => {
        const types = pokemon.types.map(typeinfo => typeinfo.type.name)
           acc += `<li class ='card ${types[0]}'>
                        <img class="card-image "alt="${pokemon.name}" src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/>
                        <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                        <p class="card-subtitle">${types.join(' | ')}</p>
                    </li>`
           return acc
        }, '')
        const ul = document.querySelector('[data-js="pokedex"]')
        ul.innerHTML = lisPokemon
    })
}
const showPostsIfMatchInputValue = inputValue => post =>{
    const postTitle = post.querySelector('.card-title').textContent.toLowerCase()
    const postBody = post.querySelector('.card-subtitle').textContent.toLowerCase()
    if(postTitle.includes(inputValue) || postBody.includes(inputValue)){
        post.style.display = "flex"
        return 
    }
    post.style.display = "none"

}
const handleInputValue = event =>{
    const inputValue = event.target.value.toLowerCase()
    const posts = document.querySelectorAll('li')
    posts.forEach(showPostsIfMatchInputValue(inputValue))
}

filterInput.addEventListener('input', handleInputValue)

 

/* const getPokemon = async() => {
    const response = id => {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    }
    return response(id).json()
}
const addPokemonIntoDOM = async() =>{
    const pokemons = await getPokemon()
    console.log(pokemons)
}
 */
fetchPokemon()