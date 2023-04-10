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
        console.log('je suis...')
          if (albums && albums.length > 0) { // Vérifier que "albums" est défini et non vide
            console.log('je suis dans if albums'+ albums); // affiche les IDs et les images des albums dans la console
        
            // Mettre à jour le titre et la pochette de l'album
            const albumArt = document.querySelector('.album-art');
            const artistName = document.querySelector('.artist-name');
            const albumTitle = document.querySelector('.album-title');
        
            const updateAlbum = (album) => {
              document.querySelector('.vinyl-art').src = album.image;
              const albumCover = document.querySelector('.album-cover');
              if (albumCover) {
                albumCover.style.width = '20%';
                albumCover.style.height = 'auto';
              }
              const vinylArt = document.querySelector('.vinyl-art');
              vinylArt.style.width = '100%';
              vinylArt.style.height = 'auto';
              albumArt.style.backgroundImage = `url(${album.image})`;
              artistName.textContent = 'Sound Of Memories';
              albumTitle.textContent = album.name;
            }
            console.log('je suis...')
            updateAlbum(albums[0]); // Afficher les informations de l'album par défaut
        
            // Ajouter un événement click pour mettre à jour les informations de l'album lorsque l'utilisateur sélectionne un album différent
            const albumSelect = document.querySelector('#album-select');
            if (albumSelect) { // Vérifier que "albumSelect" est défini
              albumSelect.addEventListener('change', (event) => {
                console.log('je suis...ds if albumselect')
                const selectedAlbum = albums.find(album => album.id === event.target.value);
                if (selectedAlbum) {
                  updateAlbum(selectedAlbum);
                }
              });
            }
            console.log('je suis avant le play-button')
            document.querySelector('#play-button').addEventListener('click', function () {
            // Charger et jouer la chanson correspondante
            console.log('je suis dans le play-button')
            const audioContext = new AudioContext();
            const source = audioContext.createBufferSource();
            request.open('GET', `https://api.spotify.com/v1/albums/${albums[0].id}/tracks?market=FR`);
            request.setRequestHeader('Authorization', 'Bearer ' + accessToken);
            request.responseType = 'json';
            request.send();
            request.onload = function () {
              const tracks = request.response.items;
              const trackUrl = tracks[0].preview_url;
              request.open('GET', trackUrl, true);
              request.responseType = 'arraybuffer';
              request.onload = function () {
                const audioData = request.response;
                audioContext.decodeAudioData(audioData, function (buffer) {
                  source.buffer = buffer;
                  source.connect(audioContext.destination);
                  source.start(0);
                });
              };
              request.send();
            };
          });
        }
      })
    })
})
