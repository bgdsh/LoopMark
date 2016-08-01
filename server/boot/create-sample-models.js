module.exports = function (app) {
    app.dataSources.mysqlDs.automigtate('CoffeeShop', function (err) {
        if (err) {
            throw err;
        }
        
    });
};