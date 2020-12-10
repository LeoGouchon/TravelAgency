///
//SCRIPT UTILE POUR LA PAGE PANIER.HTML
///

var allTravels=[]
var cart="";

//Fetch qui se lance dès que le js est activé
fetch('../js/dataVoyage.json')
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    //console.log("fetch called")
    allTravels = data;
    //console.log(allTravels);
    loadCart();
    calcPrice();
  })

//
//
//Fonction qui cherche le bon voyage d'input à partir de son nom et le return
function findTravel(allTravels, ville){
  for(var element of allTravels){
    if(element.ville == ville){
      //console.log(ville);
      return element
    }
  }
}

//
//
//FONCTION QUI CHARGE ET AFFICHE LES VOYAGES QUI SONT DANS LE PANIER
function loadCart(){
  //console.log("loadCart called")
  cart = JSON.parse(sessionStorage.cart);
  //console.log(cart);
  document.getElementsByClassName('listePanier')[0].innerHTML = '';
  //affiche chaque voyage du panier dans le code html un par un
  for (var element of cart){
    //console.log(element);
    document.getElementsByClassName("listePanier")[0].innerHTML +=
    `<div class="contourVoyagePanier">
      <div class="boite">
        <div class="voyagePanier">
          <div class="imageVoyagePanier">
            <img src="../data/destination/`+element.ville+`Ville.jpg" alt="">
          </div>
          <div class="nomVillePanier">
            <h2>`+element.ville+`</h2>
            <h3>du `+element.dateStart+` au `+element.dateEnd+`</h3>
          </div>
          <div class="complement">
            <p>
            Nom réservation : `+element.firstName+` `+element.familyName+`<br>
            Adulte(s) : `+element.adultNb+`<br>
            Enfant(s) : `+element.enfantNb+`<br>
            </p>
            <p>Prix du séjour : `+element.price+`€</p>
            <br>
            <p>n° : `+element.code+`</p>
          </div>
          <div class="modification">
            <div class="modifierCommande">
              <a class="lienModifierCommande" href="./reservation.html?destination=`+element.ville+`">Modifier cette commande</a>
            </div>
            <div class="suprCommande">
              <a class="lienSuprCommande" href="#" onclick="suprVoyage('`+element.ville+`')">Supprimer cette commande</a>
            </div>
          </div>
        </div>
      </div>
    </div>`
  }
}

//
//
//FONCTION QUI CALCULE LE PRIX TOTAL DU PANIER
function calcPrice(){
  cart = JSON.parse(sessionStorage.cart);
  var prixPanier = 0;
  for(var element of cart){
    prixPanier += element.price;
  }
  document.getElementsByClassName("prixPanier")[0].innerHTML += prixPanier;
}

//
//
//FONCTION QUI SUPPRIMER UN VOYAGE DU PANIER
// +++++++NON FINI ET NON FONCTIONNEL++++++++
function suprVoyage(ville){
  cart = JSON.parse(sessionStorage.cart);
  for(var i in cart){
    if(cart[i].ville == ville){
      console.log(cart[i]);
      cart.splice(i,1);
      sessionStorage.setItem('cart', cart);
      console.log(cart);
      loadCart();
      //document.location.href="../html/panier.html"; //On renvoie l'utilisateur à la page panier
    }
  }
}
