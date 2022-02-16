var express = require('express');
var router = express.Router();
const auth = require('../controllers/authController');

// Bagian ini untuk melihat apakah server sudah bisa diakses atau belum
router.get('/', (req, res) => {
    res.status(200).json({message : "API telah terhubung!"})
})

router.get('/skornavbar/:id', auth.navbarPoint);
router.delete('/delete', auth.deleteUser);
module.exports = router;
