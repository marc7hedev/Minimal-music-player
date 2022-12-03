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


/*
--//--//-- PLAYER - REPRODUCTOR --//--//--
Cambiar la información visual del reproductor en el reproductor, basado en la música que se está reproduciendo en el momento. 
*/

const playerBanner = document.querySelector("[data-player-banner]");
const playerTitle = document.querySelector("[data-title]");
const playerAlbum = document.querySelector("[data-album]");
const playerYear = document.querySelector("[data-year]");
const playerArtist = document.querySelector("[data-artist]");

const audioSource = new Audio(musicData[currentMusic].musicPath);

const changePlayerInfo = function () {
    playerBanner.src = musicData[currentMusic].posterUrl;
    playerBanner.setAttribute("alt", `${musicData[currentMusic].title} Album Poster`);
    document.body.style.backgroundImage = `url(${musicData[currentMusic].backgroundImage})`;
    playerTitle.textContent = musicData[currentMusic].title;
    playerAlbum.textContent = musicData[currentMusic].album;
    playerYear.textContent = musicData[currentMusic].year;
    playerArtist.textContent = musicData[currentMusic].artist;

    audioSource.src = musicData[currentMusic].musicPath;


    audioSource.addEventListener("loadeddata", updateDuration);
    playMusic();

};

addEventOnElements(playlistItems, "click", changePlayerInfo);

/** Actualizar duración de la pista en el reproductor **/
const playerDuration = document.querySelector("[data-duration]");
const playerSeekRange = document.querySelector("[data-seek]");

/** Obtener y formatear el tiempo(timecode) a minutos-segundos **/
const getTimecode = function (duration) {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.ceil(duration - (minutes * 60));
    const timecode = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    return timecode;
}

const updateDuration = function () {
    playerSeekRange.max = Math.ceil(audioSource.duration);
    playerDuration.textContent = getTimecode(Number(playerSeekRange.max));
};

audioSource.addEventListener("loadeddata", updateDuration);


/*
--//--//-- REPRODUCIR MÚSICA --//--//--
Reproducir y pausar la música al dar click al botón Play
*/

const playBtn = document.querySelector("[data-play-btn]");

let playInterval;

const playMusic = function () {
    if (audioSource.paused){
        audioSource.play();
        playBtn.classList.add("active");
        playInterval = setInterval(updateRunningTime, 100);
    } else {
        audioSource.pause();
        playBtn.classList.remove("active");
        clearInterval(playInterval);
    }
}

playBtn.addEventListener("click", playMusic);


/** Actualizar el tiempo de reproducción **/
const playerRunningTime = document.querySelector("[data-running-time]")

const updateRunningTime = function () {
    playerSeekRange.value = audioSource.currentTime;
    playerRunningTime.textContent = getTimecode(audioSource.currentTime);
    
    updateRangeFill();
}


/*
--//--//-- RANGE FILL WIDTH - BARRA DE PROGRESO TIEMPO --//--//--
rellena el ancho de la barra de tiempo recorrido de la pista
*/

const ranges = document.querySelectorAll("[data-range]");
const rangeFill = document.querySelector("[data-range-fill]");

const updateRangeFill = function () {
    let element = this || ranges[0];

    const rangeValue = (element.value / element.max) * 100;
    element.nextElementSibling.style.width = `${rangeValue}%`;
}

addEventOnElements(ranges, "input", updateRangeFill);