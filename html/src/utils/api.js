import $ from 'jquery'

var json = {
    //类型
    "SYS_TYPE_URL": "/api/sys/allType",
}

function post(key, data, cb) {
    let url;
    url = "http://localhost:3000"+ json[key];
    
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
                cb(obj.code, obj.message, obj.info);
            } else {
                $.toast(message);
                cb(obj.code, message, null)
            }
        },
    });
}

// 返回在vue模板中的调用接口
export default {
	post: post
}