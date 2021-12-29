module.exports = checkConnection = function (app) {
    app.use((req, res,next) => {
        const tokenCookie=req.headers.cookie;
        if(tokenCookie){
            const token=tokenCookie.split(';').filter(t => t.includes('token'))[0].split("=")[1];
            console.log(token)
            if(token){
                console.log('connected');
                app.locals.logged=true;
                req.app.locals.logged = true;
            }else{
                console.log('no relevant cookie');
                app.locals.logged=false;
                req.app.locals.logged = false;
            }
        }else{
            console.log('no cookie');
                app.locals.logged=false;
                req.app.locals.logged = false;
        }
        next();
    });

        
    // })
}

