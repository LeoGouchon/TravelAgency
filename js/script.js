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
    'pays':'Italie',
    'continent':'europe'
  },
  {
    'srcImgVille':'../data/destination/spielbergVille.jpg',
    'srcImgDrapeau':'../data/destination/autricheDrapeau.jpg',
    'ville':'Spielberg',
    'prix':'',
    'continent':'europe'
  },
  {
    'srcImgVille':'../data/destination/budapestVille.jpg',
    'srcImgDrapeau':'../data/destination/hongrieDrapeau.jpg',
    'ville':'Budapest',
    'prix':'',
    'continent':'europe'
  },
  {
    'srcImgVille':'../data/destination/monacoVille.jpg',
    'srcImgDrapeau':'../data/destination/monacoDrapeau.jpg',
    'ville':'Monaco',
    'prix':'',
    'continent':'europe'
  },
  {
    'srcImgVille':'../data/destination/mexicoVille.jpg',
    'srcImgDrapeau':'../data/destination/mexiqueDrapeau.jpg',
    'ville':'Mexico',
    'prix':'',
    'continent':'ameriqueSud'
  },
  {
    'srcImgVille':'../data/destination/barceloneVille.jpg',
    'srcImgDrapeau':'../data/destination/espagneDrapeau.jpg',
    'ville':'Barcelone',
    'prix':'',
    'continent':'europe'
  },
  {
    'srcImgVille':'../data/destination/suzukaVille.jpg',
    'srcImgDrapeau':'../data/destination/japonDrapeau.jpg',
    'ville':'Suzuka',
    'prix':'',
    'continent':'asie'
  },
  {
    'srcImgVille':'../data/destination/istenbulVille.jpg',
    'srcImgDrapeau':'../data/destination/turquieDrapeau.jpg',
    'ville':'Istanbul',
    'prix':'',
    'continent':'asie'
  },
  {
    'srcImgVille':'../data/destination/bahreïnVille.jpg',
    'srcImgDrapeau':'../data/destination/BahreïnDrapeau.jpg',
    'ville':'Bahreïn',
    'prix':'',
    'continent':'asie'
  },
  {
    'srcImgVille':'../data/destination/elroyVille.jpg',
    'srcImgDrapeau':'../data/destination/etatsunisDrapeau.jpg',
    'ville':'Elroy',
    'prix':'',
    'continent':'ameriqueNord'
  },
  {
    'srcImgVille':'../data/destination/castelletVille.jpg',
    'srcImgDrapeau':'../data/destination/franceDrapeau.jpg',
    'ville':'Castellet',
    'prix':'',
    'continent':'europe'
  },
  {
    'srcImgVille':'../data/destination/sãopaoloVille.jpg',
    'srcImgDrapeau':'../data/destination/bresilDrapeau.jpg',
    'ville':'São Paulo',
    'prix':'',
    'continent':'ameriqueSud'
  },
  {
    'srcImgVille':'../data/destination/kyalamiVille.jpg',
    'srcImgDrapeau':'../data/destination/afriquesudDrapeau.jpg',
    'ville':'Kyalami',
    'prix':'',
    'continent':'afrique'
  },
  {
    'srcImgVille':'../data/destination/shangaiVille.jpg',
    'srcImgDrapeau':'../data/destination/chineDrapeau.jpg',
    'ville':'Shanghai',
    'prix':'',
    'continent':'asie'
  },
  {
    'srcImgVille':'../data/destination/nurburgringVille.jpg',
    'srcImgDrapeau':'../data/destination/allemagneDrapeau.jpg',
    'ville':'nurburgring',
    'prix':'',
    'continent':'europe'
  },
  {
    'srcImgVille':'../data/destination/singapourVille.jpg',
    'srcImgDrapeau':'../data/destination/singapourDrapeau.jpg',
    'ville':'Singapour',
    'prix':'',
    'continent':'asie'
  },
  {
    'srcImgVille':'../data/destination/melbourneVille.jpg',
    'srcImgDrapeau':'../data/destination/australieDrapeau.jpg',
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
        <h2>`+travel.ville+`</h2> 
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

var mybutton = document.getElementById("topbutton");



window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  function topFunction(){
    document.body.scrollTop=0;
    document.documentElement.scrollTop=0;
}


