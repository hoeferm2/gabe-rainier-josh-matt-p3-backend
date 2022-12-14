const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config/connection');

class Coach extends Model {
    checkPassword(coachPw) {
        return bcrypt.compareSync(coachPw, this.password)
    };
};

Coach.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
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
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 20]
            },
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isCoach: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        publicId: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },

    {
        hooks: {
            beforeCreate: async (newCoachData) => {
                newCoachData.password = await bcrypt.hash(newCoachData.password, 10);
                return newCoachData;
            },
            beforeUpdate: async (updatedCoachData) => {
                updatedCoachData.password = await bcrypt.hash(updatedCoachData.password, 10);
                return updatedCoachData;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'coach',
    }
);

module.exports = Coach;

