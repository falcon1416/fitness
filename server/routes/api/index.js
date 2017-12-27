var router = require('koa-router')();
var sys = require('./sys');

router.use('/api/sys', sys.routes(), sys.allowedMethods());

module.exports = router;