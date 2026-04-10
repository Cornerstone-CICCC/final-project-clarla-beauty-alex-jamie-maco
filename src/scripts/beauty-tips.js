$(document).ready(function () {
  // > Tags behavior
  $('.tag').click(function () {
    const value = $(this).attr('data-filter');
    console.log(value);
    

    // Button active state
    $('.tag').removeClass('active');
    $(this).addClass('active');

    // Show all videos if "all" is selected
    if (value == "all") {
      $('.video-card').show('400');
    } else {

      // Oculta los que no coinciden y muestra los que sí
      $('.video-card').not('[data-category="' + value + '"]').hide('400');
      $('.video-card').filter('[data-category="' + value + '"]').show('400');
    }
  });
});