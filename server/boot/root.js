module.exports = function(app) {
  app.enableAuth();
  var router = app.loopback.Router();
  router.get('/', app.loopback.status());
  app.use(router);
};
