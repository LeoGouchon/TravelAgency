//
//
//
//AFFICHAGE DES PARAMETRES DU VOYAGE SUR LEQUEL L'UTILISATEUR A CLIQUE
var urlSearch = new URLSearchParams(document.location.search.substring(1)); //définit des méthodes utilitaires pour travailler avec la chaîne de requête de l'URL.
var ville = urlSearch.get('destination'); //On récupère la valeur du paramètre 'destination'
console.log(ville);

fetch("../js/dataVoyage.json")
  .then(function(response){
      return response.json() //on convert le fichier au format json
  }).then(function(json){
      //console.log('le Fetch bdd fonctionne');
      allTravels = json; //on renomme la bdd en 'allTravels' qui regroupe tout les voyages
      afficherParametreVoyage(allTravels, ville);
  });


function afficherParametreVoyage(allTravels, ville){
  for(var travel of allTravels){
    if(ville == travel.ville){
      document.getElementsByClassName('presentationVoyageReservation')[0].innerHTML +=
        `<img class="imageVilleReservation" src=.`+travel.srcImgVille+` alt="">
         <div class="descriptionReservation">
          <img class="drapeauVilleReservation" src=.`+travel.srcImgDrapeau+` alt="">
          <h1>`+travel.ville+`</h1>
          <p>`+travel.destination+`</p>
        </div>`
    }
  }
}
