// console.log('fichier Yt.js ok')
// // Remplacez "YOUR_API_KEY" par votre clé API YouTube
// const apiKey = "AIzaSyA2EYB7HWFFkFbxYp1X8i3gCZY4VP3H7S4";

// // Remplacez "CHANNEL_ID" par l'ID de votre chaîne YouTube
// const channelId = "";

//  // Construire l'URL de l'API YouTube pour récupérer les vidéos de la chaîne
// const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&type=video&key=${apiKey}`;
// console.log(url);
// console.log(channelId);
// console.log(apiKey);

//  // Faire une requête à l'API YouTube en utilisant Fetch
// // fetch(url)
// //     .then(response => response.json())
// //     .then(data => {
// //         // Vérifier si la propriété "items" est définie dans l'objet "data"
// //         if (data && data.items) {
// //             const videos = data.items;
// //             const carouselInner = document.getElementById("carousel-inner");
// //             carouselInner.innerHTML = ""; // Effacer le contenu précédent du carousel-inner
// // console.log(response.json())
// //             videos.forEach((video, index) => {
// //                 const active = index === 0 ? "active" : "";
// //                 const videoElement = `
// //                 <div class="carousel-inner ">
// //                     <figure>
// //                         <iframe width="100%" height="700" src="https://www.youtube.com/embed/${video.id.videoId}" title="${video.snippet.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
// //                     </figure>
// //                     <nav>
// //                         <button class="nav prev">Prev</button>
// //                         <button class="nav next">Next</button>
// //                     </nav>
// //                 </div>
// //                 `;

// //                 carouselInner.innerHTML += videoElement;
// //             });
// //         } else {
// //             console.error("La propriété items n'est pas définie dans la réponse de l'API YouTube.");
// //         }
// //     })
// //     .catch(error => console.error(error));

// // Ajouter le code du carousel 3D
// let carousel = document.querySelector(".carousel"),
//     figure = carousel.querySelector("figure"),
//     nav = carousel.querySelector("nav"),
//     numImages = figure.childElementCount,
//     theta = (2 * Math.PI) / numImages,
//     currImage = 0;

// nav.addEventListener("click", onClick, true);

// function onClick(e) {
//     e.stopPropagation();

//     let t = e.target;
//     if (t.tagName.toUpperCase() != "BUTTON") return;

//     if (t.classList.contains("next")) {
//         currImage++;
//     } else {
//         currImage--;
//     }

//     figure.style.transform = `rotateY(${currImage * -theta}rad)`;
// }
var carousel = document.querySelector(".carousel"),
    figure = carousel.querySelector("figure"),
    nav = carousel.querySelector("nav"),
    numImages = figure.childElementCount,
    theta = (2 * Math.PI) / numImages,
    currImage = 0;
    nav.addEventListener("click", onClick, true);

    function onClick(e) {
        e.stopPropagation();

    var t = e.target;
    if (t.tagName.toUpperCase() != "BUTTON") return;
    
    if (t.classList.contains("next")) {
        currImage++;
    } else {
        currImage--;
    }
    
    figure.style.transform = `rotateY(${currImage * -theta}rad)`;
    }
    
