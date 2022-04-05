/* global data */
/* exported data */

var $form = document.querySelector('form');
$form.addEventListener('submit', submitButton);

var $photo = document.querySelector('img');
var $photoURL = document.querySelector('#photoURL');
$photoURL.addEventListener('input', updateURL);

var $entries = document.querySelector('div[data-view=entries]');
var $ul = document.querySelector('.entry-list');

var $navEntries = document.querySelector('.nav-item');
$navEntries.addEventListener('click', showEntries);

function showEntries(event) {
  $form.setAttribute('class', 'hidden');
  $entries.setAttribute('class', 'container');
}

var $newEntryButton = document.querySelector('.new-button');
$newEntryButton.addEventListener('click', showForm);

function showForm(event) {
  $form.setAttribute('class', 'view');
  $entries.setAttribute('class', 'container hidden');
}

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
  data.entries.unshift(inputObj);
  data.nextEntryId += 1;
  $photo.setAttribute('src', '../images/placeholder-image-square.jpg');
  $form.reset();
  renderEntries(inputObj);
}

function renderEntries(obj) {
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
  $entries.setAttribute('class', 'container');

  var _li = document.createElement('li');
  _li.setAttribute('class', 'row margin-top');
  $ul.appendChild(_li);

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
}

var dataIndex = 0;
window.addEventListener('DOMContentLoaded', renderExisitingEntries);
function renderExisitingEntries(event) {
  for (dataIndex = 0; dataIndex < data.entries.length; dataIndex++) {
    renderEntries(data.entries[dataIndex]);
  }
}
