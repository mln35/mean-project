
function dropdown() {
    document.querySelector(".dropdown-menu").classList.toggle("show");
}
  
var icon = document.querySelector('.dropdown');
if(icon){
    document. addEventListener('click', function( event ) {
    if (icon !== event.target && !icon.contains(event.target)) {
      document.querySelector(".dropdown-menu").classList.remove("show");
    // console. log('clicking outside the div');
    }
});
}

mess = "testing if logged in"
edit = ()=>{
  let add = document.querySelector("#address");
  let newAdd = document.createElement('input');
  let parent = document.querySelector('.parent');
parent = newAdd;
}