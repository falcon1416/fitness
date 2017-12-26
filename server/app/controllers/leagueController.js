//网站库
var LeagueDB=require("../db/leagueDB");
var leagueDB=new LeagueDB();

var StatsDB=require("../db/statsDB");
var sDB=new StatsDB();

//查询赛事所有的城市
exports.allProvince=async(ctx,next)=>{
    let list=await leagueDB.queryAllProvince();
    ctx.body={code:200,info:list};
}

//查询赛事所有的赛制
exports.allMainPlayers=async(ctx,next)=>{
    let list=await leagueDB.queryAllMainPlayers();
    ctx.body={code:200,info:list};
}

//查询赛事所有的年份
exports.allYear=async(ctx,next)=>{
    let list=await leagueDB.queryAllYear();
    ctx.body={code:200,info:list};
}

//查询赛事筛选条件
exports.filterInfo=async(ctx,next)=>{
    let province_list=await leagueDB.queryAllProvince();
    let mainplayers_list=await leagueDB.queryAllMainPlayers();
    let year_list=await leagueDB.queryAllYear();

    ctx.body={code:200,info:{
        province:province_list,
        mainplayers:mainplayers_list,
        year:year_list,
    }};
}



//查询所有赛事
exports.list=async(ctx,next)=>{
    let page=ctx.request.body.page;
    let filter=ctx.request.body.filter;
    let list=await leagueDB.queryList(filter,page,10);
    let total_count=await leagueDB.queryListCount(filter);
    ctx.body={code:200,info:{list:list,total:total_count,page:1}};
}

//赛事统计信息
exports.stats=async(ctx,next)=>{
    let id=ctx.request.body.id;
    if(!id){
        ctx.body={code:500,error:"没有参数"};
        next();
        return;
    }

    let where=" league_id= "+id;
    let match_count=await sDB.queryMatchCount(where);
    let player_count=await sDB.queryLeaguePlayerCount(where+" and rights=3 ");
    let other_player_count=await sDB.queryLeaguePlayerCount(where+" and rights!=3 ");
    let team_count=await sDB.queryLeagueTeamCount(where);
    let match_player_count=await sDB.queryMatchPlayerCount(where);
    let goal_count=await sDB.queryEventCount(where+" and type in (1,12,13,14) ");
    let yellow_card_count=await sDB.queryEventCount(where+" and type in (2) ");
    let red_card_count=await sDB.queryEventCount(where+" and type in (3) ");

    let out_data={};
    out_data["match_count"]=match_count;
    out_data["player_count"]=player_count;
    out_data["other_player_count"]=other_player_count;
    out_data["team_count"]=team_count;
    out_data["match_player_count"]=match_player_count;
    out_data["goal_count"]=goal_count;
    out_data["yellow_card_count"]=yellow_card_count;
    out_data["red_card_count"]=red_card_count;


    ctx.body={code:200,info:out_data};
}
