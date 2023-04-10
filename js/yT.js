let nextPageToken =""
function getVideos(){
    fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UC8tCjXrtfNBZS2f6ZGnCbEQ&maxResults=10&order=date&key=AIzaSyBepb7bGe7yguPiVQuHvXJh_oh6gm6pO8c&pageToken='+nextPageToken)
    .then((result)=>{
        return result.json()
    }).then((data)=> {
        console.log(data)
        let videos = data.items
        nextPageToken = data.nextPageToken
        let videoContainer = document.querySelector(".youtube-container")
        for(video of videos){
            videoContainer.innerHTML += `
            <h3>"${video.snippet.title}"</h3>
            <img src="${video.snippet.thumbnails.high.url}">
                `
        }
    })
}
