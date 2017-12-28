/* 
Hello javascript!
 */
var express = require('express');   //express 모듈을 가져온다
var bodyParser = require('body-parser');
var fs = require('fs')//파일시스템 제어 기본 모듈
var mysql      = require('mysql'); //모듈을 읽어와라!
var conn = mysql.createConnection({
  host     : 'hello5mysql.ci9ipxrkurji.ap-northeast-2.rds.amazonaws.com',
  user     : 'master',
  password : 'byefive5%5',
  port     : '3306'
});
conn.connect();

var app = express();                
app.use(bodyParser.urlencoded({ extended: false })) //사용자에게 post방식으로 요청이 들어오면, 확장기능(미들웨어) 모듈을 통과한 후 라우터로 동작한다.
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views_mysql');    //템플릿파일 설정

app.get('/topic/add', function(req, res){

    var sql = 'SELECT id, test1 FROM tmp.json_test ORDER BY add_date DESC';
    conn.query(sql, function(err, rows, fields){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('add', {topics:rows});
    });
});
app.post('/topic/add', function(req, res){
    var test1 =  req.body.test1;
    var test2 = req.body.test2;
    var test3 = req.body.test3;
    var sql = 'INSERT INTO tmp.json_test (test1, test2, test3, add_date) VALUES(?,?,?, now())';
    conn.query(sql, [test1, test2, test3], function(err, result, fields){
        if(err){
            res.status(500).send('Internal Server Error');
        } else {
            //글 작성이 끝날을 시, 사용자에게 추가한 글을 보여주기 위해
            res.redirect('/topic/'+result.insertId);     
        }
    });
});
app.get(['/topic/:id/edit'], function(req, res){
    var sql = 'SELECT id, test1 FROM tmp.json_test ORDER BY add_date DESC';
    conn.query(sql, function(err, rows, fields){
        var id = req.params.id;
        if(id){
            //상세보기
            var sql = 'SELECT * FROM tmp.json_test WHERE id=?';
            conn.query(sql, [id], function(err, row, fields){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    res.render('edit', {topics:rows, topic:row[0]});
                }
            });
        }else{
            console.log('There is no id.');
            res.status(500).send('Internal Server Error');
        }
    });
});
app.post(['/topic/:id/edit'], function(req, res){
    var test1 = req.body.test1;
    var test2 = req.body.test2;
    var test3 = req.body.test3;
    var id = req.params.id;
    var sql = 'UPDATE tmp.json_test SET test1=?, test2=?, test3=? WHERE id=?'
    conn.query(sql, [test1, test2, test3, id], function(err, result, fields){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect('/topic/'+id);
        }
    });
});
app.get('/topic/:id/delete', function(req, res){
    var sql = 'SELECT id, test1 FROM tmp.json_test ORDER BY add_date DESC';
    var id = req.params.id;
    conn.query(sql, function(err, rows, fields){
        //삭제하려는 데이터가 있는 row인지 검사
        var sql = 'SELECT * FROM tmp.json_test WHERE id=?'
        conn.query(sql, [id], function(err, row){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            } else {
                if(row.length == 0) {
                    console.log('There is no record');
                    res.status(500).send('Internal Server Error');
                } else
                res.render('delete', {topics:rows, topic:row[0]});        
            }            
        });
    });
});
app.post('/topic/:id/delete', function(req, res){
    var id = req.params.id;
    var sql = 'DELETE FROM tmp.json_test WHERE id=?';
    conn.query(sql, [id], function(req, result){
        res.redirect('/topic/');
    });
});

//json test
//javascript객체를 JSON으로 변환
app.get('/test', function(req, res){
   var acctObj = {
    name : "yoda",
    members : ["frodo, begins"],
    location : "middle area"
   };
   //json으로 반환
   var acctObj = JSON.stringify(acctObj);
   console.log(acctObj);

   res.send('json test!!');
});

app.get(['/topic', '/topic/:id'], function(req, res){
    
    //글의 목록을 보여줌
    //객체가 전달됨
    var sql = 'SELECT id, test1 FROM tmp.json_test ORDER BY add_date DESC';
    conn.query(sql, function(err, rows, fields){
        //사용자가 전송한 정보가 들어간다.
        //res.send(rows);
        var id = req.params.id;
        if(id){
            //상세보기
            var sql = 'SELECT * FROM tmp.json_test WHERE id=?';
            conn.query(sql, [id], function(err, row, fields){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    //배열에 담긴 하나의 값만 가져온다.
                    res.render('view', {topics:rows, topic:row[0]});            
                }
            });
        }else{
            //그냥 보기
            res.render('view', {topics:rows});    
        }
    });
});

app.listen(3000, function(){        //특정 포트를 리스닝하도록
//콜백
    console.log('Connected Port 3000!!!');
});   

