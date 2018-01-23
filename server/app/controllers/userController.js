var UserDB=require("../db/userDB");
var userDB=new UserDB();


//查询所有用户
exports.allUser=async(ctx,next)=>{
    let list=await userDB.queryAllUser();
    ctx.body={code:200,info:list};
}

//查询用户信息
exports.userInfo=async(ctx,next)=>{
    let uid=ctx.request.body.uid;
    if(!uid){
        ctx.body={code:500,err:"uid不能为空"};
        next();
        return;
    }

    let info=await userDB.queryUserInfo(uid);
    ctx.body={code:200,info:info};
}

//添加身体参数
exports.addBody=async(ctx,next)=>{
    let data=ctx.request.body.data;
    let uid=ctx.request.body.uid;
    if(!data || !uid){
        ctx.body={code:500,err:"data不能为空"};
        next();
        return;
    }

    await userDB.addBody(uid,data);
    ctx.body={code:200};
}