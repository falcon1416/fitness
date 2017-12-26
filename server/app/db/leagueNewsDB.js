var db = require("./db");
var moment = require('moment');

class LeagueNewsDB{
    //获取列表的sql
    async queryListSQL(fields,start=-1,limit=10){
        let sql="select "+fields+"  from league_news ";
        let where=" where 1=1 and (title !='赛事规则' and title !='赛事规章') and image <>'' ";
       

        sql+=where;

        sql+=" ORDER BY league_news.create_time desc";
        if(start!=-1){
            sql+=" limit "+(start)*limit+","+limit;
        }
        return sql;
    }

    //获取列表总数
    async queryList(filter,start,limit) {
        start=start-1;
        let fields=" id,title,image,create_time ";
        let sql=await this.queryListSQL(fields,start,limit);
        let list = await db.run(sql);
        var out_list=[];
        for(var i=0;i<list.length;i++){
            var obj=list[i];
            obj.create_time=moment(obj.create_time).format("YYYY-MM-DD HH:mm");
            out_list.push(obj);
        }
        return out_list;
    }

    //获取列表数据的总数
    async queryListCount(filter) {
        let fields=" count(*) as count ";
        let sql=await this.queryListSQL(fields);
        let info=await db.getOne(sql);
        if(info){
            return info["count"];
        }else{
            return 0;
        }
    }
}

module.exports = LeagueNewsDB;