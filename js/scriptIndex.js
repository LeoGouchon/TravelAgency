//
//
//
//S'active quand le js est ouvert
//output : bdd des voyages sous le nom AllTravels et permet d'afficher tout les voyages de la bdd
fetch("./js/dataVoyage.json")
.then(function(response){
  return response.json() //on convert le fichier au format json
}).then(function(json){
  //console.log('le Fetch bdd fonctionne');
  allTravels = json; //on renomme la bdd en 'allTravels' qui regroupe tout les voyages
  //for(travel of allTravels){ console.log(travel);}
  initialiseVoyage(allTravels);
  //console.log('fini de initialiser')
});

//
//
//TRIE DES VOYAGES
function applyFilter(){
  //On créé un array qui contient tout les éléments qui correspondent aux choix de l'utilisateur
  console.log("allTravels");
  console.log(allTravels);
  var selectTravels = allTravels.slice(); //On copie la bdd entière
  console.log("selectTravels");
  console.log(selectTravels);
  //1- Regarder le continent choisi dans le tri
  var listContinents = document.getElementsByClassName("continents")[0];
  var selectContinent = listContinents.options[listContinents.selectedIndex].value;
  console.log(selectContinent);
  del = [];
  if(selectContinent!="tousContinents"){
    console.log(selectTravels);
    for(travel of selectTravels){
      console.log(`on regarde `+travel.ville+``);
      if(travel.continent!=selectContinent){
        console.log(`on supprime `+travel.ville+``);
        del.includes(selectTravels.indexOf(travel)) ? console.log("a") : del.push(selectTravels.indexOf(travel));
        }
      }
    }
    // selectTravels.splice(selectTravels.indexOf(travel),1);
  console.log(selectTravels);
  //2- Regarder le prix le plus bas choisi
  var selectLowPrice = document.getElementsByClassName("lowPrice")[0].value;
  for(travel of allTravels){
    //Si le prix est plus bas que celui dans le l'input de tri, on enlève le voyage
    if(parseInt(travel.prix)<=parseInt(selectLowPrice)){
      del.includes(selectTravels.indexOf(travel)) ? console.log("a") : del.push(selectTravels.indexOf(travel));
      //console.log("trie prix bas");
      //console.log(selectTravels);
    }
  }
  //3- Regarder le prix le plus haut choisi*
  var selectHighPrice = document.getElementsByClassName("highPrice")[0].value;
  for(travel of selectTravels){
    //Si le prix est plus élevé que celui dans le l'input de tri, on enlève le voyage
    if(parseInt(travel.prix)>parseInt(selectHighPrice)){
      console.log("//3");
      del.includes(selectTravels.indexOf(travel)) ? console.log("a") : del.push(selectTravels.indexOf(travel));
      //console.log("trie prix haut");
      //console.log(selectTravels);
    }
  }


  del.sort(function(a, b) {return a - b}).reverse(); //Trie par ordre croissant les index des voyages à supr
    console.log(del);
  for (i of del){
    selectTravels.splice(i,1);
  }
  selectTravels.sort(function(a, b) {return parseInt(a.prix) - parseInt(b.prix)}); //Trie les voyages par ordre croissant de prix
  //4- Afficher la liste correspondant à tout les critères
  document.getElementsByClassName('sectionArticle')[0].innerHTML ='';
  console.log(selectTravels);
  initialiseVoyage(selectTravels);
}

//
//output : détermine la température de chaque voyage
function initialiseVoyage(listTravels){
  console.log(listTravels);
  for(travel of listTravels){   //On parcours le fichier json voyage par voyage
    weatherInfo(travel.ville);  //On va chercher la température pour tous les travels de listTravels
    //console.log('fin du for weatherInfo');
  }
}

//
//fonction qui utilise l'API OpenWheatherMap pour obtenir la température de chaque destination
function weatherInfo(ville){
  var key='32d0bc8abf422135f9c0590d8beaac48';
  //console.log(ville);
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=`+ ville +`&units=metric&appid=`+ key)
    .then(function(resp){return resp.json() }) //convert data to json
    .then(function(data){
      //console.log(data);
      var tempData = data.main.temp;
      //console.log(tempData);
      returnTemp(tempData, ville);
    })
    .catch(function(err){
      //console.log('weatherInfo '+err);
    })
  }

  //
  //Fonction qui affecte la température d'un endroit à sa ville correspondante
  function returnTemp(tempData, ville){
    //On enlève tout les voyages affichés à l'écran
    //document.getElementsByClassName('sectionArticle')[0].innerHTML="";
    for(var travel of allTravels){
      if(travel.ville == ville){        //Si le nom de la ville correspond à celui de la ville de la température
        travel.temperature= String(Math.round(tempData));    //On arrondi pour ne pas avoir de virgule dans la température
        //console.log(ville);
        //console.log(travel.temperature);
        afficherVoyage(travel); //Une fois sa température obtenu, on l'affiche sur la page web
        break     //pour éviter de regarder tout les voyages si on a déjà trouvé le bon
      }
    }
  }

  //
  //
  //
  //Affiche le voyage travel
  function afficherVoyage(travel){
    document.getElementsByClassName('sectionArticle')[0].innerHTML +=
    `<div class="voyage">
    <div class="boite">
    <div class="contenu" onclick="location.href='./html/reservation.html?destination=`+travel.ville+`'">
    <div class="photo">
    <img src="`+travel.srcImgVille+`" alt="">
    </div>
    <img class="drapeau" src="`+travel.srcImgDrapeau+`" alt="">
    <h2>`+travel.ville+`</h2>
    <a href="./html/reservation.html?destination=`+travel.ville+`">à partir de `+travel.prix+`€</a>
    <p class="temperature">`+travel.temperature+`°c</p>
    </div>
    </div>
    </div>`;
  }
