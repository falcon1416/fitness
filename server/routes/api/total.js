var router = require('koa-router')();
var totalController = require('../../app/controllers/totalController');

router.post('/home', totalController.home);
router.post('/country', totalController.country);

module.exports = router;