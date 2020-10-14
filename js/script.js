  //
//
//
//FONCTION POUR OUVRIR ET FERMER LE POP UP POUR SE LOGIN
function openCloseForm() {
  if (document.getElementById("login").style.display !="block"){
    document.getElementById("login").style.display = "block";
  }
  else{
    document.getElementById("login").style.display = "none";
  }
}

function closeForm() {
  document.getElementById("login").style.display = "none";
}

//
//
//
//STOCKAGE DES DIFFERENTS VOYAGES
//on créé une liste qui contient tout les voyages
var travels =[
  {
    'srcImgVille': '../data/destination/monzaVille.jpg',
    'srcImgDrapeau': '../data/destination/italieDrapeau.jpg',
    'ville':'Monza',
    'prix':'449',
    'continent':'europe'
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'Spielberg',
    'prix':'',
    'continent':'europe'
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'Budapest',
    'prix':'',
    'continent':'europe'
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'Monaco',
    'prix':'',
    'continent':'europe'
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'Mexico',
    'prix':'',
    'continent':'ameriqueSud'
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'Barcelone',
    'prix':'',
    'continent':'europe'
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'Suzuka',
    'prix':'',
    'continent':'asie'
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'Istanbul',
    'prix':'',
    'continent':'asie'
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'Bahreïn',
    'prix':'',
    'continent':'asie'
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'Elroy',
    'prix':'',
    'continent':'ameriqueNord'
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'Castellet',
    'prix':'',
    'continent':'europe'
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'São Paulo',
    'prix':'',
    'continent':'ameriqueSud'
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'Kyalami',
    'prix':'',
    'continent':'afrique'
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'Shanghai',
    'ville':'',
    'prix':'',
    'continent':'asie'
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'Silverstone',
    'prix':'',
    'continent':'europe'
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'Singapour',
    'prix':'',
    'continent':'asie'
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'Merlbourne',
    'prix':'',
    'continent':'oceanie'
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'',
    'prix':'',
    'continent':''
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'',
    'prix':'',
    'continent':''
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'',
    'prix':'',
    'continent':''
  },
  {
    'srcImgVille':'',
    'srcImgDrapeau':'',
    'ville':'',
    'prix':'',
    'continent':''
  },
]

var document = '../html/PagePrincipale.html';
for(var travel of travels){
  document.getElementsByClassName('sectionArticle')[0].innerHTML +=
  `<div class="voyage">
    <div class="boite">
      <div class="contenu">
        <div class="photo">
          <img src="`+travel.srcImgVille+`" alt="">
        </div>
        <img class="drapeau" src="`+travel.srcImgDrapeau+`" alt="">
        <h2>`+travel.ville+`</h2> <!--titre-->
        <a href="./reservation.html?destination=`+travel.ville+`">à partir de `+travel.prix+`€</a>
        <p class="temperature">30°C</p>
      </div>
    </div>
  </div>`;
}

//
//
//
//FONCTION POUR LE BOUTON SCROLL
//  ('#scrolltotop').click(function(){
//  	('html,body').animate({scrollTop: 0}, 'slow');
//  });
//  (window).scroll(function(){
//  	if((window).scrollTop()<500){
//  		('#scrolltotop').fadeOut();
//  	}else{
//  		('#scrolltotop').fadeIn();
//  	}
//  });
