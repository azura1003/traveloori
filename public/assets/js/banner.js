let slideIndex = 0;
const banners = document.getElementsByClassName('banner');

function changeBanner() {
  for (let i = 0; i < banners.length; i++) {
    banners[i].classList.remove('active'); // On enlève la classe active de tous les éléments .banner
  }
  slideIndex++;
  if (slideIndex > banners.length) {
    slideIndex = 1;
  }
  banners[slideIndex - 1].classList.add('active'); // On ajoute la classe active à l'élément de la bannière qui est actuellement visible
  setTimeout(changeBanner, 5000); // Change image every 3 seconds
}

changeBanner();