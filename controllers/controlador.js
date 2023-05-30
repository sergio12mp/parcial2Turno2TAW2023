var initModels = require("../data/init-models");
const sequelize = require("sequelize");
var models = initModels(sequelize);
const controller = {};


controller.alba = async function (req, res, next) {
    try {
        const discos = await models.albums.findAll();

        res.render("album", {discos: discos});
    } catch (error) {
        console.log(error);
    }
};

controller.canciones = async function (req, res, next) {
    try {
        const canciones = await models.tracks.findAll({
            where: {
                AlbumId: req.params.id
            }
        });


        res.render("canciones", {cancionesAlbum: canciones});
    } catch (error) {
        console.log(error);
    }
};
controller.detalles = async function (req, res, next) {
    try {

        const detalles = await models.tracks.findOne({
            where: {
                TrackId: req.params.id
            }
        });
        const genero = await models.genres.findOne({
            where: {
                GenreId: detalles.GenreId
            }
        });

        res.send("El genero de la cancion es:" + genero.Name);
       // res.render("detalles", {detallesCancion: detalles, generoCancion: genero});
    } catch (error) {
        console.log(error);
    }
};


controller.editar = async function (req, res, next) {
    try {
        console.log("A");
        const cancion = await models.tracks.findOne({
            where: {
                TrackId: req.params.id
            }
        });
        console.log("B");

        res.render("editar", {datos: cancion});
    } catch (error) {
        console.log(error);
    }
};


controller.actualizar = async function (req, res, next) {
    try {
        console.log("a");

        if (typeof req.body.TrackId != "undefined") {
            const d1 = await models.tracks.findOne({
                where: {
                    TrackId: req.body.TrackId
                }
            });
            console.log("b");
            if (d1) {
                await d1.update({
                    AlbumId: req.body.AlbumId,
                    MediaTypeId: req.body.MediaTypeId,
                    GenreId: req.body.GenreId,
                    UnitPrice: req.body.UnitPrice,
                    Name: req.body.Name,
                    Composer: req.body.Composer,
                    Milliseconds: req.body.Milliseconds,
                    Bytes: req.body.Bytes,
                });
            }
            res.redirect("/"+d1.AlbumId);
        }

    } catch (error) {
        console.log(error);
    }
};

module.exports = controller;