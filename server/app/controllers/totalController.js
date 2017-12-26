var StatsDB=require("../db/statsDB");
var sDB=new StatsDB();
//查询统计
exports.home=async(ctx,next)=>{
    let league_count=await sDB.queryLeagueCount();
    let match_count=await sDB.queryMatchCount();
    let player_count=await sDB.queryPlayerCount();
    let team_count=await sDB.queryTeamCount();
    let field_count=await sDB.queryFieldCount();
    let city_count=await sDB.queryCityCount();
    let organizer_count=await sDB.queryOrganizerCount();
    let match_player_count=await sDB.queryMatchPlayerCount();

    let out_data={};
    out_data["league_count"]=league_count;
    out_data["match_count"]=match_count;
    out_data["match_player_count"]=match_player_count;
    out_data["player_count"]=player_count;
    out_data["team_count"]=team_count;
    out_data["field_count"]=field_count;
    out_data["city_count"]=city_count;
    out_data["organizer_count"]=organizer_count;


    ctx.body={code:200,info:out_data};
}

//统计全国信息
exports.country=async(ctx,next)=>{
    let list=await sDB.queryProvinceCount();

    ctx.body={code:200,info:list};
}