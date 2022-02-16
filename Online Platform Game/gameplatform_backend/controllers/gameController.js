// controllers/authController.js
const {user_game_history, user_game} = require('../models');
const { validationResult } = require('express-validator');
const express = require('express');
const paginate = require('express-paginate');
const app = express();
app.use(paginate.middleware(10, 50));


module.exports = {
    addHistory: async (req, res) => {
       // Pertama-tama data user dan game history yang bersangkutan dicari terlebih dahulu
       // Jika datanya ada, maka data tersebut akan diberikan update
       // Jika tidak ada, data tersebut akan dibuat dan dimasukkan ke database
       let dataHistoryUser = await user_game_history.findOne({where: {id_user_game: req.body.user_id, game_id: req.body.game_id}})
       if(dataHistoryUser){
            let totalPlay = dataHistoryUser.total_play + 1
            let totalSkor = dataHistoryUser.point + req.body.point
            let updateHistory = await user_game_history.update({point : totalSkor, total_play : totalPlay},
                {where: {id_user_game: req.body.user_id, game_id: req.body.game_id}} )
            if(updateHistory){
                res.status(200).json({
                    "status": "success",
                    "message": "berhasil tambah history",
                    "code": 200,
                    "data": updateHistory
                });
            } else {
                res.status(400).json({ 
                    "status": "error",
                    "code": 400});
            }

       } else {
            // Keberadaan user diperiksa terlebih dahulu apakah ada atau tidak di database
            // Jika ada maka data game history akan dibuat dan dimasukkan ke database
            let checkUser = await user_game.findOne({where : {id : req.body.user_id}})
            if(!checkUser){
                res.status(400).json({ 
                    "status": "error",
                    "code": 400,
                    "message": "user tidak terdaftar di database"});
                    return;
            }
            let createHistory = await user_game_history.create({
                  id_user_game:req.body.user_id,
                  game_id: req.body.game_id,
                  point: req.body.point,
                  total_play: 1
            })
            if(createHistory){
                res.status(200).json({ 
                    "status": "success",
                    "message": "berhasil tambah history",
                    "code": 200,
                    "data": createHistory
                });
            } else {
                res.status(400).json({ 
                    "status": "error",
                    "code": 400});
            }
       }
    },

    //Berikut adalah kodingan untuk menunjukkan skor di leaderboard
    //Pertama-tama, cari terlebih dahulu game yang ingin ditunjukkan skor dkk nya
    //Hal ini diambil dari tabel user game history yang menyimpan poin dan id player
    //Setelah itu semua data yang berhubungan dengan game yang bersangkutan diambil (lewat game_id)
    //Order di bawah digunakan untuk menyortir data dari point tertinggi
    //Setelah itu data yang sudah difilter dan disortir akan dikirim dalam bentuk json
    showLeaderboard: async (req,res) => {
        if(req.params.id == undefined || !req.params.id){
			res.json({
				status: "failed",
				code : 404
			})
			return;
		}
        let leaderboard = await user_game_history.findAll({
            where : {game_id : req.params.id},
            include: [
                {model: user_game, as: 'user', attributes: ['username']}
            ],
            order: [["point", "DESC"]],
        })
        res.json(leaderboard)
    },

    //Koding di bawah digunakan untuk mengaplikasikan paginate ke leaderboard
    showLeaderboardPaginate: async (req,res) => {
        user_game_history.findAndCountAll({
            where : {game_id : req.params.id},
            include: [
                {model: user_game, as: 'user', attributes: ['username']}
            ],
            order: [["point", "DESC"]],
            distinct: true,
            limit: req.query.limit, offset: req.skip
        })
		.then(results => {
            const itemCount = results.count;
            const pageCount = Math.ceil(results.count / req.query.limit);

            res.json({
                status: "success",
                code : 200,
                data: results.rows,
                pageCount,
                itemCount,
            })
  
            }).catch(err => {
                res.json({
                    "status": "error",
                    "code": 404,
                    "message" : err
                }, 404)
            })
            },


    cekGame: async (req, res) => {
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
        
        await user_game_history.findAll({where: {id_user_game: req.params.id}}).then(result => {
            if(result == ''){
                res.json({ 
                    "status": "success",
                    "message": "belum pernah dimainkan",
                    "code": 200,
                    "data": result
                });
            } else {
                res.json({ 
                    "status": "success",
                    "message": "pernah dimainkan",
                    "code": 200,
                    "data": result
                });
            }
             
        }).catch(err => {
            res.status(404).json({ 
            "status": "error",
            "code": 404,
            "message": 'gagal mengakses data',
            "data": err});
        })
    }
};
