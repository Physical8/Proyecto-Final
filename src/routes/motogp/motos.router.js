const express = require('express');
const router = express.Router();
const MotoController = require('../../controllers/motos');

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
router.get('/', MotoController.index);
router.post('/', MotoController.store);
router.get('/:id', MotoController.show);
router.post('/:id', MotoController.update);
router.delete('/:id', MotoController.deleteMoto);


module.exports = router;
