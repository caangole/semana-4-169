//para agregar otro modelo se agrega con coma al lado de usuario
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require ('../models');
const tokenServices = require('../services/token');


exports.login = async(req, res, next) =>{
    try {
        //confirmamos el email
        const usuario = await models.Usuario.findOne({where: {email: req.body.email}});
        if(usuario){
            //confirmamos el password
            const passwordIsvalid = bcrypt.compareSync(req.body.password , usuario.password);
            if(passwordIsvalid){
                //si el password es válido, se crea este objeto token con los elementos del usuario que puede conocer el frontend, una frase secreta, y tiempo de expiración
                const token = await tokenServices.encode(usuario); 
                //envío respuesta al usuario
                res.status(200).send({
                    //auth: true,
                    usuario: usuario,
                    tokenReturn: token
                    //usuario: usuario
                });
            }else{
                res.status(401).send({
                    auth: false,
                    tokenReturn: null,
                    reason: "Password inválido"            
                });
            }
        }else{
            res.status(404).send('El usuario no ha sido encontrado');
        }
    } catch(error) { 
        res.status(500).send({
            message: 'Error->'
        })
        next(error); 
    }
  
};

exports.register = async(req, res, next) =>{ 
    try { 
        const usuario = await models.Usuario.findOne({where: {email: req.body.email}});
        if(usuario){
            res.status(409).send({
                message: 'Su solicitud presenta un conflicto con nuestra base de datos, parece que el correo ya ha sido utilizado'
            })
        }else{
            req.body.password = bcrypt.hashSync(req.body.password, 10);
            const usuario  = await models.Usuario.create(req.body);
            res.status(200).json(usuario);
        }     
    } catch(error) { 
        res.status(500).send({
            message: 'Error->'
        })
        next(error);
    }
};

exports.listar = async(req, res, next) =>{ 
    try { 
        //pide traer todos los campos del modelo usuario
        const usuario = await models.Usuario.findAll();
        if(usuario){
            res.status(200).json(usuario);
        }else{
            res.status(404).send({
                message: 'No hay usuarios en el sistema'
            })
        }
    } catch(error) { 
        res.status(500).send({
            message: 'Error||'
        })
        next(error);
    }
};

exports.update = async(req, res, next) =>{
    try{
        const usuario= await models.Usuario.findOne({where : {email: req.body.email}});
        if(usuario){
            const usuario = await models.Usuario.update({name: req.body.name},
            {
                where: {
                    email: req.body.email
                },
            });
            res.status(200).json(usuario);
        }else{
            res.status(404).send({
                message: 'El usuario no ha sido encontrado'
            })
        }
    }catch (error){
        res.status(500).send({
            message: 'Error.'
        });
        next(error);
    }
};