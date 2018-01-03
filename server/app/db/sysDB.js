var db = require("./db");

class SysDB {
    //查询动作类型
    async queryAllType(type) {
        if (parseInt(type) != -1) {

            let sql = "select * from sys_type where parent_id=" + type + " and status=1 ";
            let list = await db.run(sql);
            return list;
        } else {
            //查询所有类型,如果有子类型，就过滤父类型
            let sql = "select * from sys_type where parent_id!=0 and status=1 ";
            let sub_list = await db.run(sql);

            let parent_ids = "-1";
            for (let i = 0; i < sub_list.length; i++) {
                parent_ids += "," + sub_list[i].parent_id;
            }

            sql = "select * from sys_type where id not in (" + parent_ids + ") and status=1 and parent_id=0 ";
            let list = await db.run(sql);
            list = list.concat(sub_list);
            list.sort(function (a, b) {
                if(a.id>b.id) return 1;
                else return -1;
            });
            return list;
        }

    }

    //添加动作类型
    async addType(name, parent_id) {
        let sql = "select * from sys_type where name='" + name + "' and status=1 ";
        let list = await db.run(sql);
        if (list.length > 0) {
            return { err: '名称重复' };
        }

        sql = "insert into sys_type(name,parent_id)value('" + name + "','" + parent_id + "')";
        await db.run(sql);
        return null;
    }

    //删除动作类型
    async delType(id) {
        let sql = "update  sys_type set status=2 where id=" + id;
        await db.run(sql);
        return null;
    }

    //查询训练动作
    async queryAllMotion(type) {
        let sql = "select * from sys_motion where status=1 ";
        let list = await db.run(sql);
        return list;
    }

    //添加训练动作
    async addMotion(title, desc, type) {
        let sql = "select * from sys_motion where title='" + title + "' and status=1 ";
        let list = await db.run(sql);
        if (list.length > 0) {
            return { err: '名称重复' };
        }

        sql = "insert into sys_motion(title,`desc`,type)value('" + title + "','" + desc + "','" + type + "')";
        await db.run(sql);
        return null;
    }

    //删除训练动作
    async delMotion(id) {
        let sql = "update  sys_motion set status=2 where id=" + id;
        await db.run(sql);
        return null;
    }
}

module.exports = SysDB;