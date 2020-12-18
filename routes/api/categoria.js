// llamamos al router de express
const router = require('express').Router();
//Llamamos al controlador
const categoriaController = require('../../controllers/CategoriaController.js');
//llamamos el middleware
const auth = require('../../middlewares/auth');

//rutas con restricción de acceso
router.get('/list', categoriaController.list);
router.post('/add', categoriaController.add);
router.put('/update', categoriaController.update);
router.put('/activate', categoriaController.activate);
router.put('/deactivate', categoriaController.deactivate);


module.exports = router;