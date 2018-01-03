//网站库
var SysDB=require("../db/sysDB");
var sysDB=new SysDB();


//查询训练类型
exports.allType=async(ctx,next)=>{
    let parent_id=ctx.request.body.parent_id;
    if(!parent_id){
        parent_id=0;
    }

    let list=await sysDB.queryAllType(parent_id);
    ctx.body={code:200,info:list};
}


//添加训练类型
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
    if(result!=null){
        ctx.body={code:500,err:result.err};
        next();
        return;
    }

    ctx.body={code:200};
}

//删除训练类型
exports.delType=async(ctx,next)=>{
    let id=ctx.request.body.id;
    if(!id){
        ctx.body={code:500,err:"id不能为空"};
        next();
        return;
    }

    await sysDB.delType(id);
    ctx.body={code:200};
}


//查询训练动作
exports.allMotion=async(ctx,next)=>{
    let list=await sysDB.queryAllMotion();
    ctx.body={code:200,info:list};
}

//添加训练动作
exports.addMotion=async(ctx,next)=>{
    let desc=ctx.request.body.desc;
    if(!desc){
        desc='';
    }

    let title=ctx.request.body.title;
    if(!title || title.length==0){
        ctx.body={code:500,err:"名字不能为空"};
        next();
        return;
    }

    let type=ctx.request.body.type;
    if(!type || type.length==0){
        ctx.body={code:500,err:"类型不能为空"};
        next();
        return;
    }

    let result=await sysDB.addMotion(title,desc,type);
    if(result!=null){
        ctx.body={code:500,err:result.err};
        next();
        return;
    }

    ctx.body={code:200};
}

//删除训练类型
exports.delMotion=async(ctx,next)=>{
    let id=ctx.request.body.id;
    if(!id){
        ctx.body={code:500,err:"id不能为空"};
        next();
        return;
    }

    await sysDB.delMotion(id);
    ctx.body={code:200};
}
