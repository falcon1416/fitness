var router = require('koa-router')();
var userController = require('../../app/controllers/userController');

router.post('/allUser', userController.allUser);
router.post('/userInfo', userController.userInfo);
router.post('/addBody', userController.addBody);

module.exports = router;