const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');
const Moto = require('./motoModel');
const Piloto = require('./pilotoModel');

const MotoPiloto = sequelize.define(
    'moto_pilotos',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        moto_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Moto,
                key: 'id',
            },
            allowNull: false,
        },
        piloto_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Piloto,
                key: 'id',
            },
            allowNull: false,
        },
        fecha_inicio: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
);

Moto.belongsToMany(Piloto, { through: MotoPiloto, foreignKey: 'moto_id', as: 'pilotos' });
Piloto.belongsToMany(Moto, { through: MotoPiloto, foreignKey: 'piloto_id', as: 'motos' });

MotoPiloto.belongsTo(Moto, { foreignKey: 'moto_id', as: 'moto' });
MotoPiloto.belongsTo(Piloto, { foreignKey: 'piloto_id', as: 'piloto' });


module.exports = MotoPiloto;
