const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Coach extends Model {
//     checkPassword(coachPw) {
//         return bcrypt.compareSync(coachPw, this.password)
//     };
};

Coach.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
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
        // password: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         len: [8, 20]
        //     },
        // },
        is_coach: {
            type: DataTypes.BOOLEAN,
            default: true
        },
        // coach_code: {
        //     type: DataTypes.INTEGER,
        //     autoIncrement: true,
        //     allowNull: false,
        // }
    },

    {
        // hooks: {
        //     beforeCreate: async (newcoachData) => {
        //         newcoachData.password = await bcrypt.hash(newcoachData.password, 10);
        //         return newcoachData;
        //     },
        //     beforeUpdate: async (updatedcoachData) => {
        //         updatedcoachData.password = await bcrypt.hash(updatedcoachData.password, 10);
        //         return updatedcoachData;
        //     },
        // },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'coach',
    }
);

module.exports = Coach;

