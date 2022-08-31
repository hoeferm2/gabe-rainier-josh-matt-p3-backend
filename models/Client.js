const { Model, DataTypes } = require('sequelize');
// const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Client extends Model {
    checkPassword(clientPw) {
        return bcrypt.compareSync(clientPw, this.password)
    };
};

Client.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // Just Username
        // firstName: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        // lastName: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        // Handled w/ Auth0
        // password: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         len: [8, 20]
        //     },
        // },
        coach_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'coach',
              key: 'id',
            },
          },
    },

    {
        //no need for Bcrypt
        // hooks: {
        //     beforeCreate: async (newClientData) => {
        //         newClientData.password = await bcrypt.hash(newClientData.password, 10);
        //         return newClientData;
        //     },
        //     beforeUpdate: async (updatedClientData) => {
        //         updatedClientData.password = await bcrypt.hash(updatedClientData.password, 10);
        //         return updatedClientData;
        //     },
        // },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'client',
    }
);

module.exports = Client;

