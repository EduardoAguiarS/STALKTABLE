const button = document.getElementById('spectate');

let language = navigator.language || navigator.userLanguage;

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  let tablink = tabs[0].url;
  setUrl(tablink);
});

function setUrl(tablink) {
  let spelltableLobby = "https://spelltable.wizards.com/lobby";
  let spelltableGame = "https://spelltable.wizards.com/game";
  let spelltableLogin = "https://myaccounts.wizards.com/login?redirectTo=https://spelltable.wizards.com/lobby?login=true"

  if (tablink.includes(spelltableGame) && !tablink.includes("spectate")) {
    if (language.includes("pt")) {
      button.innerHTML = "Assistir";
    } else button.innerHTML = "Spectate";
    button.setAttribute('href', tablink + "/?spectate=true");
    
    button.addEventListener('click', function() {
      chrome.tabs.create({url: button.getAttribute('href')});

      window.close();
    });
  } else if (!tablink.includes(spelltableLobby) && !tablink.includes(spelltableGame)){
    button.setAttribute('href', spelltableLobby);
    if (language.includes("pt")) {
      button.innerHTML = "Vamos para o SpellTable";
    } else button.innerHTML = "Let's go to SpellTable";
    
    button.addEventListener('click', function() {
      chrome.tabs.create({url: button.getAttribute('href')});

      window.close();
    });
  } else if (tablink.includes("spectate")) {
    button.setAttribute('href', spelltableLobby);
    if (language.includes("pt")) {
      button.innerHTML = "Voltar para o Lobby";
    } else button.innerHTML = "Return to Lobby";

    button.addEventListener('click', function() {
      chrome.tabs.update({url: button.getAttribute('href')});

      window.close();
    });
  } else if (tablink == spelltableLogin) {
    button.setAttribute('href', '#');
    if (language.includes("pt")) {
      button.innerHTML = "Realize o login";
    } else button.innerHTML = "Login to SpellTable";

    button.setAttribute('disabled', 'disabled');
  } else {
    button.setAttribute('href', '#');
    if (language.includes("pt")) {
      button.innerHTML = "Selecione o jogo";
    } else button.innerHTML = "Select the game";

    button.setAttribute('disabled', 'disabled');
  }
}
