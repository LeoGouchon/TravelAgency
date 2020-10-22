const fetch = require("node-fetch"); //sinon fetch n'est pas reconnu, on a avant téléchargé npm i node-fetch

//
//
//
//S'active quand le js est ouvert
fetch("http://127.0.0.1:3000","./js/dataVoyage.json")
  .then(function(response){
      return response.json() //on convert le fichier au format json
  }).then(function(json){
      console.log('le Fetch bdd fonctionne');
      allTravels = json; //on renomme la bdd en 'allTravels' qui regroupe tout les voyages
      initialiseVoyage(allTravels);
  }).catch(function(err){
      console.log('erreur fetch bdd :\n'+err);
  })


function initialiseVoyage(listTravels){
  for(travel in listTravels){ //On parcours le fichier json voyage par voyage
    weatherInfo(travel.ville); //On va chercher la température pour tous les travels de listTravels
  afficherVoyage();
  }

function weatherInfo(ville){
  var key='32d0bc8abf422135f9c0590d8beaac48';
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=`+ ville +`&units=metric&appid=`+ key)
  .then(function(resp){return resp.json() }) //convert data to json
  .then(function(data){
    var tempData = data.main.temp;
    console.log(tempData);
    returnTemp(tempData, ville);
  })
  .catch(function(err){
    console.log('weatherInfo '+err);
  })
}

function returnTemp(tempData, ville){
  for(var travel in allTravels){
    if(travel.ville == ville){
      console.log('returnTemp');          //Si le nom de la ville correspond à celui de la ville de la température
      travel.temperature=String(Math.round(temp));    //On arrondi pour ne pas avoir de virgule dans la température
      break
    }
  }
}

//
//
//
//STOCKAGE DES DIFFERENTS VOYAGES
//on créé une liste qui contient tout les voyages
//actuellement dans un fichier json

function afficherVoyage(){
  var document = '../index.html';
  for(var travel of allTravels){
    document.getElementsByClassName('sectionArticle')[0].innerHTML +=
    `<div class="voyage">
      <div class="boite">
        <div class="contenu">
          <div class="photo">
            <img src="`+travel.srcImgVille+`" alt="">
          </div>
          <img class="drapeau" src="`+travel.srcImgDrapeau+`" alt="">
          <h2>`+travel.ville+`</h2>
          <a href="./reservation.html?destination=`+travel.ville+`">à partir de `+travel.prix+`€</a>
          <p class="temperature">`+travel.temperature+`°</p>
        </div>
      </div>
    </div>`;
    }
}

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
    document.body.scrollTop=0;
    document.documentElement.scrollTop=0;
  }
}
