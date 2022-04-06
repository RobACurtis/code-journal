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
var $li = document.querySelector('#example');

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
  var $value = renderEntry(inputObj);
  $ul.prepend($value);
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
  $li.setAttribute('class', 'hidden');
  $entries.setAttribute('class', 'container');

  var _li = document.createElement('li');
  _li.setAttribute('class', 'row margin-top');

  var _divColumn = document.createElement('div');
  _divColumn.setAttribute('class', 'column-half');
  _li.appendChild(_divColumn);

  var _image = document.createElement('img');
  _image.setAttribute('src', obj.imageURL);
  _image.className = 'img-size';
  _divColumn.appendChild(_image);

  var _divText = document.createElement('div');
  _divText.className = 'column-half margin-bottom';
  _li.appendChild(_divText);

  var _heading = document.createElement('h2');
  _heading.className = 'margin black';
  _heading.textContent = obj.title;
  _divText.appendChild(_heading);

  var _text = document.createElement('p');
  _text.className = 'font-weight-four';
  _text.textContent = obj.notes;
  _divText.appendChild(_text);

  return _li;
}

function renderExisitingEntries(event) {
  for (var dataIndex = 0; dataIndex < data.entries.length; dataIndex++) {
    var $value = renderEntry(data.entries[dataIndex]);
    $ul.appendChild($value);
  }
}
