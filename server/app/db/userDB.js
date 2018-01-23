var db = require("./db");
const moment = require('moment');

class UserDB {
    //查询用户
    async queryAllUser() {
        let sql = "select * from user ";
        let list = await db.run(sql);
        return list;
    }

    //查询用户信息
    async queryUserInfo(uid){
        let sql = "select * from user where uid= "+uid;
        let info = await db.getOne(sql);

        sql="select * from u_body where uid="+uid+" order by create_time desc  "
        let body_info= await db.getOne(sql);
        info = Object.assign(info, body_info);
        info['create_time']=moment(info['create_time']).format("YYYY-MM-DD");
        return info;
    }

    //添加用户信息
    async addBody(uid,data){
        let f_sql="";
        let v_sql="";
        for(let key in data){
            f_sql+="`"+key+"`,";
            v_sql+="'"+data[key]+"',";
        }
        
        f_sql+="`uid`";
        v_sql+="'"+uid+"'";

        let sql="insert into u_body("+f_sql+")values("+v_sql+")";
        let info=await db.run(sql);
    }
}

module.exports = UserDB;