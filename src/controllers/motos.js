const Moto = require('../models/motoModel');


const index = async (req, res) => {
    try {
        const motos = await Moto.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        res.render('motogp/motoIndex', { motos, user: req.user });
    } catch (error) {
        res.status(500).send(error.message);
    }
};  

const show = async (req, res) => {
    try {
        const moto = await Moto.findByPk(req.params.id);
        res.json(moto);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const store = async (req, res) => {
    try {
        const { marca, modelo, numero_competencia } = req.body;
        await Moto.create({ marca, modelo, numero_competencia });
        res.redirect('/motospanel');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const update = async (req, res) => {
    try {
        const { marca, modelo, numero_competencia } = req.body;
        await Moto.update({ marca, modelo, numero_competencia }, { where: { id: req.params.id } });
        res.redirect('/motospanel');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteMoto = async (req, res) => {
    try {
        await Moto.destroy({ where: { id: req.params.id } });
        res.redirect('/motospanel');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {
    index,
    show,
    store,
    update,
    deleteMoto
};
