//para agregar otro modelo se agrega con coma al lado de User
const models = require ('../models');

exports.list = async(req, res, next) =>{ 
    try { 
        //pide traer todos los campos del modelo User
        const register = await models.Articulo.findAll({
            include: [
                {
                    model: models.Categoria,
                    as: 'categoria',
                    attributes: ['id', 'nombre', 'descripcion']
                },
            ]
        });
        if(register){
            res.status(200).json(register);
        }else{
            res.status(404).send({
                message: 'No hay categorías registradas'
            })
        }
    } catch(error) { 
        res.status(500).send({
            message: 'Error||'
        })
        next(error);
    }
};

exports.add = async(req, res, next) =>{ 
    try { 
        const register = await models.Articulo.create(req.body);
        res.status(200).json(register);
    } catch(error) { 
        res.status(500).send({
            message: 'Error->'
        })
        next(error);
    }
};

exports.update = async(req, res, next) =>{
    try{
        const register = await models.Articulo.update({nombre: req.body.nombre, descripcion: req.body.descripcion, codigo: req.body.codigo, categoriaId: req.body.categoriaId, precio_venta: req.body.precio_venta, stock: req.body.stock},
            {
                where: {
                    id: req.body.id
                },
            });
            res.status(200).json(register);
        }catch (error){
        res.status(500).send({
            message: 'Error.'
        });
        next(error);
    }
};

exports.activate = async(req, res, next) =>{
    try{
        const register = await models.Articulo.update({estado: 1},
            {
                where: {
                    id: req.body.id
                },
            });
            res.status(200).json(register);
        }catch (error){
        res.status(500).send({
            message: 'Error.'
        });
        next(error);
    }
};

exports.deactivate = async(req, res, next) =>{
    try{
        const register = await models.Articulo.update({estado: 0},
            {
                where: {
                    id: req.body.id
                },
            });
            res.status(200).json(register);
        }catch (error){
        res.status(500).send({
            message: 'Error.'
        });
        next(error);
    }
};