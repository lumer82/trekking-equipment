const equipmentRoutes = require('./equipment_routes');

module.exports = function(app, db) {
    equipmentRoutes(app, db);
}