var router = require('koa-router')();
var newsController = require('../../app/controllers/newsController');

router.post('/list', newsController.list);
module.exports = router;