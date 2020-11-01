var allTravels=[]
var cart="";
fetch('../js/dataVoyage.json')
  .then(function(response){
    return response.json();
  })
  .then(function(data){
    //console.log("fetch called")
    allTravels = data;
    //console.log(allTravels);
    loadCart(allTravels);
  })

function findTravel(allTravels, ville){
  for(var element of allTravels){
    if(element.ville==ville){
      //console.log(ville);
      return element
    }
  }
}

function randomNb(){
  var nb = Math.round(9000*Math.random()+1000);
  return nb
}

function loadCart(allTravels){
  //console.log("loadCart called")
  cart = JSON.parse(sessionStorage.cart);
  //console.log(cart);
  document.getElementsByClassName('blockPrincipal')[0].innerHTML = '';
  for (var element of cart){
    //console.log(element);
    var travel= findTravel(allTravels, element.ville);
    document.getElementsByClassName("blockPrincipal")[0].innerHTML +=
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
            Adulte(s) : `+element.adultNb+`<br>
            Enfant(s) : `+element.enfantNb+`<br>
            </p>
            <p>Prix du séjour : `+element.price+` </p>
            <br>
            <p>n° : `+randomNb()+`-`+randomNb()+`-`+randomNb()+`-`+randomNb()+`</p>
          </div>
          <div class="modification">
            <div class="modifierCommande">
              <a class="lienModifierCommande" href="./reservation.html?destination=`+element.ville+`">Modifier cette commande</a>
            </div>
            <div class="suprCommande">
              <a class="lienSuprCommande" href="#" onclick="suprVoyage()">Supprimer cette commande</a>
            </div>
          </div>
        </div>
      </div>
    </div>`
  }
}

function suprVoyage(ville){
  cart = JSON.parse(sessionStorage.cart);
  for(var i in cart){
    if(cart[i].ville==ville){
      //supprimer le i élément
    }
  }
}
