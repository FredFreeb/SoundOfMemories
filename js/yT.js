// This code loads the IFrame Player API code asynchronously.
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// This function creates an <iframe> (and YouTube player)
// after the API code downloads.
let idVideo = "HnPMrJfOINo";
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: idVideo,
        events: {
//            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            'enablejsapi': 1,
            'controls': 1,
            'disablekb': 1
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}
let done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
}
}
function stopVideo() {
    player.stopVideo();
}