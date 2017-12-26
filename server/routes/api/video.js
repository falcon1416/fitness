var router = require('koa-router')();
var videoController = require('../../app/controllers/videoController');

router.post('/list', videoController.list);
module.exports = router;