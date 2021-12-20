# 2021 MEAN STACK BOOTCAMP PROJECT

<!-- ## TODO -->

## Use cases

- login
- register
- resetpassword

### Model

- user (firstname, lastname, email, telephone,role)

## Routes

    - GET '/home' => render(home,{user:User})
    - GET '/user/login' => render('login')
    - GET '/user/logout' => userServive.logout()
    - GET '/user/register' => render('register')
    - GET '/user/resetpassword' => render('resetpassword')
    - POST '/user/register' => userServive.register(user)  
            [note:userService=require(./services/user.service')]
    - POST '/user/login'  => userServive.login(user)
    - POST '/user/resetpassword' => userServive.resetpassword(data) 

## Notes

- These are infos related to the user management. We will add later other use cases
