//top middleware
module.exports = function (app) {
  app.use((req, res, next) => {
    const tokenCookie = req.headers.cookie;
    req.token = null;
    app.locals.logged = false;
    req.app.locals.logged = false;

    if (tokenCookie) {
      const tokens = tokenCookie.split(";").filter((t) => t.includes("token"));
      if (tokens && tokens.length > 0) {
        const token = tokens[0].split("=")[1];
        if (token) {
          req.token = token;
          app.locals.logged = true;
          req.app.locals.logged = true;
        }
      }
    }
    next();
  });
};
