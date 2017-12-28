
var mysql      = require('mysql'); //모듈을 읽어와라!
var conn = mysql.createConnection({
    host     : 'hello5mysql.ci9ipxrkurji.ap-northeast-2.rds.amazonaws.com',
    user     : 'master',
    password : 'byefive5%5',
    port     : '3306',
    charset  : 'utf8'
  });
 conn.connect();

