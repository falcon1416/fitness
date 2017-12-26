var tunnel = require('tunnel-ssh');
const mysql = require('mysql2');
const wrapper = require('co-mysql');
var config = require('../../config/config.json')['website-db'];

var _pool  = null;

//初始化
let init=async function(){
    if(1==1){
        return new Promise(function (resolve, reject) {
            let path=process.cwd();
            let sshConfig=config.ssh;
            sshConfig.privateKey=require('fs').readFileSync(path+'/config/ssh-key');
            var sshconn = tunnel(sshConfig, function (error, server) {
                if(error){
                    return console.log("SSH connection error: " + error);
                }
                console.log(server);
                console.log('database connection initalizing ...');
            
                _pool  = mysql.createPool(config.db);
    
                resolve();
                
            
            });
            
            sshconn.on('error', function(err){
                console.error('SSH Error: ', err);
            });
        });
    }else{
        //不需要打洞，直接访问
        _pool  = mysql.createPool(config.db);
    }
}

let run=async function(sql){
    if(!_pool){
        //初始化
        await init();
    }

    return new Promise(function (resolve, reject) {
        _pool.query(sql, function(err, rows, fields) {
            resolve(rows);
        });
    });
}

let getOne=async function(sql){
    let list=await run(sql+" limit 1");
    if(list.length==0) return null;

    return list[0];
}

let queryCount=async function(table,where="1=1"){
    let sql="select count(*) as count from `"+table+"` where "+where
    let info=await getOne(sql);
    if(info){
        return info["count"];
    }else{
        return 0;
    }
}

module.exports = {
    run,
    getOne,
    queryCount
}

