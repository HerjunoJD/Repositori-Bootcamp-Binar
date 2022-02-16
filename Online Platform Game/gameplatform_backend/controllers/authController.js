const { user_game, user_game_history } = require('../models');
const { validationResult } = require('express-validator');
const express = require('express');
const paginate = require('express-paginate');
const app = express();
app.use(paginate.middleware(10, 50));


module.exports = {
	register: (req, res) => {
		const errorFormatter = ({ msg, param }) => {
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
		// Kita panggil static method register yang sudah kita buat tadi
		user_game
			.register(req.body)
			.then((result) => {
				res.status(201).json({
					result: 'SUCCESS',
					message: result
				});
			})
			.catch((err) => {
				res.status(500).json({
					result: 'FAILED',
					message: err
				});
			});
	},
	getAll: (req, res) => {
		user_game.findAll().then(result => {
			res.status(200).json({
				result: 'SUCCESS',
				message: result
			});
		})
	},
	getAllPagination: (req, res) => {
		user_game.findAndCountAll({limit: req.query.limit, offset: req.skip})
		.then(results => {
			const itemCount = results.count;
			const pageCount = Math.ceil(results.count / req.query.limit);
  
			res.json({
				status: "success",
				code : 200,
				data: results.rows,
				pageCount,
				itemCount
			})
  
		}).catch(err => {
			res.json({
				"status": "error",
				"code": 404,
				"message" : err
			}, 404)
		})
	},

	deleteUser: async (req, res) => {
		await user_game.destroy({where: {id : req.body.id}})
		.then(user_game_history.destroy({where: {id_user_game : req.body.id}}))
		res.json({
			"status": "success",
			"code": 200,
			"message": "User has been deleted"
		})
	},

	navbarPoint: async (req, res) => {
		if(req.params.id == undefined){
			res.json({
				status: "failed",
				code : 400
			})
			return;
		}

		let user = await user_game.findOne({where: {id: req.params.id}})
		//Kalau user tidak terdaftar maka send status failed
		if(!user){
			res.json({
				status: "failed",
				code : 400
			})
		}

		//Kalau user terdaftar di database, send data skor dan badge achievement ke frontend
		else {
			let point = await user_game_history.sum('point', {where: {id_user_game: req.params.id}})
			let badge = ''
			if(point < 400){
				badge = 'Newbie'
			} else if(point >= 400 && point < 900){
				badge = 'Medium'
			} else if(point >= 900 && point < 1600){
				badge = 'Hard'
			} else {
				badge = 'Pro'
			}

			res.json({
				status: "success",
				code : 200,
				point: point,
				badge: badge
			})
		}
	}
};
