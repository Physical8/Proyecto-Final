const express = require('express');
const router = express.Router();
const MotoPiloto = require('../../models/MotoPiloto');
const Moto = require('../../models/motoModel'); // Asegúrate de importar el modelo de Moto
const Piloto = require('../../models/pilotoModel'); // Asegúrate de importar el modelo de Piloto

// Ruta para la vista home.ejs
router.get('/home', async (req, res) => {
    try {
        const motoPilotos = await MotoPiloto.findAll({
            include: [
                { model: Moto, as: 'moto' },
                { model: Piloto, as: 'piloto' }
            ],
            order: [['fecha_inicio', 'ASC']]
        });

        res.render('home', { motoPilotos });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
