const express = require('express');
const router = express.Router();
const PilotoController  = require('../../controllers/pilotos');

// Rutas excluidas de la autenticación
const excludedRoutes = ['/home'];

router.use((req, res, next) => {
    const pathWithoutTrailingSlash = req.path.endsWith('/')
        ? req.path.slice(0, -1)
        : req.path;
    if (excludedRoutes.includes(pathWithoutTrailingSlash)) {
        next();
        return;
    }

    if (req.user) {
        next();
    } else {
        req.session.returnTo = req.originalUrl;
        res.redirect('/auth/signIn');
    }
});

// Rutas para Motos
router.get('/', PilotoController.index);
router.post('/', PilotoController.store);
router.get('/:id', PilotoController.show);
router.post('/:id', PilotoController.update);
router.delete('/:id', PilotoController.deletePiloto);


module.exports = router;
