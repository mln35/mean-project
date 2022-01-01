//top middleware
module.exports = function (app) {
  app.use((req, res, next) => {
    const tokenCookie = req.headers.cookie;
    if (!tokenCookie) {
      app.locals.logged = false;
      req.app.locals.logged = false;
      req.token=null;
      return next();
    }
    const tokens = tokenCookie.split(";").filter((t) => t.includes("token"));
    if (!tokens || tokens.length < 1) {
      app.locals.logged = false;
      req.app.locals.logged = false;
      req.token=null;
      return next();
    }
    const token = tokens[0].split("=")[1];
    if (!token) {
      app.locals.logged = false;
      req.app.locals.logged = false;
      req.token=null;
      return next();
    }
    req.token = token;
    app.locals.logged = true;
    req.app.locals.logged = true;
    return next();
  });
};
