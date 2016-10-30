var mysql = require('mysql');
var path = require('path');
var config = require(path.resolve('config'));
var connection = mysql.createConnection({
    host     : config.get("mysql:host"),
    user     : config.get("mysql:username"),
    password : config.get("mysql:password"),
    database : config.get("mysql:db")
});

var db = {};
db.getUsers = function(req,res){
    connection.query("select * from users",function(error,result,field){
        if(error){
            console.log(error);
        }
        res.end(JSON.stringify(result));
    });
};
db.getUser = function(req,res){
    connection.query("select * from users where id = "+req.params.id,function(error,result,field){
        if(error){
            console.log(error);
        }
        if(result.length>0){
            res.end(JSON.stringify(result[0]));
        }else res.end(false);

    });
};
db.addUser = function(req,res){
    var user = req.body;
    connection.query("insert into users set ?",user,function(error,result){
       if(error){
           console.log(error);
           res.end("new user is name "+user.name+" not add");
       }else {
           console.log("new user id: "+result.insertId);
           res.end("new user add, id: "+result.insertId);
       }
    });
};
db.updateUser = function(req,res){
    var user = req.body;
    connection.query("update users set ? where id = ?",[user,user.id],function(error,result){
        if(error){
            console.log(error);
            res.end("user is id "+user.id+" not update");
        }else {
            if(result.changedRows>0){
                res.end("user is id "+user.id+" update");
            }else res.end("user is id "+user.id+" not update, because the user does not exist according id");
        }
    });
};
db.deleteUser = function(req,res){
    connection.query("delete from users where id = "+req.params.id,function(error,result,field){
        if(error){
            console.log(error);
            res.end("user is id "+req.params.id+" not delete");
        }else {
            if(result.affectedRows>0){
                res.end("user is id "+req.params.id+" delete");
            }else res.end("user is id "+req.params.id+" not delete, because the user does not exist according id");
        }
    });
}


module.exports =db;