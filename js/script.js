//
//
//
//FONCTION POUR OUVRIR ET FERMER LE POP UP POUR SE LOGIN
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
//FONCTION POUR LE BOUTON SCROLL

var mybutton = document.getElementById("topbutton");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {

    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

function topFunction(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
