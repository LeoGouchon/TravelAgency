//
//
//
//AFFICHAGE DES PARAMETRES DU VOYAGE SUR LEQUEL L'UTILISATEUR A CLIQUE
var urlSearch = new URLSearchParams(document.location.search.substring(1)); //définit des méthodes utilitaires pour travailler avec la chaîne de requête de l'URL.
var ville = urlSearch.get('destination'); //On récupère la valeur du paramètre 'destination'
//console.log(ville); 
var adultPrice = ""; //Maj avec le fetch et la fonction getPrice
var childPrice = ""; //Maj avec le fetch et la fonction getPrice
var prixDejeuner = 12;


fetch("../js/dataVoyage.json") //On récupère la BDD
  .then(function(response){
      return response.json() //on convert le fichier au format json
  }).then(function(json){
      //console.log('le Fetch bdd fonctionne');
      allTravels = json; //on renomme la bdd en 'allTravels' qui regroupe tout les voyages
      afficherParametreVoyage(allTravels, ville);
      //console.log("afficherParametreVoyage"); //Test pour voir si la fonction afficherParametreVoyage fonctionne correctement
      getPrice(allTravels,ville);
      //console.log("getPrice"); //Test pour voir si la fonction getPrice fonctionne correctement
      //console.log(adultPrice);
  });


function getPrice(allTravels, ville){
  for(var travel of allTravels){
    if(ville == travel.ville){
      adultPrice=travel.prix;
      childPrice=travel.prix*0.6;
      //console.log("adultPriceUpdated");
      //console.log(adultPrice);
      }
    }
}

function afficherParametreVoyage(allTravels, ville){
  for(var travel of allTravels){
    if(ville == travel.ville){
      document.getElementsByClassName('presentationVoyageReservation')[0].innerHTML +=
        `<img class="imageVilleReservation" src=.`+travel.srcImgVille+` alt="">
         <div class="descriptionReservation">
          <img class="drapeauVilleReservation" src=.`+travel.srcImgDrapeau+` alt="">
          <h1>`+travel.ville+`</h1>
          <p>`+travel.description+`</p>
        </div>`
    }
  }
}

function getDays(){
    var dateEnd = new Date(document.getElementById("dateEnd").value);
    var dateStart = new Date(document.getElementById("dateStart").value);
    return parseInt((dateEnd - dateStart) / (24 * 3600 * 1000));
}

function cal(){
    if(document.getElementById("dateEnd")){
       document.getElementById("numdays").value=getDays();
    }
}

function daysPrice(numberDays){
    var dateDepart =new Date(document.getElementById("dateStart").value) ;
    var dateRetour = new Date (document.getElementById("dateEnd").value);
    var dateJour = new Date();

    if (numberDays < 0){
        window.alert("Votre date de retour est plus tôt que celle de retour")
    }
    if (dateDepart<dateJour){
        window.alert("votre date de depart est passe, veuiller saisir une date a venir")
    }
    if(dateRetour<dateJour){
        window.alert("votre date de retour est passe, veuiller saisir une date a venir")
    }
}

function prixAdulteDate(nombreJour){
    var prixDateAdulte = nombreJour*document.getElementById("nombreAdulte").value*adultPrice;
    return prixDateAdulte;
}

function prixEnfantDate(nombreJour){
    var prixDateEnfant = nombreJour*document.getElementById("nombreEnfant").value*childPrice;
    return prixDateEnfant;
}

function dejeune(checkbox){

    if(checkbox.checked){
        var prixDejeune = (parseInt(document.getElementById("nombreEnfant").value) + parseInt(document.getElementById("nombreAdulte").value))*prixDejeuner * getDays() ;
        return prixDejeune;
    }

    else{
        var prixDejeune = 0;
        return prixDejeune;
    }
}

function prixTotal(){
   /*  document.getElementById("prixSejour").value = prixAdulteDate(getDays()); */
/*    document.getElementById("prixSejour").innerText = prixAdulteDate(getDays()) + " $"; */
   $("#prixSejour").text(prixAdulteDate(getDays()) + prixEnfantDate(getDays()) + dejeune(this));
}


$(".listenPrixTotal").on("change", prixTotal);

