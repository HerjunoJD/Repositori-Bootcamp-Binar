const formidable = require('formidable');
const {user_game, user_game_history} = require('../models');
var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: "do6p7maly",
    api_key: "384755744488628",
    api_secret: "hYauE8NSt0OlkklOuEayIoFCSpM",
    secure: true
})



module.exports = {
	uploadProfic: (req, res, next) => {
        const form = formidable({ multiples: true });

        form.parse(req, (err, fields, files) => {
            if (err) {
                next(err);
                return;
            }

            cloudinary.uploader.upload(files.file.filepath, function(error, result) {
                console.log(result.secure_url)
                user_game.update({profile_picture : result.secure_url},
                {where: {id : req.params.id}})
            })
            res.json({ fields, files });
        });
    },

    getProfic: async (req, res) => {
        //Check apakah data user ada di database atau tidak
        if(req.params.id == undefined){
            res.status(400).json({ 
                "status": "error",
                "code": 400});
                return;
        }
        let profic = await user_game.findOne({
            where: {id : req.params.id}
        })
        if(!profic){
            res.status(404).json({
                "status": "error",
                "code": 404,
                "message": "user tidak terdaftar di database"
            })
        } else {
        res.json(profic.profile_picture);
        }
    }
};