const Client = require('./Client');
const Coach = require('./Coach');
const Exercise = require('./Exercise');

Client.belongsTo(Coach, {
    foreignKey: '_id',
});

Coach.hasMany(Client, {

})

module.exports = { Client, Coach, Exercise, };