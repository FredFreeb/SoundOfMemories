let nextPageToken = "";
const media = [];

function getVideos() {
    fetch(
    "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC8tCjXrtfNBZS2f6ZGnCbEQ&maxResults=10&order=date&key=AIzaSyBepb7bGe7yguPiVQuHvXJh_oh6gm6pO8c&pageToken=" +
        nextPageToken
    )
    .then((result) => {
        return result.json();
    })
    .then((data) => {
        console.log(data);
        let videos = data.items;
        nextPageToken = data.nextPageToken;
        for (let i = 0; i < videos.length; i++) {
            let video = videos[i];
            media.push({
                type: 'video',
                url: `https://www.youtube.com/embed/${video.id.videoId}`,
                title: video.snippet.title
            });
        }
        createCarousel();
    });console.log('je suis fonction getVideos de youtube')
}

function createCarousel() {
    let carousel = $(".carousel");
    carousel.slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });console.log('je suis fonction createCarousel')
}

window.onload = function() {
    getVideos();
}
