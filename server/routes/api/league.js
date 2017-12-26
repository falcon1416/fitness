var router = require('koa-router')();
var leagueController = require('../../app/controllers/leagueController');

router.post('/allprovince', leagueController.allProvince);
router.post('/allmainplayers', leagueController.allMainPlayers);
router.post('/allyear', leagueController.allYear);
router.post('/filterinfo', leagueController.filterInfo);
router.post('/list', leagueController.list);
router.post('/stats', leagueController.stats);
module.exports = router;