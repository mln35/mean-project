/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdown() {
    console.log('ddwn');
    document.querySelector(".dropdown-menu").classList.toggle("show");
}
  
  // Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.user-icon')) {
        document.querySelector(".dropdown-menu").classList.remove("show");
      
    }
}
