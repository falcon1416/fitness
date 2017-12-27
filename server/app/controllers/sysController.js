//网站库
var SysDB=require("../db/sysDB");
var sysDB=new SysDB();


//查询类型
exports.allType=async(ctx,next)=>{
    let type_id=ctx.request.body.type_id;
    if(!type_id){
        type_id=0;
    }

    let list=await sysDB.queryAllType(type_id);
    ctx.body={code:200,info:list};
}

//添加类型
exports.addType=async(ctx,next)=>{
    let parent_id=ctx.request.body.parent_id;
    if(!parent_id){
        parent_id=0;
    }

    let name=ctx.request.body.name;
    if(!name || name.length==0){
        ctx.body={code:500,err:"名字不能为空"};
        next();
        return;
    }

    let result=await sysDB.addType(name,parent_id);
    if(!result){
        ctx.body={code:500,err:result.err};
        next();
        return;
    }

    //添加成功,查询所有类型
    let list=await sysDB.queryAllType(type_id);
    ctx.body={code:200,info:list};
}

