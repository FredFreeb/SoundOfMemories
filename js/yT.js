console.log('fichier Yt.js ok')
// Remplacez "YOUR_API_KEY" par votre clé API YouTube
const apiKey = "AIzaSyA2EYB7HWFFkFbxYp1X8i3gCZY4VP3H7S4";

// Remplacez "CHANNEL_ID" par l'ID de votre chaîne YouTube
const channelId = "UC8tCjXrtfNBZS2f6ZGnCbEQ";

// Construire l'URL de l'API YouTube pour récupérer les vidéos de la chaîne
const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${apiKey}`;
console.log(url)
console.log(channelId)
console.log(apiKey)
// Faire une requête à l'API YouTube
fetch(url)
.then(response => response.json())
.then(data => {
    // Vérifier si la propriété "items" est définie dans l'objet "data"
    if (data && data.items) {
        const videos = data.items;
        console.log('je suis dans la requete à api YT et je demande data.items')
console.log(data.items)
        videos.forEach((video, index) => {
            const active = index === 0 ? "active" : "";
            const videoElement = `
            <div class="carousel-item ${active}">
                <iframe width="98%" height:"800" src="https://www.youtube.com/embed/${video.id.videoId}" title="${video.snippet.title}"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            `;
            document.getElementById("carouselInner").innerHTML += videoElement;
        });
    } else {
        console.error("La propriété 'items' n'est pas définie dans la réponse de l'API YouTube.");
    }
})
.catch(error => console.error(error));
