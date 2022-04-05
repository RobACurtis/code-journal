/* global data */
/* exported data */
var $form = document.querySelector('form');
$form.addEventListener('submit', submitButton);

var $photo = document.querySelector('img');
var $photoURL = document.querySelector('#photoURL');
$photoURL.addEventListener('input', updateURL);

function updateURL(event) {
  var src = $photoURL.value;
  $photo.setAttribute('src', src);
}

function submitButton(event) {
  event.preventDefault();
  data.nextEntryId += 1;
  var inputObj = {
    title: $form.elements.title.value,
    imageURL: $form.elements.photoURL.value,
    notes: $form.elements.notes.value,
    nextEntryId: data.nextEntryId
  };
  data.entries.unshift(inputObj);
  var inputJSON = JSON.stringify(data);
  localStorage.setItem('Input Form', inputJSON);
  $form.reset();
  $photo.setAttribute('src', '../images/placeholder-image-square.jpg');
}
