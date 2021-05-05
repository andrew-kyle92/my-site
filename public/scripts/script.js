// All variables

// Tab Menu Function
function tabOptions(evt, Option) {
    var tabContent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }

    let tabLinks = document.getElementsByClassName('about-btn');
    for (let i = 0; i < tabLinks.length; i++){
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    document.getElementById(Option).style.display = "flex";
    evt.currentTarget.className += " active";
}

// function playSong(evt) {
//     let songs = document.getElementsByClassName("song");
//     let songTitle = document.getElementsByClassName("song-title")[0];
//     let songAlbum = evt.path[0].dataset['album']
//     let songData = evt.path[0].dataset['song'];
//     for(let i = 0; i < songs.length; i++){
//         if(evt.path[0].innerText == songs[i].innerText && songAlbum == songs[i].getAttribute("data-album")){
//             songs[i].classList.toggle("song-active");
//             let songPath = `Music/${songAlbum}/${songData}`;
//             console.log(songPath);
//             songTitle.innerText = songs[i].innerText;
//             document.getElementById("my-audio").setAttribute("src", songPath);
//         }
//         else{
//             songs[i].className = "song";
//         }
//     }
// }

var songs = document.getElementsByClassName("song");
for(let i = 0; i < songs.length; i++){
    songs[i].addEventListener("click", function(){
        let audioNode = document.getElementById("my-audio");
        let songTitle = document.getElementsByClassName("song-title")[0];
        let songAlbum = document.getElementsByClassName("song-album")[0];
        let song = songs[i].dataset["song"];
        let album = songs[i].dataset["album"];
        let songPath = `Music/${album}/${song}`;
        songTitle.innerText = songs[i].innerText;
        songAlbum.innerText = album;
        audioNode.setAttribute("src", songPath);
        if(!songs[i]){
            console.log(!songs[i]);
            this.className = "songs";
        }
    });
}