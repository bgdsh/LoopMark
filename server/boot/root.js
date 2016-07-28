module.exports = function(app) {
  app.enableAuth();
  // Install a `/` route that returns server status
  var router = app.loopback.Router();
  router.get('/', app.loopback.status());
  app.use(router);
};
