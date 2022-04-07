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
$ul.addEventListener('click', editItem);
var $noItems = document.querySelector('#no-items');
var $navEntries = document.querySelector('.nav-item');
$navEntries.addEventListener('click', showEntries);

var $newEntryButton = document.querySelector('.new-button');
$newEntryButton.addEventListener('click', showForm);

var $editButtons = document.querySelector('#edit-button');
var $deleteButton = $editButtons.querySelector('.delete-entry-button');
var $modal = document.querySelector('#modal');
$deleteButton.addEventListener('click', displayModal);

var $confirmButton = $modal.querySelector('.confirm-button');
var $cancelButton = $modal.querySelector('.cancel');
$confirmButton.addEventListener('click');
$cancelButton.addEventListener('click', displayModal);

function displayModal(event) {
  var modalClass = $modal.getAttribute('class');
  if (modalClass === 'hidden') {
    $modal.setAttribute('class', '');
  } else {
    $modal.setAttribute('class', 'hidden');
  }
}

function updateURL(event) {
  var src = $photoURL.value;
  $photo.setAttribute('onerror', 'this.src="../images/placeholder-image-square.jpg"');
  $photo.setAttribute('src', src);
}

function showEntries(event) {
  $form.setAttribute('class', 'hidden');
  $entries.setAttribute('class', 'container');
}

function showForm(event) {
  if (data.editing !== null) {
    $editButtons.className = 'column-full flex-wrap';
    $deleteButton.className = 'delete-entry-button';
  } else {
    $editButtons.className = 'column-full flex-end';
    $deleteButton.className = 'delete-entry-button hidden';
  }
  $form.setAttribute('class', ' ');
  $entries.setAttribute('class', 'container hidden');
}

function submitButton(event) {
  event.preventDefault();
  if (data.editing !== null) {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        data.entries[i] = {
          title: $form.elements.title.value,
          imageURL: $form.elements.photoURL.value,
          notes: $form.elements.notes.value,
          entryId: data.entries[i].entryId
        };
        var $updatedEntry = renderEntry(data.entries[i]);
        var $listItem = document.querySelectorAll('li[data-entry-id]');
        for (var listI = 0; listI < $listItem.length; listI++) {
          var idNum = Number($listItem[listI].getAttribute('data-entry-id'));
          if (idNum === data.editing.entryId) {
            $listItem[listI].replaceWith($updatedEntry);
          }
        }
        data.editing = null;
        $photo.setAttribute('src', '../images/placeholder-image-square.jpg');
        $form.reset();
        // $editButtons.className = 'column-full flex-end';
        // $deleteButton.className = 'delete-entry-button hidden';
        return;
      }
    }
  }
  var inputObj = {
    title: $form.elements.title.value,
    imageURL: $form.elements.photoURL.value,
    notes: $form.elements.notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId += 1;
  data.entries.unshift(inputObj);
  var $newEntryDOMTree = renderEntry(inputObj);
  $ul.prepend($newEntryDOMTree);
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
  $li.setAttribute('data-entry-id', obj.entryId);

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
  $heading.className = 'margin black flex-wrap';
  $heading.textContent = obj.title;
  $divText.appendChild($heading);

  var $editIcon = document.createElement('i');
  $editIcon.className = 'fa fa-pen';
  $heading.appendChild($editIcon);

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

function editItem(event) {
  if (event.target && event.target.matches('i')) {
    var li = event.target.closest('li');
    var idNum = Number(li.getAttribute('data-entry-id'));
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === idNum) {
        data.editing = Object.assign({}, data.entries[i]);
        $form.elements.title.value = data.editing.title;
        $form.elements.photoURL.value = data.editing.imageURL;
        $form.elements.notes.value = data.editing.notes;
        $photo.setAttribute('src', data.editing.imageURL);
        showForm();
      }
    }
  }
}
