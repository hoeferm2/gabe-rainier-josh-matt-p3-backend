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
            allowNull: true,
        },
    
        sets: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: false,
        },
        reps: {
            type: DataTypes.INTEGER,
            allowNull: true,
            unique: false,
        },

    //TODO: Need to figure out date datatype.
        dateAssigned: {
            type: DataTypes.timestamps
        },
    },

    {
    
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'exercise',
    }
);

module.exports = Exercise;