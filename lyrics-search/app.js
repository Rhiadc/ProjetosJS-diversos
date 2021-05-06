const form = document.querySelector('#form')
const searchInput = document.querySelector('#search')
const songsContainer = document.querySelector('#songs-container')
const prevAndNextContainer = document.querySelector('#prev-and-next-container')


const apiURL = `https://api.lyrics.ovh`

const getMoreSongs = async url =>{
    const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    const data = await response.json()
    insertSongsIntoPage(data)
    
}
 
const insertSongsIntoPage = songsInfo=>{
    //retornamod um array mapeado com os elementos do JSON nos elementos do HTML
    searchInput.value = ''
    songsContainerToBeTransformed = songsInfo.data.map(song =>
        `<li class="song">
            <span class="song-artist">
                <strong>${song.artist.name} - </strong>${song.title_short}
            </span>
            <button class="btn" data-artist="${song.artist.name}" data-song-title="${song.title_short}" data-preview="${song.preview}" data-album="${song.album.cover_big}">Ver letra</button>
        </li>`)  
    songsContainer.innerHTML = songsContainerToBeTransformed.join('')

        //verifica se o atributo preview ou next do objeto songsInfo é verdadeiro,
        // primeiro verdadeiro = cria botao com funcao -> (enviando parametro url prev) ou retorna '' pro html...
        //segundo verderairo = cria botao com funcao -> enviando paramentro url next) ou retorna '' pro html...

    if(songsInfo.prev || songsInfo.next){
        prevAndNextContainer.innerHTML = `
        ${songsInfo.prev ? `<button class='btn' onClick ='getMoreSongs("${songsInfo.prev}")'>Anteriores</button>` : '' }
        ${songsInfo.next ? `<button class='btn' onClick ='getMoreSongs("${songsInfo.next}")'>Proximas</button>` : '' }
        `    
            
        return
    }
        prevAndNextContainer.innerHTML = ''


}

//recuperando o JSON de dados da banda a partir do texto submetido do input
const fetchSongs = async term =>{
    //o metodo abaixo gera o mesmo resultado que utilizando o .then, porem de maneira mais concisa
    const response = await fetch(`${apiURL}/suggest/${term}`)
    const data = await response.json()
    insertSongsIntoPage(data)
    console.log(data)
        //o metodo await fetch retorna uma responsa -> acessada pelo .then()
       /* fetch((`${apiURL}/suggest/${term}`))
            .then(response=>response.json())
            .then(data=>{console.log(data)}) */
}


form.addEventListener('submit', event=>{
    //evita que form seja enviado
    event.preventDefault()
    //recebe string inserida no input ... trim() retira os espaços em branco no inicio e fim
    const searchTerm = searchInput.value.trim() 
    if(!searchTerm){
        songsContainer.innerHTML = `<li class='warning-message'>Favor digitar o nome da banda ou música.</li>`
        return
    }

    fetchSongs(searchTerm)
})

let getSongLyrics = async (dataArtist, dataSongTitle, dataPreview, dataAlbum) =>{
    const response = await fetch(`https://api.lyrics.ovh/v1/${dataArtist}/${dataSongTitle}`)
    const data = await response.json()
    showSongLyrics(dataArtist, dataSongTitle, dataPreview, dataAlbum, lyricsFormater(data.lyrics))
}

let lyricsFormater = lyrics =>{
    let formatedLyrics = lyrics.replace(/(\r\n|\r|\n)/g,'<br>')
    return formatedLyrics
}

let showSongLyrics = (dataArtist, dataSongTitle, dataPreview, dataAlbum, formatedLyrics) =>{
    prevAndNextContainer.innerHTML = ''
    songsContainer.innerHTML = `<div class="image-div">
    <image class="album-image" src="${dataAlbum}">
    </div>
        <li class="lyrics-container">
            <h2><strong>${dataArtist}</strong> - ${dataSongTitle}</h2>
            
            <audio controls>
               <source src="${dataPreview}" type="audio/mpeg">
            </audio><p>Preview </p>
            <p class="lyrics">${formatedLyrics}</p>
        </li>    
    `   

}

songsContainer.addEventListener('click', event=>{
    if(event.target.nodeName === "BUTTON"){
        let dataArtist = event.target.getAttribute('data-artist') 
        let dataSongTitle = event.target.getAttribute('data-song-title')
        let dataPreview = event.target.getAttribute('data-preview')
        let dataAlbum = event.target.getAttribute('data-album')
        getSongLyrics(dataArtist, dataSongTitle, dataPreview, dataAlbum)
    }
})