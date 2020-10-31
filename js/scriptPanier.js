function loadCart(){
  cart = Json.parse(sessionStorage.getItem('cart');
  document.getElementsByClassName('blockPrincipal')[0].innerHTML = '';
  var i=-1;
  for (var element of cart){
    i++;
    var travel= blabla(allTravels, element.ville);
    document.getElementsByClassName("blockPrincipal")[0].innerHTML +=
    `<div class="contourVoyagePanier">
      <div class="boite">
        <div class="voyagePanier">
          <div class="imageVoyagePanier">
            <img src="../data/destination/monzaVille.jpg" alt="">
          </div>
          <div class="nomVillePanier">
            <h2>NomDestination</h2>
            <h3>du 01/10/2020 au 18/10/2020</h3>
          </div>
          <div class="complement">
            <p>
            Type de billet : x € <br>
            Adulte(s) : x € <br>
            Enfant(s) : x € <br>
            Petit déjeuner : x €
            </p>
            <p>Prix : </p>
          </div>
          <div class="modification">
            <div class="modifierCommande">
              <a class="lienModifierCommande" href="./Reservation.html">Modifier cette commande</a>
            </div>
            <div class="suprCommande">
              <a class="lienSuprCommande" href="#">Supprimer cette commande</a>
            </div>
          </div>
        </div>
      </div>
    </div>`
  }
}
