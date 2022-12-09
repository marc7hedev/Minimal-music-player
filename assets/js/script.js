'use strict';


/*
--//--//-- Información de toda la música --//--//--
*/

const musicData = [
    {
        backgroundImage: "./assets/images/poster-1.jpg",
        posterUrl: "./assets/images/poster-1.jpg",
        title: "Magic ways",
        album: "Big Wave",
        year: 1984,
        artist: "Tatsuro Yamashita",
        musicPath: "./assets/music/music-1.mp3",
    },
    {
        backgroundImage: "./assets/images/poster-2.jpg",
        posterUrl: "./assets/images/poster-2.jpg",
        title: "Perdonar es divino",
        album: "Bocanada",
        year: 1999,
        artist: "Gustavo Cerati",
        musicPath: "./assets/music/music-2.mp3",
    },
    {
        backgroundImage: "./assets/images/poster-3.jpg",
        posterUrl: "./assets/images/poster-3.jpg",
        title: "You never give me your money",
        album: "Abbey Road",
        year: 1967,
        artist: "The Beatles",
        musicPath: "./assets/music/music-3.mp3",
    },
    {
        backgroundImage: "./assets/images/poster-4.jpg",
        posterUrl: "./assets/images/poster-4.jpg",
        title: "Ride on time",
        album: "Ride on time",
        year: 1980,
        artist: "Tatsuro Yamashita",
        musicPath: "./assets/music/music-4.mp3",
    },
    {
        backgroundImage: "./assets/images/poster-5.jpg",
        posterUrl: "./assets/images/poster-5.jpg",
        title: "Starshine",
        album: "Gorillaz",
        year: 2001,
        artist: "Gorillaz",
        musicPath: "./assets/music/music-5.mp3",
    },
    {
        backgroundImage: "./assets/images/poster-6.jpg",
        posterUrl: "./assets/images/poster-6.jpg",
        title: "Insomnia",
        album: "Scary Monsters",
        year: 2021,
        artist: "Hola Beats",
        musicPath: "./assets/music/music-6.mp3",
    },
    {
        backgroundImage: "./assets/images/poster-7.jpg",
        posterUrl: "./assets/images/poster-7.jpg",
        title: "There is someone under my bed",
        album: "No Spirit",
        year: 2021,
        artist: "Hola Beats",
        musicPath: "./assets/music/music-7.mp3",
    },
    {
        backgroundImage: "./assets/images/poster-8.jpg",
        posterUrl: "./assets/images/poster-8.jpg",
        title: "Happy Moments (Master)",
        album: "No Spirit",
        year: 2022,
        artist: "No Spirit x Tonion",
        musicPath: "./assets/music/music-8.mp3",
    },
    {
        backgroundImage: "./assets/images/poster-9.jpg",
        posterUrl: "./assets/images/poster-9.jpg",
        title: "We Are Going To Be Ok (Master)",
        album: "No Spirit",
        year: 2022,
        artist: "No Spirit x Jhove",
        musicPath: "./assets/music/music-9.mp3",
    },
    {
        backgroundImage: "./assets/images/poster-10.jpg",
        posterUrl: "./assets/images/poster-10.jpg",
        title: "Winter Meadow",
        album: "No Spirit",
        year: 2022,
        artist: "No Spirit x  juniorodeo",
        musicPath: "./assets/music/music-10.mp3",
    },
    {
        backgroundImage: "./assets/images/poster-11.jpg",
        posterUrl: "./assets/images/poster-11.jpg",
        title: "From Where We Started",
        album: "No Spirit",
        year: 2022,
        artist: "No Spirit",
        musicPath: "./assets/music/music-11.mp3",
    },
    {
        backgroundImage: "./assets/images/poster-12.jpg",
        posterUrl: "./assets/images/poster-12.jpg",
        title: "Where I Found You",
        album: "No Spirit",
        year: 2022,
        artist: "No Spirit",
        musicPath: "./assets/music/music-12.mp3",
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
        playInterval = setInterval(updateRunningTime, 500);
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
    isMusicEnd();
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


/*
--//--//-- BUSCAR MÚSICA - SEEK FUNCTION --//--//--
Hacer funcional la barra de progreso. "seek range"
*/
const seek = function (){
    audioSource.currentTime = playerSeekRange.value;
    playerRunningTime.textContent = getTimecode(playerSeekRange.value);
}

playerSeekRange.addEventListener("input", seek);


/*
--//--//-- FINALIZAR PISTA --//--//--
*/
const isMusicEnd = function (){
    if (audioSource.ended){
        playBtn.classList.remove("active");
        audioSource.currentTime = 0;
        playerSeekRange.value = audioSource.currentTime;
        playerRunningTime.textContent = getTimecode(audioSource.currentTime);
        updateRangeFill();
    }
}


/*
--//--//-- BOTÓN SIGUIENTE PISTA --//--//--
*/
const playerSkipNextBtn = document.querySelector("[data-skip-next]");

const skipNext = function (){
    lastPlayedMusic = currentMusic;

    if (isShuffled){
        shuffleMusic();
    }else{
        currentMusic >= musicData.length - 1 ? currentMusic = 0 : currentMusic++;
    }

    changePlayerInfo();
    changePlaylistItem();
}

playerSkipNextBtn.addEventListener("click", skipNext);


/*
--//--//-- BOTÓN ANTERIOR PISTA --//--//--
*/

const playerSkipPrevBtn = document.querySelector("[data-skip-prev]");

const skipPrev = function (){
    lastPlayedMusic = currentMusic;

    if (isShuffled){
        shuffleMusic();
    }else{
        currentMusic <= 0 ? currentMusic = musicData.length - 1 : currentMusic--;
    }

    changePlayerInfo();
    changePlaylistItem();
}

playerSkipPrevBtn.addEventListener("click", skipPrev);


/*
--//--//-- ALEATORIO - SHUFFLE --//--//--
Definir función para obtener un número aleatorio
*/
const getRandomMusic = () => Math.floor(Math.random() * musicData.length);
const shuffleMusic = () => currentMusic = getRandomMusic();
const playerShuffleBtn = document.querySelector("[data-shuffle]");
let isShuffled = false;

const shuffle = function (){
    playerShuffleBtn.classList.toggle("active");

    isShuffled = isShuffled ? false : true;
}

playerShuffleBtn.addEventListener("click", shuffle);

/*
--//--//-- REPETIR PISTA --//--//--
*/
const playerRepeatBtn = document.querySelector("[data-repeat]");

const repeat = function (){
    if (!audioSource.loop){
        audioSource.loop = true;
        this.classList.add("active");
    }else{
        audioSource.loop = false;
        this.classList.remove("active");
    }
}

playerRepeatBtn.addEventListener("click", repeat);


/*
--//--//-- VOLUMEN --//--//--
Controlar el volumen mediante la barra de volumen (range)
*/
const playerVolumeRange = document.querySelector("[data-volume]");
const playerVolumeBtn = document.querySelector("[data-volume-btn]");

const changeVolume = function (){
    audioSource.volume = playerVolumeRange.value;
    audioSource.muted = false;

    if (audioSource.volume <= 0.1){
        playerVolumeBtn.children[0].textContent = "volume_mute";
    }else if(audioSource.volume <= 0.5){
        playerVolumeBtn.children[0].textContent = "volume_down";
    }else{
        playerVolumeBtn.children[0].textContent = "volume_up";
    } 
}

playerVolumeRange.addEventListener("input", changeVolume);


/** MUTEAR **/
const muteVolume = function (){
    if (!audioSource.muted){
        audioSource.muted = true;
        playerVolumeBtn.children[0].textContent = "volume_off";
    }else{
        changeVolume
    }
}

playerVolumeBtn.addEventListener("click", muteVolume);