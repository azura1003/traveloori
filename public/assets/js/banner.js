const bannerImages = [
    '{{ asset('/img/atol-maldives.jpg') }}',
    '{{ asset('/img/barca.jpg') }}',
    '{{ asset('/img/atol-maldives.jpg') }}',
    // Ajoutez d'autres images si nécessaire
];
  
let currentImageIndex = 0;

function changeBannerImage() {
  currentImageIndex = (currentImageIndex + 1) % bannerImages.length;
  document.querySelector('.banner').style.backgroundImage = `url('${bannerImages[currentImageIndex]}')`;
}

setInterval(changeBannerImage, 3000);