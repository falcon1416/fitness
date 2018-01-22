import $ from 'jquery'

var json = {
    //训练类型
    "SYS_TYPE_URL": "/api/sys/allType",
    //添加训练类型
    "ADD_SYS_TYPE_URL": "/api/sys/addType",
    //删除训练类型
    "DEL_SYS_TYPE_URL": "/api/sys/delType",

    //训练动作
    "SYS_MOTION_URL": "/api/sys/allMotion",
    //添加训练动作
    "ADD_SYS_MOTION_URL": "/api/sys/addMotion",
    //删除训练动作
    "DEL_SYS_MOTION_URL": "/api/sys/delMotion",
}

function post(key, data, cb) {
    let url = process.env.SERVER_URL+ json[key];
    
    var token ="";

    $.ajax({
        //请求类型，这里为POST
        type: 'POST',
        //你要请求的api的URL
        url: url,
        //是否使用缓存
        cache: false,
        //数据类型，这里我用的是json
        //dataType: "json",
        //必要的时候需要用JSON.stringify() 将JSON对象转换成字符串
        data: data, //data: {key:value},
        headers: { 'token': token },
        //请求成功的回调函数
        success: function(data) {
            var obj = data;
            console.log(obj);
            if (obj.code == 200) {
                cb(obj.code, obj.err, obj.info);
            } else {
                $toast.show(obj.err, 2000)
                cb(obj.code, obj.err, null)
            }
        },
    });
}

// 返回在vue模板中的调用接口
export default {
	post: post
}