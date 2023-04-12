let nextPageToken ="";
let media = [];

$(function() {
    getVideos().then(createCarousel);
});

console.log('je suis dans YT.js')

function getVideos() {
    return fetch(
        "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC8tCjXrtfNBZS2f6ZGnCbEQ&maxResults=10&order=viewCount&key=AIzaSyBepb7bGe7yguPiVQuHvXJh_oh6gm6pO8c&pageToken=" +
        nextPageToken
    )
    .then((result) => {
        return result.json();
    })
    .then((data) => {
        console.log(data);
        let videos = data.items;
        nextPageToken = data.nextPageToken;
        if (videos) {
            for (let i = 0; i < videos.length; i++) {
                let video = videos[i];
                media.push({
                    type: 'video',
                    url: `https://www.youtube.com/embed/${video.id.videoId}`,
                    title: video.snippet.title
                });
            }
        }
    });
}

function createCarousel() {
    console.log('je suis dans YT et la fonction createCarousel')
    let carousel = $('.fade');
    carousel.slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });
    for (let i = 0; i < media.length; i++) {
        let video = media[i];
        carousel.slick('slickAdd', '<div><iframe class="carousel fade" src="' + video.url + '" allowfullscreen></iframe></div>');
    }console.log('je suis dans fonction createCarousel de YT')
}

console.log ('je suis le dernier console log de YT.js ')
