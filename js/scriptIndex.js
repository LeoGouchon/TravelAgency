//
//
//
//S'active quand le js est ouvert
fetch("./js/dataVoyage.json")
  .then(function(response){
      return response.json() //on convert le fichier au format json
  }).then(function(json){
      //console.log('le Fetch bdd fonctionne');
      allTravels = json; //on renomme la bdd en 'allTravels' qui regroupe tout les voyages
      initialiseVoyage(allTravels);
      //console.log('fini de initialiser')
  //})
  //.then(function(){
  //    console.log('3e then');
  //    afficherVoyage();
  });


function initialiseVoyage(listTravels){
  for(travel of listTravels){   //On parcours le fichier json voyage par voyage
    weatherInfo(travel.ville);  //On va chercher la température pour tous les travels de listTravels
    console.log('fin du for weatherInfo');
  }
}

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

function returnTemp(tempData, ville){
  for(var travel of allTravels){
    if(travel.ville == ville){        //Si le nom de la ville correspond à celui de la ville de la température
      travel.temperature= String(Math.round(tempData));    //On arrondi pour ne pas avoir de virgule dans la température
      console.log(ville);
      console.log(travel.temperature);
      afficherVoyage(travel);
      break     //pour éviter de regarder tout les voyages si on a déjà trouvé le bon
    }
  }
}

//
//
//
//STOCKAGE DES DIFFERENTS VOYAGES
//on créé une liste qui contient tout les voyages
//actuellement dans un fichier json

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
