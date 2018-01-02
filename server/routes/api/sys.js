var router = require('koa-router')();
var sysController = require('../../app/controllers/sysController');

router.post('/allType', sysController.allType);
router.post('/addType', sysController.addType);
router.post('/delType', sysController.delType);
module.exports = router;