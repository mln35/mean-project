module.exports = checkConnection = function (app) {
    app.use('/',(req, res,next) => {
        const tokenCookie=req.headers.cookie;
        if(tokenCookie){
            console.log(tokenCookie);
            const token=tokenCookie.split(';').filter(t => t.includes('token'))[0].split("=")[1];
            if(token){
                console.log(token);
                app.locals.logged=true;
            }else{
                app.locals.logged=false;
            }
        }
        next();
    });

        
    // })
}

