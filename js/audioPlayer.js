(function($) {
    $(function() {
      // Pause/Play functionality
    let playButton = $('.control-play'),
    album = $('.album');

    playButton.on('click', function() {
    $('.music-player-container').toggleClass('is-playing');
    });
});
})(jQuery);