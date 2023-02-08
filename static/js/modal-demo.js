(function ($) {
  'use strict';
  $('#exampleModal-4').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('New message to ' + recipient)
    modal.find('.modal-body input').val(recipient)
  })
})(jQuery);


function showModal(mode, url) {
  // Get the modal
  var modal = document.getElementById("myModal");
  // Get the data wrapper
  var wrapper = document.getElementById("img-wrap");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  if (mode == "Cash")
  wrapper.innerHTML = `Payment done via cash`;
  else
  wrapper.innerHTML = `Receipt:<br><embed src="${url}" style="width: 100%; min-height: 60vh">`
  modal.style.display = "block";


  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}