const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const Moto = sequelize.define(
    'motos',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        modelo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        numero_competencia: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Moto;
