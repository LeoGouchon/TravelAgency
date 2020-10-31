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
          <h1 class="nomVille">`+travel.ville+`</h1>
          <p>`+travel.description+`</p>
          <p style="font-style:italic;"> <br>Ce voyage vous propose une découverte du circuit pendant une matinée ainsi que les billets pour le prochain évènement de formule 1 s'y déroulant.
             FastTravel possède le privilège d'avoir un partenariat avec ce circuit ce qui vous permet d'obtenir des réductions et des offres exclusives
             (il vous suffit d'imprimer les billets obtenus à l'achat pour profiter de l'offre une fois sur place).
          </p>
        </div>`
      document.getElementsByClassName("title")[0].innerHTML += `FastTravel | `+travel.ville;
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
    //If it is checked.
    if(checkbox.checked){
        var prixDejeune = (parseInt(document.getElementById("nombreEnfant").value) + parseInt(document.getElementById("nombreAdulte").value))*prixDejeuner * getDays() ;
        return prixDejeune;
    }
    //If it has been unchecked.
    else{
        var prixDejeune = 0;
        return prixDejeune;
    }
}

function prixTotal(){
   /*  document.getElementById("prixSejour").value = prixAdulteDate(getDays()); */
/*    document.getElementById("prixSejour").innerText = prixAdulteDate(getDays()) + " $"; */
   $("#prixSejour").text( prixAdulteDate(getDays()) + prixEnfantDate(getDays()) + dejeune(this));
}

function sendInfo(){
  var cartSession = sessionStorage.cart; //On créé une sessionStorage qu'on nomme cartSession
  if(!cartSession || basketSession=='[]'){
    var cart='[';
  }
  else{
    var cart= cartSession.slice(0,-1)+',';
  }
  cart += JSON.stringify({
    "ville":document.getElementsByClassName("nomVille")[0].value,
    "familyName":document.getElementsByName("familyName")[0].value,
    "firstName":document.getElementsByName("firstName")[0].value,
    "email":document.getElementsByName("mail")[0].value,
    "phoneNumber":document.getElementsByName("phoneNumber")[0].value,
    "dateStart":document.getElementsByName("dateStart")[0].value,
    "dateEnd":document.getElementsByName("dateEnd")[0].value,
    "information":document.getElementsByName("information")[0].value,
    "adultNb":parseInt(document.getElementsByName("nbAdulte")[0].value),
    "enfantNb":parseInt(document.getElementsByName("nbEnfant")[0].value),
    "price":prixTotal()
  })+']'
  sessionStorage.setItem('cart', cart);
  document.location.href="./html/Panier.html";
}

$(".listenPrixTotal").on("change", prixTotal);
