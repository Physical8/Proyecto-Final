const MotoPiloto = require('../models/MotoPiloto');
const Moto = require('../models/motoModel');
const Piloto = require('../models/pilotoModel');


const index = async (req, res) => {
    try {
        const motos = await Moto.findAll({ order: [['id', 'ASC']] });
        const pilotos = await Piloto.findAll({ order: [['id', 'ASC']] });
        const motoPilotos = await MotoPiloto.findAll({
            include: [
                { model: Moto, as: 'moto' },
                { model: Piloto, as: 'piloto' }
            ],
            order: [['fecha_inicio', 'ASC']]
        });

        res.render('motogp/motoPilotoIndex', { motos, pilotos, motoPilotos, user: req.user });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const store = async (req, res) => {
    try {
        const { moto_id, piloto_id, fecha_inicio } = req.body;
        await MotoPiloto.create({ moto_id, piloto_id, fecha_inicio });
        res.redirect('/motoPiloto');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const show = async (req, res) => {
    try {
        const { id } = req.params;
        const motoPiloto = await MotoPiloto.findByPk(id, {
            include: [
                { model: Moto, as: 'moto' },
                { model: Piloto, as: 'piloto' }
            ]
        });
        if (motoPiloto) {
            res.render('/motoPiloto', { motoPiloto, user: req.user });
        } else {
            res.status(404).send('MotoPiloto not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { moto_id, piloto_id, fecha_inicio } = req.body;
        await MotoPiloto.update({ moto_id, piloto_id, fecha_inicio }, { where: { id } });
        res.redirect('/motoPiloto');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        await MotoPiloto.destroy({ where: { id } });
        res.redirect('/motoPiloto');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    index,
    store,
    show,  // Asegúrate de exportar la función show
    update,
    destroy
};
