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
        window.alert("votre date de depart est passée, veuillez saisir une date a venir")
    }
    if(dateRetour<dateJour){
        window.alert("votre date de retour est passée, veuillez saisir une date a venir")
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
   $("#prixSejour").text(prixAdulteDate(getDays()) + prixEnfantDate(getDays()) + dejeune(this));
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
    "price":document.getElementById("prixSejour").value,
    "email":document.getElementsByName("mail")[0].value,
    "phoneNumber":document.getElementsByName("phoneNumber")[0].value,
    "dateStart":document.getElementsByName("dateStart")[0].value,
    "dateEnd":document.getElementsByName("dateEnd")[0].value,
    "information":document.getElementsByName("information")[0].value,
    "adultNb":parseInt(document.getElementsByName("nbAdulte")[0].value),
    "enfantNb":parseInt(document.getElementsByName("nbEnfant")[0].value),
  })+']'
  sessionStorage.setItem('cart', cart);
  //console.log("sendfInfo Click")
  document.location.href="../html/panier.html"; //On renvoie l'utilisateur à la page panier
}

$(".listenPrixTotal").on("change", prixTotal);
