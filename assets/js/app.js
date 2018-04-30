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

  $('form').submit(function(event) {

    $('.form-field').removeClass('form-field--error');
    $('.form-field__hint').remove();

    // Form data
    var formData = {
      'foodRating': $('input[name=foodRating]:checked').val(),
      'deliveryRating': $('input[name=deliveryRating]:checked').val(),
      'overallRating': $('input[name=overallRating]:checked').val()
    };

    // Process form
    $.ajax({
      type: 'POST',
      url: 'process.php',
      data: formData,
      dataType: 'json',
      encode: true
    })

    .done(function(data) {

      console.log(data);

      if (!data.success) {

        // Error validation
        if (data.errors.foodRating) {
          $('#food-rating').addClass('form-field--error');
          $('#food-rating').append('<div class="form-field__hint">' + data.errors.foodRating + '</div>');
        }

        if (data.errors.deliveryRating) {
          $('#delivery-rating').addClass('form-field--error');
          $('#delivery-rating').append('<div class="form-field__hint">' + data.errors.deliveryRating + '</div>');
        }

        if (data.errors.overallRating) {
          $('#overall-rating').addClass('form-field--error');
          $('#overall-rating').append('<div class="form-field__hint">' + data.errors.overallRating + '</div>');
        }

      } else {

        var submission = '<div class="form__notification"> \
							<h2 class="form__heading">' + data.message + '</h2> \
              <p class="form__intro">We appreciate you taking the time to fill out the form. Here are the ratings you submitted:</p> \
							<h3 class="form-field__heading">' + data.foodRating + '</h3>\
							<h3 class="form-field__heading">' + data.deliveryRating + '</h3>\
							<h3 class="form-field__heading">' + data.overallRating + '</h3>';

        $('#js-modal-trigger').text('Review submitted');
        $('#js-modal-trigger').addClass('button--disabled');
        $('.button--disabled').attr('disabled', true);
        $('.form').remove();
        $('.modal__inner').append(submission);
      }
    })

    event.preventDefault();
  });
});
