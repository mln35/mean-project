
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
