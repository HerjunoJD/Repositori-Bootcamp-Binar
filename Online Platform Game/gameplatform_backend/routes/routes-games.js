const express = require('express')
require('express-group-routes')
const app = express()
const gamesController = require('../controllers/gameController')

app.group('/history',  router => {
    router.post('/add', gamesController.addHistory)
})

app.get('/leaderboard/:id', gamesController.showLeaderboard)
app.get('/leaderboardpaginate/:id', gamesController.showLeaderboardPaginate)
app.get('/leaderboard/cekgame/:id', gamesController.cekGame)


module.exports = app