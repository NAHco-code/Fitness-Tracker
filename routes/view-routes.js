const router = require('express').Router();
const path = require('path');

routes.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));
router.get('/exercise', (req, res) => res.sendFile(path.join(__dirname, '../public/exercise.html')));
router.get('/stats', (req, res) => res.sendFile(path.join(__dirname, '../public/stats.html')));

router.get('*', (req, res) => res.redirect('/'));

module.exports = router;
