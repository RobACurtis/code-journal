/* global data */
/* exported data */

window.addEventListener('DOMContentLoaded', renderExisitingEntries);

var $form = document.querySelector('form');
$form.addEventListener('submit', submitButton);

var $photo = document.querySelector('img');
var $photoURL = document.querySelector('#photoURL');
$photoURL.addEventListener('input', updateURL);

var $entries = document.querySelector('div[data-view=entries]');

var $ul = document.querySelector('#entry-list');
var $noItems = document.querySelector('#no-items');

var $navEntries = document.querySelector('.nav-item');
$navEntries.addEventListener('click', showEntries);

var $newEntryButton = document.querySelector('.new-button');
$newEntryButton.addEventListener('click', showForm);

function updateURL(event) {
  var src = $photoURL.value;
  $photo.setAttribute('src', src);
}

function showEntries(event) {
  $form.setAttribute('class', 'hidden');
  $entries.setAttribute('class', 'container');
}

function showForm(event) {
  $form.setAttribute('class', ' ');
  $entries.setAttribute('class', 'container hidden');
}

function submitButton(event) {
  event.preventDefault();
  var inputObj = {
    title: $form.elements.title.value,
    imageURL: $form.elements.photoURL.value,
    notes: $form.elements.notes.value,
    entryId: data.nextEntryId
  };
  data.entries.unshift(inputObj);
  var $newEntryDOMTree = renderEntry(inputObj);
  $ul.prepend($newEntryDOMTree);
  data.nextEntryId += 1;
  $photo.setAttribute('src', '../images/placeholder-image-square.jpg');
  $form.reset();
}

function renderEntry(obj) {
  // ul
  // --li
  // ---div
  // ----img
  // ---div
  // ---div
  // ----h2
  // ----p
  // ---div
  // --li
  // ul

  $form.setAttribute('class', 'hidden');
  $noItems.setAttribute('class', 'hidden');
  $entries.setAttribute('class', 'container');

  var $li = document.createElement('li');
  $li.setAttribute('class', 'row margin-top');

  var $divColumn = document.createElement('div');
  $divColumn.setAttribute('class', 'column-half');
  $li.appendChild($divColumn);

  var $image = document.createElement('img');
  $image.setAttribute('src', obj.imageURL);
  $image.className = 'img-size';
  $divColumn.appendChild($image);

  var $divText = document.createElement('div');
  $divText.className = 'column-half margin-bottom';
  $li.appendChild($divText);

  var $heading = document.createElement('h2');
  $heading.className = 'margin black';
  $heading.textContent = obj.title;
  $divText.appendChild($heading);

  var $text = document.createElement('p');
  $text.className = 'font-weight-four';
  $text.textContent = obj.notes;
  $divText.appendChild($text);

  return $li;
}

function renderExisitingEntries(event) {
  for (var dataIndex = 0; dataIndex < data.entries.length; dataIndex++) {
    var $value = renderEntry(data.entries[dataIndex]);
    $ul.appendChild($value);
  }
}
