console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Stellar Blade OST - Flooded Commercial Sector", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Stellar Blade OST - Shelter", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Stellar Blade OST - The Song of the Traveler", filePath: "songs/3.mp3", coverPath: "covers/3.jpeg"},
    {songName: "Stellar Blade OST - Intro Cinematic", filePath: "songs/4.mp3", coverPath: "covers/4.jpeg"},
    {songName: "Stellar Blade OST - Eidos 7 Silent Street", filePath: "songs/5.mp3", coverPath: "covers/5.jpeg"},
    {songName: "Stellar Blade OST - Eidos 7 Abandoned Station", filePath: "songs/6.mp3", coverPath: "covers/4.jpeg"},
    {songName: "Stellar Blade OST - Abaddon", filePath: "songs/7.mp3", coverPath: "covers/3.jpeg"},
    {songName: "Stellar Blade OST - Eidos 7 Monorail", filePath: "songs/8.mp3", coverPath: "covers/.1jpg"},
    {songName: "Stellar Blade OST - Memory Tower", filePath: "songs/9.mp3", coverPath: "covers/5.jpeg"},
    {songName: "Stellar Blade OST - Hall of Records", filePath: "songs/10.mp3", coverPath: "covers/2.jpg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 
// document.addEventListener('DOMContentLoaded', function() {
//     let lastScrollTop = 0; // Keeps track of the last scroll position
//     const bottomBar = document.querySelector('.bottom'); // Select the soundbar element

//     window.addEventListener('scroll', function() {
//         let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
//         if (currentScrollTop < lastScrollTop) {
//             // Scrolling up
//             bottomBar.classList.add('show');
//         } else {
//             // Scrolling down
//             bottomBar.classList.remove('show');
//         }
        
//         lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
//     });
// });


// Handle play/pause click

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})
