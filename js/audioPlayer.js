console.log('je suis dans audioPlayer.js')
document.addEventListener('DOMContentLoaded', function () {

  const CLIENT_ID = '658de159b9804a9d92bf09f4721eb739'; // Votre client ID
  const CLIENT_SECRET = '07a48b8c5e5d45189ee3937f64468d96'; // Votre client secret
  const ARTIST_ID = '0x3MDVFQVxfBjXgkuHW6v1'; // ID de l'artiste
  console.log('je suis dans spotifyJS');

  let accessToken;

  // Obtenir l'access token en utilisant les credentials
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    },
    body: 'grant_type=client_credentials'
  })
    .then(response => response.json())
    .then(data => {
      accessToken = data.access_token;
      console.log(data.access_token)

      // Récupérer les IDs et les images des albums de l'artiste
      fetch(`https://api.spotify.com/v1/artists/${ARTIST_ID}/albums?include_groups=album,single&market=FR&limit=50`, {
        headers: {
          'Authorization': 'Bearer ' + accessToken
        }
      })
        .then(response => response.json())
        .then(data => {
          const albums = data.items.map(item => {
            return {
              id: item.id,
              name: item.name,
              image: item.images[0].url // utiliser la première image de l'album
            }
          });
          console.log('je suis 2eme fetch de spotifyJS')
          if (albums && albums.length > 0) { // Vérifier que "albums" est défini et non vide
            console.log('je suis dans if albums de js et je demande :'+ albums); // affiche les IDs et les images des albums dans la console
        
            // Mettre à jour le titre et la pochette de l'album
            const albumArt = document.querySelector('.album-art');
            const artistName = document.querySelector('.artist-name');
            const albumTitle = document.querySelector('.album-title');
        
            const updateAlbum = (album) => {
              document.querySelector('.vinyl-art').src = album.image;
              const albumCover = document.querySelector('.album-cover');
              if (albumCover) {
                albumCover.style.width = '10%';
                albumCover.style.height = 'auto';
              }
              const vinylArt = document.querySelector('.vinyl-art');
              vinylArt.style.width = '100%';
              vinylArt.style.height = 'auto';
              albumArt.style.backgroundImage = `url(${album.image})`;
              artistName.textContent = 'Sound Of Memories';
              albumTitle.textContent = album.name;
            }
            updateAlbum(albums[0]); // Afficher les informations de l'album par défaut

            // Créer des options pour la liste déroulante des albums
            const albumOptions = albums.map(album => {
              return `<option value="${album.id}">${album.name}</option>`
            });

            // Mettre à jour la liste déroulante des albums
            const albumSelect = document.querySelector('#album-select');
            if (albumSelect) { // Vérifier que "albumSelect" est défini
              albumSelect.innerHTML = albumOptions.join('');
            }
            const iframeContainer = document.getElementById('spotify-iframe-container');
            
            // Ajouter un événement change pour mettre à jour l'iframe lorsque l'utilisateur sélectionne un album différent
            if (albumSelect) { // Vérifier que "albumSelect" est défini
              albumSelect.addEventListener('change', (event) => {
                const selectedAlbum = albums.find(album => album.id === event.target.value);
                if (selectedAlbum) {
                  updateAlbum(selectedAlbum);
                  if (iframeContainer && selectedAlbum.id) {
                    iframeContainer.innerHTML = ''; // Supprimer l'ancien iframe
                    let iframe = document.createElement('iframe');
                    iframe.setAttribute('src', `https://open.spotify.com/embed/album/${selectedAlbum.id}`);
                    iframe.setAttribute('width', '100%');
                    iframe.setAttribute('height', '360');
                    iframe.setAttribute('frameborder', '0');
                    iframe.setAttribute('allowtransparency', 'true');
                    iframe.setAttribute('allow', 'encrypted-media');
                    iframeContainer.appendChild(iframe); // Ajouter le nouvel iframe au conteneur
                  }
                }  
              });
            }  
          }
          })
          .catch(error => {
            console.error(error);
          });
    });
  });
//////////////////// Ecouter l'iframe et animer css rotate Vinyl

const audio = document.getElementById('audio');
const animation = document.getElementById('isPlaying');
console.log('Hello eventListener')
audio.addEventListener('play', () => {
  animation.style.animationPlayState = 'running';
});

audio.addEventListener('pause', () => {
  animation.style.animationPlayState = 'paused';
});

audio.addEventListener('ended', () => {
  animation.style.animationPlayState = 'paused';
});
