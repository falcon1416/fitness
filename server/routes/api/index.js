var router = require('koa-router')();
var sys = require('./sys');
var user = require('./user');

router.use('/api/sys', sys.routes(), sys.allowedMethods());
router.use('/api/user', user.routes(), user.allowedMethods());

module.exports = router;