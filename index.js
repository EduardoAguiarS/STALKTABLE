// Get Element URL
const button = document.getElementById('spectate');

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  let tablink = tabs[0].url;
  setUrl(tablink);
});

function setUrl(tablink) {
  let spelltableLobby = "https://spelltable.wizards.com/lobby";
  let spelltableGame = "https://spelltable.wizards.com/game";

  if (tablink.includes(spelltableGame) && !tablink.includes("spectate")) {
    button.setAttribute('href', tablink + "/?spectate=true");
    
    // Open new tab
    button.addEventListener('click', function() {
      chrome.tabs.create({url: button.getAttribute('href')});

      // Close popup
      window.close();
    });
  } else if (!tablink.includes(spelltableLobby) && !tablink.includes(spelltableGame)){
    button.setAttribute('href', spelltableLobby);
    button.innerHTML = "Let's go to SpellTable";
    
    // Open new tab
    button.addEventListener('click', function() {
      chrome.tabs.create({url: button.getAttribute('href')});

      // Close popup
      window.close();
    });
  } else if (tablink.includes("spectate")) {
    button.setAttribute('href', spelltableLobby);
    button.innerHTML = "Return to Lobby";

    // Open in same tab
    button.addEventListener('click', function() {
      chrome.tabs.update({url: button.getAttribute('href')});

      // Close popup
      window.close();
    });
  } else {
    // disable button and change text
    button.setAttribute('href', '#');
    button.innerHTML = "Select the game";
    button.setAttribute('disabled', 'disabled');
  }
}
