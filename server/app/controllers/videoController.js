//网站库
var LeagueDB=require("../db/leagueDB");
var leagueDB=new LeagueDB();

//获取所有视频
exports.list=async(ctx,next)=>{
    let list=await leagueDB.queryVideoList();
    ctx.body={code:200,info:{list:list}};
}
