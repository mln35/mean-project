# 2021 MEAN STACK BOOTCAMP PROJECT

<!-- ## TODO -->
## System

- server: express
- view engine: express-handlebars
- database: mongodb

## Use cases

-User
    - login
    - register
    - logout
    - resetpassword
    - showProfile

### Model

- User (firstname, lastname, email, telephone, role, password, image) [role:['ADMIN','USER']]

## Routes

    - GET '/home' => render(home,{user:User})
    - GET '/profile' => render('profile',user)
    - GET '/user/login' => render('login')
    - GET '/user/logout' => userService.logout()
    - GET '/user/register' => render('register')
    [- GET '/user/resetpassword' => render('resetpassword')]
    - POST '/user/register' => userServive.register(user)  
            [note:userService=require(./services/user.service')]
    - POST '/user/login'  => userServive.login(user)
    - POST '/user/resetpassword' => userServive.resetpassword(data) 
    

## Notes

- These are infos related to the user management. We will add later other use cases




TODO
- login button
- profil photo
    - logout