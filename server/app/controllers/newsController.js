//网站库
var LeagueDB=require("../db/leagueNewsDB");
var leagueDB=new LeagueDB();

//查询所有赛事资讯
exports.list=async(ctx,next)=>{
    let page=ctx.request.body.page;
    let filter=ctx.request.body.filter;
    let list=await leagueDB.queryList(filter,page,15);
    let total_count=await leagueDB.queryListCount(filter);
    ctx.body={code:200,info:{list:list,total:total_count,page:1}};
}
