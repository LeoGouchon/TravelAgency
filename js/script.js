///
// Tout les scripts de ce fichier sont des fonctions qui sont appelés sur toutes les pages HTML du site
///

//
//
//
//FONCTION POUR OUVRIR ET FERMER LE POP UP POUR SE LOGIN DANS LA BARRE DE NAVIGATION
function openCloseForm() {
  if (document.getElementById("login").style.display !="block"){
    document.getElementById("login").style.display = "block";
  }
  else{
    document.getElementById("login").style.display = "none";
  }
}

function closeForm() {
  document.getElementById("login").style.display = "none";
}

//
//
//
//PARTIE BOUTON SCROLL
var mybutton = document.getElementById("topbutton");

window.onscroll = function() {scrollFunction()};

//FONCTION QUI AFFICHE ET DEFINI LE BOUTON SCROLL EN HAUT
function scrollFunction() {

    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

function topFunction(){
    document.body.scrollTop=0;
    document.documentElement.scrollTop=0;
  }
