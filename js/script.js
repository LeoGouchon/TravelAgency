//
//
//
//FONCTION POUR OUVRIR ET FERMER LE POP UP POUR SE LOGIN
function openCloseForm(){
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
//FONCTION POUR VERIFIER LES IDENTIFIANTS RENTRER POUR SE CONNECTER A SON COMPTE
function callLogin() {
  var login = document.getElementById('emailPopUp');
  var mdp = document.getElementById('passwordPopUp');
  var urlPage = window.location.href;
  //Si on se trouve sur la page index, on modifie légèrement l'url du fichier json
  if(urlPage.indexOf("index")) {
    var lienJson = "./js/dataUser.json";
  }
  else() {
    var lienJson = "../js/dataUser.json"
  }
  fetch(lienJson)
  .then(function(response){
    return response.json() //on convert le fichier au format json
  }).then(function(json){
    allUsers = json; //on renomme la bdd en 'allUsers' qui regroupe tout les identifiant
    checkLogin(login, mdp, allUsers);
  })
  .catch(function(err) {
  console.log('Fetch PopUpLogin problem: ' + err.message);
  });
}

function checkLogin(login, mdp, allUsers) {
  for (user of allUsers){
    if (user.identifiant == login && user.identifiant == mdp){
      window.alert("VOUS ETES BIEN CONNECTE")
      break
    }
  }
  window.alert("Mauvais identifiant, veuillez rééssayer")
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
    }
    else {
      mybutton.style.display = "none";
    }
}

function topFunction(){
    document.body.scrollTop=0;
    document.documentElement.scrollTop=0;
  }
