var db = require("./db");

class SysDB{
    //查询类型
    async queryAllType(type) {
        let sql = "select * from sys_type where parent_id="+type;
        let list = await db.run(sql);
        return list;
    }

    //添加类型
    async addType(name,parent_id) {
        let sql = "select * from sys_type where name='"+name+"'";
        let list = await db.run(sql);
        if(list.length>0){
            return {err:'名称重复'};
        }

        sql="insert into sys_type(name,parent_id)value('"+name+"','"+parent_id+"')";
        await db.run(sql);
        return null;
    }
}

module.exports = SysDB;