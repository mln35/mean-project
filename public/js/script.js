
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

loginReset = ()=> {
  console.log('reset');
  document.querySelector(".reset-show").classList.toggle("show");
  document.querySelector(".login-show").classList.toggle("hide");

}

createNewPassword = () => {
  confirm('Send')
}
const total=Array.from(document.querySelectorAll('.maxi'));
console.log(total);

//event
document.querySelector('#edit_profil').addEventListener('click', function(e){
    document.querySelector('#tite').style.display="inline";
    document.querySelector('#cardRight').textContent="";
    document.querySelector('#cardRight').insertAdjacentHTML("beforeend", 
    `<form method="POST" action="/user/profile/update">
        <div class="card-body">
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Firstname</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" name="firstname" value="${total[0].textContent}">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Lastname</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" name="lastname" value="${total[1].textContent}">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Email</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="email" class="form-control" name="email" value="${total[2].textContent}">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">phone</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="number" class="form-control" name="phone" value="${total[3].textContent}">
								</div>
							</div>
							<div class="row">
								<div class="col-sm-3"></div>
								<div class="col-sm-9 text-secondary">
									<button type="submit">Save Changes</button>
								</div>
							</div>
    </form>
    `);
    console.log('button clicked');
})



{/* <div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Mobile</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" name="mobile" value="${total[4].textContent}">
								</div>
							</div>
                            <div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Address</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" name="address" value="${total[5].textContent}">
								</div>
							</div> */}
