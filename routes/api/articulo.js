// llamamos al router de express
const router = require('express').Router();
//Llamamos al controlador
const articuloController = require('../../controllers/ArticuloController.js');
//llamamos el middleware
const auth = require('../../middlewares/auth');

//rutas con restricción de acceso
router.get('/list', articuloController.list);
router.post('/add', articuloController.add);
router.put('/update', articuloController.update);
router.put('/activate', articuloController.activate);
router.put('/deactivate', articuloController.deactivate);


module.exports = router;