var db = require("./db");

class LeagueDB{
    //查询赛事的所有城市
    async queryAllProvince() {
        let sql = "select t.province_id,ifnull(spm_sys_zone.short_name,'其它') as province_name from ( select province_id from league GROUP BY province_id) as t left join spm_sys_zone on spm_sys_zone.id=t.province_id where t.province_id!=0 order by t.province_id";
        let list = await db.run(sql);
        //做一个排序，最后一个位置是其它，第一个位置是全国
        var out_list = [];
        out_list.push({ province_id: -1, province_name: '全国' });
        out_list = out_list.concat(list)
        out_list.push({ province_id: 0, province_name: '其它' });
        return out_list;
    }

    //查询赛事的所有的赛制
    async queryAllMainPlayers() {
        let sql = "select main_players from league where main_players!=0 GROUP BY main_players";
        let list = await db.run(sql);
        var out_list = [];
        out_list.push({ id: -1, name: "全部" });
        for (var i = 0; i < list.length; i++) {
            let main_players = list[i]["main_players"];
            out_list.push({ id: main_players, name: main_players + "人制" });
        }
        return out_list;
    }

    //查询赛事的所有年份
    async queryAllYear() {
        let sql = "select * from (select startime_year as year from league where startime_year is not null GROUP BY startime_year) as t order by t.year desc";
        let list = await db.run(sql);
        var out_list = [];
        out_list.push({ id: -1, name: "全部" });
        for (var i = 0; i < list.length; i++) {
            let year = list[i]["year"];
            out_list.push({ id: year, name: year });
        }
        return out_list;
    }

    //获取列表的sql
    async queryListSQL(fields,filter,start=-1,limit=10){
        let sql="select "+fields+"  from league ";
        sql+=" left join spm_sys_zone on spm_sys_zone.id=league.province_id ";
        let where=" where 1=1 ";
       
        if(filter){
            if(filter.province_id!=-1){
                where+=" and league.province_id='"+filter.province_id+"' ";
            }

            if(filter.mainplayers_id!=-1){
                where+=" and league.main_players='"+filter.mainplayers_id+"' ";
            }

            if(filter.year!=-1){
                where+=" and league.startime_year='"+filter.year+"' ";
            }

            if(filter.name.length>0){
                where+=" and league.name like '%"+filter.name+"%' ";
            }
        }
        sql+=where;

        sql+=" ORDER BY league.`order`,league.startime desc";
        if(start!=-1){
            sql+=" limit "+(start)*limit+","+limit;
        }
        return sql;
    }

    //获取列表总数
    async queryList(filter,start,limit) {
        start=start-1;
        let fields="league.startime_year,ifnull(league.startime,\"\")  as league_time,league.`order`,league.id,league.name,league.banner,league.main_players,league.province_id,ifnull(spm_sys_zone.short_name,\"全国\") as province_name";
        let sql=await this.queryListSQL(fields,filter,start,limit);
        let list = await db.run(sql);
        var out_list=[];
        for(var i=0;i<list.length;i++){
            var obj=list[i];
            //banner压缩
            if(obj.banner){
                obj.banner+="?x-oss-process=image/resize,h_360";
            }
            //时间处理，只获取年
            if(obj.league_time.length>10){
                obj.league_time=obj.league_time.substr(0,10);
            }
            //人制
            if(obj.main_players){
                obj.main_players+="人制";
            }
            out_list.push(obj);
        }
        return out_list;
    }

    //获取列表数据的总数
    async queryListCount(filter) {
        let fields=" count(*) as count ";
        let sql=await this.queryListSQL(fields,filter);
        let info=await db.getOne(sql);
        if(info){
            return info["count"];
        }else{
            return 0;
        }
    }

    //获取视频列表
    async queryVideoList(){
        let sql=" select match_id,`desc`,video_cover as cover,video_url as url,is_live from match_video where video_cover!='' and video_url!='' order by id desc limit 21 ";
        let list = await db.run(sql);
        return list;
    }
}

module.exports = LeagueDB;