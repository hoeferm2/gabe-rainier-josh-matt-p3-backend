const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Exercise extends Model {
   
    };

    Exercise.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        exerciseName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    
        sets: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        reps: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        client_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'client',
              key: 'id',
            },
          },
          client_name: {
            type: DataTypes.STRING,
            references: {
              model: 'client',
              key: 'username',
            },
          },

    // //TODO: Need to figure out date datatype.
    //     dateAssigned: {
    //         type: Date
    //     },
    },

    {
    
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'exercise',
    }
);

module.exports = Exercise;