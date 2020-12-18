// llamamos al router de express
const router = require('express').Router();
//Llamamos al controlador
const usuarioController = require('../../controllers/UsuarioController.js');
//llamamos el middleware
const auth = require('../../middlewares/auth');

//rutas con restricción de acceso
router.post('/register', usuarioController.register);
router.put('./update', usuarioController.update);
router.get('/list', usuarioController.listar);

//ruta login sin restricción de acceso
router.post('/login', usuarioController.login);

module.exports = router;