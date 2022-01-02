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
    - updateProfile

### Model

- User (firstname, lastname, email, phone, password, role, image, verified, date) [role:['ADMIN','USER']]

-Verification(email, verificationToken)

-Reset(email, resetToken)

## Routes

- GET '/user/login' => loginService.goToLogin
- GET 'user.logout' => render('main')
- GET '/' => render('main')
- GET '/user/profile' => render('pages/profile')
- GET '/user/register' => render('pages.register') 
- GET /user/verify/:id' => registerService.verifyEmail
- GET '/user/reset-request' => render('pages/reset-request')
- GET '/user/reset/:token' => resetService.redirect
- GET 'user/admin' => adminService.admin

- POST '/user/login' => render('pages/login')
- POST '/user/profile/update' => profileService.update
- POST '/user/register' => [checking.requiredFields, checking.duplicateEmail],registerService.register
- POST '/user/reset-request' => registerService.reset
- POST '/user/reset' => [checking.verifyResetToken],resetService.saveNewPassword

## Notes

.env required variables

        MONGO_URL
        HOST        
        PORT
        TOKEN_KEY
        
        #SMTP PARAMS
        EMAIL_USERNAME
        EMAIL_PASSWORD
