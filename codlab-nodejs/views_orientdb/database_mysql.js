var mysql      = require('mysql'); //모듈을 읽어와라!
var conn = mysql.createConnection({
  host     : 'hello5mysql.ci9ipxrkurji.ap-northeast-2.rds.amazonaws.com',
  user     : 'master',
  password : 'byefive5%5',
  port     : '3306'
});
conn.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
//   });
  
//   connection.end();

/* 
var sql = 'SELECT * FROM tmp.json_test';
/* err
rows 배열보여주기(지금 중요한 것)
fields는 중요하지 않음
conn.query(sql, function(err, rows, fields){
    if(err){
        console.log(err);
    } else {
        for(var i=0; i<rows.length; i++){
            console.log(rows[i].test1);
        }
    }
}); */

//치환자로 변경

/* var sql = 'INSERT INTO tmp.test_board(title, author) VALUES(?, ?)';
var params = ['student', 'hello'];
conn.query(sql, params, function(err, rows, fields){
    if(err){
        console.log(err);
    } else {
        console.log(rows.id);
    }
});
conn.end(); */


//수정
/* var sql = 'UPDATE tmp.test_board set title=?, author=? WHERE seq=?';
var params = ['npm', 'lllll', 3];
conn.query(sql, params, function(err, rows, fields){
    if(err){
        console.log(err);
    } else {
        console.log(rows);
    }
});
conn.end(); */

//삭제
var sql = 'DELETE FROM tmp.test_board WHERE seq=?';
var params = [1];
conn.query(sql, params, function(err, rows, fields){
    if(err){
        console.log(err);
    } else {
        console.log(rows);
    }
});
conn.end();