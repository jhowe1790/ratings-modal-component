$(document).ready(function() {

  // Model
  var close = $('#js-modal-close'),
    modal = $('.modal'),
    trigger = $('#js-modal-trigger');

  trigger.click(function() {
    modal.addClass('modal--active');
    $('body').addClass('overlay-active');
  })

  close.click(function() {
    $('body').removeClass('overlay-active');
    modal.removeClass('modal--active');
  });


