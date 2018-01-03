var router = require('koa-router')();
var sysController = require('../../app/controllers/sysController');

router.post('/allType', sysController.allType);
router.post('/addType', sysController.addType);
router.post('/delType', sysController.delType);

router.post('/allMotion', sysController.allMotion);
router.post('/addMotion', sysController.addMotion);
router.post('/delMotion', sysController.delMotion);

module.exports = router;