/* global data */
/* exported data */

var previousEntriesJSON = localStorage.getItem('Input Form');
if (previousEntriesJSON !== null) {
  data = JSON.parse(previousEntriesJSON);
}
window.addEventListener('beforeunload', beforeUnload);

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
  var inputObj = {
    title: $form.elements.title.value,
    imageURL: $form.elements.photoURL.value,
    notes: $form.elements.notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId += 1;
  data.entries.unshift(inputObj);
  $form.reset();
  $photo.setAttribute('src', '../images/placeholder-image-square.jpg');
}

function beforeUnload(event) {
  var inputJSON = JSON.stringify(data);
  localStorage.setItem('Input Form', inputJSON);
}
