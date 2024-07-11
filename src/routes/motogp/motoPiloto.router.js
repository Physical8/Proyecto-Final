const express = require('express');
const router = express.Router();
const motoPilotoController = require('../../controllers/MotoPiloto');

console.log(motoPilotoController); // Verifica que 'show' esté definido aquí

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
router.get('/', motoPilotoController.index);
router.post('/', motoPilotoController.store);
router.get('/:id', motoPilotoController.show);
router.post('/:id', motoPilotoController.update);
router.delete('/:id', motoPilotoController.destroy); // Aquí cambiamos deleteMoto a destroy

module.exports = router;
