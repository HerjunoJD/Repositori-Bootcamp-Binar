// controllers/authController.js
const { user_game } = require('../models');
const { validationResult } = require('express-validator');
const express = require('express');
const paginate = require('express-paginate');
const app = express();
app.use(paginate.middleware(10, 50));
const moment = require('moment')


module.exports = {
	getDetailProfileByParamsID: (req, res,) => {
		const errorFormatter = ({ msg, param }) => {
            // Build your resulting errors however you want! String, object, whatever - it works!
            return {
                "key": param,
                "message": msg
            };
          };

        const result = validationResult(req).formatWith(errorFormatter);
        if (!result.isEmpty()) {
        return res.status(400).json({ 
            "status": "error",
            "code": 400,
            "errors": result.array() });
        }
		
        user_game.findOne({
            where: {id: req.params.id}
        }).then(result => {
            res.status(200).json({ 
                "status": "success",
                "message": "berhasil get detail profile",
                "code": 200,
                "data": result,
                'data1': moment(result.createdAt).format('DD MMM YYYY')
            });
        }).catch(err => {
            res.status(400).json({ 
                "status": "error",
                "code": 400,
                "errors": err});
        })

	},
    updateProfileByID: (req, res) => {
        const errorFormatter = ({ msg, param }) => {
            // Build your resulting errors however you want! String, object, whatever - it works!
            return {
                "key": param,
                "message": msg
            };
          };
		
        const result = validationResult(req).formatWith(errorFormatter);
        if (!result.isEmpty()) {
        return res.status(400).json({ 
            "status": "error",
            "code": 400,
            "errors": result.array() });
        }
        
        console.log("req body : " + req.body)
        if(!req.body){
            return res.status(400).json({ 
                "status": "error",
                "code": 400,
                "errors": "tolong isi data profil"
            })
        }

        user_game.update(req.body, {where: {id: req.params.id}})
        res.status(200).json({ 
            "status": "success",
            "message": "berhasil update profile",
            "code": 200,
            "data": req.body
        })
    }
};
