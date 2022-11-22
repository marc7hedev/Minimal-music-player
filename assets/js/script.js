'use strict';


/*
--//--//-- Información de toda la música --//--//--
*/

const musicData = [
    {
        backgroundImage: "./assets/images/poster-1.jpg",
        posterUrl: "./assets/images/poster-1.jpg",
        title: "Happy Moments (Master)",
        album: "No Spirit",
        year: 2022,
        artist: "No Spirit x Tonion",
        musicPath: "./assets/music/music-1.mp3",
    },
    {
        backgroundImage: "./assets/images/poster-2.jpg",
        posterUrl: "./assets/images/poster-2.jpg",
        title: "We Are Going To Be Ok (Master)",
        album: "No Spirit",
        year: 2022,
        artist: "No Spirit x Jhove",
        musicPath: "./assets/music/music-2.mp3",
    },
    {
        backgroundImage: "./assets/images/poster-3.jpg",
        posterUrl: "./assets/images/poster-3.jpg",
        title: "Winter Meadow",
        album: "No Spirit",
        year: 2022,
        artist: "No Spirit x  juniorodeo",
        musicPath: "./assets/music/music-3.mp3",
    },
    {
        backgroundImage: "./assets/images/poster-4.jpg",
        posterUrl: "./assets/images/poster-4.jpg",
        title: "From Where We Started",
        album: "No Spirit",
        year: 2022,
        artist: "No Spirit",
        musicPath: "./assets/music/music-4.mp3",
    },
    {
        backgroundImage: "./assets/images/poster-5.jpg",
        posterUrl: "./assets/images/poster-5.jpg",
        title: "Where I Found You",
        album: "No Spirit",
        year: 2022,
        artist: "No Spirit",
        musicPath: "./assets/music/music-5.mp3",
    },
];


/*
--//--//-- eventListeners --//--//--
Añadir eventListener a todos los elementos
*/
const addEventOnElements = function(elements, eventType, callback){
    for (let i=0, len=elements.length; i<len; i++){
        elements[i].addEventListener(eventType, callback);
    }
}


/*
--//--//--PLAYLIST--//--//--
Añadir toda la música en el playlist, desde "musicData" 
*/

const playlist = document.querySelector("[data-music-list]");

for (let i=0, len=musicData.length; i<len; i++){
    playlist.innerHTML += `
        <li>
            <button class="music-item ${i === 0 ? "playing" : ""}" data-playlist-toggler data-playlist-item="${i}">
                <img src="${musicData[i].posterUrl}" width="800" height="800" alt="${musicData[i].title}" class="img-cover">

                <div class="item-icon">
                    <span class="material-symbols-rounded">equalizer</span>
                </div>
            </button>
        </li>
        `;
}


/*
--//--//--PLAYLIST MODAL SIDEBAR TOGGLE--//--//--
Mostrar la sidebar playlist al presionar el botón de playlist en la top app bar, y ocultar la lista al momento de presionar nuevamente en el botón de playlist o cualquier otro lugar. 
*/

const playlistSideModal = document.querySelector("[data-playlist]");
const playlistTogglers = document.querySelectorAll("[data-playlist-toggler]");
const overlay = document.querySelector("[data-overlay]");

const togglePlaylist = function (){
    playlistSideModal.classList.toggle("active"); //Inyectar clase
    overlay.classList.toggle("active");
    document.body.classList.toggle("modalActive");
}

addEventOnElements(playlistTogglers, "click", togglePlaylist);

/*
--//--//-- PLAYLIST ITEM --//--//--
Elimina el status "active" desde "lastPlayedMusic",
y añadir status "active" al hacer click en music. 
*/

const playlistItems = document.querySelectorAll("[data-playlist-item]");

let currentMusic = 0;
let lastPlayedMusic = 0;

const changePlaylistItem = function(){
    playlistItems[lastPlayedMusic].classList.remove("playing"); //Eliminando clase
    playlistItems[currentMusic].classList.add("playing");
}

addEventOnElements(playlistItems, "click", function(){
    lastPlayedMusic = currentMusic;
    currentMusic = Number(this.dataset.playlistItem);
    changePlaylistItem();
});