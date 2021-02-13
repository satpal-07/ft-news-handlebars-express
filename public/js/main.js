'use strict';

function toggleSearchBar() {
  var searchBar = document.getElementById('search-bar');
  if (searchBar.style.display !== 'none') {
    searchBar.style.display = 'none';
  } else {
    searchBar.style.display = 'block';
    document.getElementById('search-primary').focus();
  }
}

function makeActive(event) {
  var previousNavItem = document.getElementsByClassName('nav-link-active');
  if (previousNavItem && previousNavItem.length > 0)
    previousNavItem[0].className = previousNavItem[0].className.replace(
      ' nav-link-active',
      ''
    );
  event.className += ' nav-link-active';
}
