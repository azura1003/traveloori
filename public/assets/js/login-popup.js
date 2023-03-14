var signinPopup = document.querySelector(".pop-up2");
var showSigninButton = document.querySelector("#show-signin");
var signinCloseButton = document.querySelector(".close-btn2");
var page = document.querySelector("body");

showSigninButton.addEventListener("click", function(){
  if (signinPopup.classList.contains("active")) {
    signinPopup.classList.remove("active");
  } else {
    signinPopup.classList.add("active");
  }
});

signinCloseButton.addEventListener("click", function(){
  signinPopup.classList.remove("active");
});

page.addEventListener("click", function(event){
  if(event.target !== signinPopup && !signinPopup.contains(event.target) && event.target !== showSigninButton) {
    signinPopup.classList.remove("active");
  }
});

var loginPopup = document.querySelector(".pop-up");
var showLoginButton = document.querySelector("#show-login");
var loginCloseButton = document.querySelector(".close-btn");

showLoginButton.addEventListener("click", function(){
  if (loginPopup.classList.contains("active")) {
    loginPopup.classList.remove("active");
  } else {
    loginPopup.classList.add("active");
  }
});

loginCloseButton.addEventListener("click", function(){
  loginPopup.classList.remove("active");
});

page.addEventListener("click", function(event){
  if(event.target !== loginPopup && !loginPopup.contains(event.target) && event.target !== showLoginButton) {
    loginPopup.classList.remove("active");
  }
});