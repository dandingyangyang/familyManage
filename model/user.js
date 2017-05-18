/**
 * Created by xiaowei on 16-9-13.
 */

var connection;

/**
 * user表的属性
 * id, name, email, password, role
 */
function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.email = user.email;
    this.role = user.role;
    this.detail = user.detail;
}

exports.User = User;
exports.setConnection = function(conn) {
    connection = conn;
}


User.prototype.save = function(callback) {
    var user = {
        name: this.name,
        password: this.password,
        email: this.email,
        role: this.role,
        detail: this.detail,
    };
    connection.query('insert into users (name, password, email, role, detail) values (?,?,?,?,?)',[user.name,user.password,user.email,user.role,user.detail],
        function(err, row, fields) {
            if(err) {
                console.log('save user error ' + err.message);
                return callback(err);
            }
            console.log('save user success ');
            callback(null);
        })
    ;
}

User.update = function(email, user, callback) {
    var detail = JSON.stringify(user.detail);
    connection.query('update users set name= ? ,detail= ? where email = ?;', [user.name, detail, email] ,
    function(err, row, fileds) {
      if(err) {
          console.log('update user error' + err.message);
          return callback(err);
      }
      console.log('update user success');
      callback(null);
    });
}

User.get = function(email, callback) {
    connection.query('select * from users where email = "' + email + '"', function(err, rows, fields) {
        if(err) {
            console.log('get user error: ' + err.message);
            return callback(err);
        }
        console.log('get user success ' );
        if(rows.length == 0) {
            callback(null, null);
        }else{
            callback(null, rows);
        }
    })
}

User.getAll = function(callback) {
    connection.query('select * from users', function(err, rows, fields) {
        if(err) {
            console.log('get all user error: ' + err.message);
            return callback(err);
        }
        console.log('get all user success.');
        callback(null, rows);
    });
}

User.moidfyCompetence = function(userid, rolename) {
    connection.query('UPDATE users SET role="' + rolename + '" WHERE id="' + userid + '"', function(err, rows, fields) {
        if(err) {
            console.log("fail to modify users competence whose id = " + userid)
            return;
        }
        console.log("success to modify users competence whose id = " + userid)
    });
}

User.deleteUser = function(userid) {
    connection.query('DELETE FROM users WHERE id="' + userid + '"', function(err, rows, fields) {
        if(err) return console.log("fail to delete user whose id = " + userid);
        console.log("success to delete user whose id = " + userid)
    });
}
