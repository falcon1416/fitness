var db=require("./db");

class StatsDB{
    //查询赛事个数
    async queryLeagueCount(){
        let count=await db.queryCount("league");
        return count; 
    }

    //查询球队个数
    async queryTeamCount(where="1=1"){
        let count=await db.queryCount("team",where);
        return count; 
    }

    //查询赛事球队个数
    async queryLeagueTeamCount(where="1=1"){
        let count=await db.queryCount("league_team",where);
        return count; 
    }

    //查询球员个数
    async queryPlayerCount(where="1=1"){
        let count=await db.queryCount("player",where);
        return count; 
    }

    //查询参赛球员个数
    async queryLeaguePlayerCount(where="1=1"){
        let count=await db.queryCount("league_player",where);
        return count; 
    }

    //查询比赛个数
    async queryMatchCount(where="1=1"){
        let count=await db.queryCount("match",where);
        return count; 
    }

    //查询参赛人数
    async queryMatchPlayerCount(where="1=1"){
        let count=await db.queryCount("match_lineups",where);
        return count; 
    }

    //查询球场个数
    async queryFieldCount(where="1=1"){
        
    }

    //查询球场个数
    async queryCityCount(){
        let sql="select count(*) as count from (select city_id from `spm_place`  GROUP BY city_id ) as t";
        let info=await db.getOne(sql);
        if(info){
            return info["count"];
        }else{
            return 0;
        }
    }

    //查询事件
    async queryEventCount(where="1=1"){
        let count=await db.queryCount("match_event",where);
        return count; 
    }
    
    //查询企业个数
    async queryOrganizerCount(){
        let sql="select count(*) as count from (select organizer_name from `league`  GROUP BY organizer_name ) as t";
        let info=await db.getOne(sql);
        if(info){
            return info["count"];
        }else{
            return 0;
        }
    }


    //查询每个省的数据
    async queryProvinceCount(){
        let sql="select t.*,spm_sys_zone.short_name as province_name from (select count(*) as count,province_id from league where league.province_id!=0 GROUP BY province_id) as t";
        sql+=" left join spm_sys_zone on spm_sys_zone.id=t.province_id and spm_sys_zone.level_type=1 ";
        let list=await db.run(sql);

        //查询其它没有的省份
        // sql=" select spm_sys_zone.short_name as province_name,spm_sys_zone.id as province_id from spm_sys_zone where spm_sys_zone.level_type=1 and id not in (select province_id from league where province_id is not null)";
        // let array=await db.run(sql);
        // for(var i=0;array.length;i++){
        //     // var obj=array[i];
        // //     // obj["count"]=0;
        // //     // list.push(obj);
        // }

        return list;
    }
}

module.exports=StatsDB;