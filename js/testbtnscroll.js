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

