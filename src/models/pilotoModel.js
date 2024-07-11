const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const Piloto = sequelize.define(
    'pilotos',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nacionalidad: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        equipo_actual: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

module.exports = Piloto;
