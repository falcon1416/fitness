var router = require('koa-router')();
var total = require('./total');
var league = require('./league');
var video = require('./video');
var news = require('./news');

router.use('/api/total', total.routes(), total.allowedMethods());
router.use('/api/league', league.routes(), league.allowedMethods());
router.use('/api/video', video.routes(), video.allowedMethods());
router.use('/api/news', news.routes(), news.allowedMethods());

module.exports = router;