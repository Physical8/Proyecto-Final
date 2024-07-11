const Piloto = require('../models/pilotoModel');

const index = async (req, res) => {
    try {
        const pilotos = await Piloto.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        res.render('motogp/pilotosIndex', { pilotos, user: req.user });
    } catch (error) {
        res.status(500).send(error.message);
    }
};  

const show = async (req, res) => {
    try {
        const pilotos = await Piloto.findByPk(req.params.id);
        res.json(pilotos);
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const store = async (req, res) => {
    try {
        const { nombre, nacionalidad, equipo_actual } = req.body;
        await Piloto.create({ nombre, nacionalidad, equipo_actual });
        res.redirect('/pilotospanel');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const update = async (req, res) => {
    try {
        const { nombre, nacionalidad, equipo_actual } = req.body;
        await Piloto.update({ nombre, nacionalidad, equipo_actual }, { where: { id: req.params.id } });
        res.redirect('/pilotospanel');
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const deletePiloto = async (req, res) => {
    try {
        await Piloto.destroy({ where: { id: req.params.id } });
        res.redirect('/pilotospanel');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    index,
    show,
    store,
    update,
    deletePiloto
};
