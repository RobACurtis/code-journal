/* global data */
/* exported data */
var $photoURL = document.querySelector('#photoURL');
$photoURL.addEventListener('input', updateURL);

var $form = document.querySelector('form');
$form.addEventListener('submit', submit);

function updateURL(event) {
  var src = $photoURL.value;
  $photoURL.setAttribute('src', src);
}

function submit(event) {
  event.preventDefault();
  var inputObj = {
    title: $form.elements.title.value,
    imageURL: $form.elements.photoURL.value,
    notes: $form.elements.notes.value
  };

  var inputString = JSON.stringify(inputObj);
  localStorage.setItem('Input Form', inputString);

}
