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
var prixSejour="";

fetch("../js/dataVoyage.json") //On récupère la BDD
.then(function(response){
  return response.json() //on convert le fichier au format json
}).then(function(json){
  //console.log('le Fetch bdd fonctionne');
  allTravels = json; //on renomme la bdd en 'allTravels' qui regroupe tout les voyages
  afficherParametreVoyage(allTravels, ville);
  //console.log("afficherParametreVoyage"); //Test pour voir si la fonction afficherParametreVoyage() fonctionne correctement
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
      document.getElementsByClassName("title")[0].innerHTML += `FastTravel | `+travel.ville;
      document.getElementsByClassName('presentationVoyageReservation')[0].innerHTML +=
      `<img class="imageVilleReservation" src=.`+travel.srcImgVille+` alt="">
      <div class="descriptionReservation">
      <img class="drapeauVilleReservation" src=.`+travel.srcImgDrapeau+` alt="">
      <h1>`+travel.ville+`</h1>
      <p>`+travel.description+`</p>
      <p style="font-style:italic;"> <br>Ce voyage vous propose une découverte du circuit pendant une matinée ainsi que les billets pour le prochain évènement de formule 1 s'y déroulant.
      FastTravel possède le privilège d'avoir un partenariat avec ce circuit ce qui vous permet d'obtenir des réductions et des offres exclusives
      (il vous suffit d'imprimer les billets obtenus à l'achat pour profiter de l'offre une fois sur place).
      </p>
      </div>`
    }
  }
}

//Return le nbr de jour
function getDays(){
  var dateEnd = new Date(document.getElementById("dateEnd").value);
  var dateStart = new Date(document.getElementById("dateStart").value);
  return parseInt((dateEnd - dateStart) / (24 * 3600 * 1000));
}


//Fonction qui vérifie si les dates de départ et d'arrivé rentré par l'utilisateur rencontre des problèmes
//Output : noError si il n'y a aucun problème
//         ne return rien si il y a un problème
function daysCalcul(){
  var dateDepart =new Date(document.getElementById("dateStart").value);
  var dateRetour = new Date (document.getElementById("dateEnd").value);
  var dateJour = new Date();
  var noError = "noError";

  if (dateRetour<dateDepart){
    dateEnd.value="";

    return
  }
  if (dateDepart<dateJour){
    dateStart.value="";
    return
  }
  if(dateRetour<dateJour){
    dateEnd.value="";
    return
  }
  return noError //Si on atteint ce return, le prix rentré par l'utilsateur ne rencontre pas de problème particulier
}

function prixAdulteDate(numberDays){
  var prixDateAdulte = numberDays*document.getElementById("nombreAdulte").value*adultPrice;
  return prixDateAdulte;
}

function prixEnfantDate(numberDays){
  var prixDateEnfant = numberDays*document.getElementById("nombreEnfant").value*childPrice;
  return prixDateEnfant;
}

function dejeune(checkbox){
  if(checkbox.checked){
    var prixDejeune = (parseInt(document.getElementById("nombreEnfant").value) + parseInt(document.getElementById("nombreAdulte").value))*prixDejeuner*getDays() ;
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
  $("#prixSejour").text(prixAdulteDate(getDays()) + prixEnfantDate(getDays()) + dejeune(this)); /*utilisation de Jquery pour simplifier l'écriture */
  prixSejour=prixAdulteDate(getDays()) + prixEnfantDate(getDays()) + dejeune(this);
}

//
//
//
//FONCTION POUR ENREGISTRER LE VOYAGE DANS SESSIONSTORAGE POUR POUVOIR L'AFFICHER DANS LE PANIER
function sendInfo(){
  var cartSession = sessionStorage.cart; //On créé une sessionStorage qu'on nomme cartSession
  if(!cartSession || cartSession=='[]'){ //Si cartSession est vide ou inexistante on rajoute [
    var cart='[';
  }
  else{
    for(var element of JSON.parse(cartSession)){
      console.log(element);
      if(element.ville==ville){    //Si il existe une réservation dans la même ville, on renvoie juste à la page panier
        document.location.href="../html/panier.html";
        return
      }
    }
    var cart= cartSession.slice(0,-1)+','; //On récupère tout cartSession sauf le dernier caractère (cad "]" qu'on rajoutera plus tard)
  }
  cart += JSON.stringify({
    "familyName":document.getElementsByName("familyName")[0].value,
    "firstName":document.getElementsByName("firstName")[0].value,
    "ville":ville,
    "price":prixSejour,
    "email":document.getElementsByName("mail")[0].value,
    "phoneNumber":document.getElementsByName("phoneNumber")[0].value,
    "dateStart":document.getElementsByName("dateStart")[0].value,
    "dateEnd":document.getElementsByName("dateEnd")[0].value,
    "information":document.getElementsByName("information")[0].value,
    "adultNb":parseInt(document.getElementsByName("nbAdulte")[0].value),
    "enfantNb":parseInt(document.getElementsByName("nbEnfant")[0].value),
    "code":randomNb()+`-`+randomNb()+`-`+randomNb()+`-`+randomNb()
  })+']'
  sessionStorage.setItem('cart', cart);
  //console.log("sendfInfo Click")
  document.location.href="../html/panier.html"; //On renvoie l'utilisateur à la page panier
}

//
//
//
//FONCTION QUI RETOURNE UN NBR COMPRIS ENTRE 1000 ET 9999
function randomNb(){
  var nb = Math.round(9000*Math.random()+1000);
  return nb
}


$(".listenPrixTotal").on("change", prixTotal);
