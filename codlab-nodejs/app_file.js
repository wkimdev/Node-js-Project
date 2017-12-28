/* 
Hello javascript!
 */
var express = require('express');   //express 모듈을 가져온다
var bodyParser = require('body-parser');
var fs = require('fs')//파일시스템 제어 기본 모듈
var app = express();                
app.use(bodyParser.urlencoded({ extended: false })) //사용자에게 post방식으로 요청이 들어오면, 확장기능(미들웨어) 모듈을 통과한 후 라우터로 동작한다.
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views_file');    //템플릿파일 설정
app.get('/topic/new', function(req, res){
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            //사용자에게 어떤 에러가 있었음을 알린다.
            res.status(500).send('Internal Server Error');
        }
        res.render('new', {topics:files});
    })
});
//입력후 저장하는 코드
//express 표현 [] 배열, 중복을 줄이기 위한 표현, 중복을 제거함으로서 유지보수가 쉬워짐
app.get(['/topic', '/topic/:id'], function(req, res){
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            //사용자에게 어떤 에러가 있었음을 알린다.
            res.status(500).send('Internal Server Error');
        }
        var id = req.params.id;
        if(id){
            //id값이 있을 때 
            fs.readFile('data/'+id, 'utf-8', function(err, data){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                //data를 받아서 읽는다
                //topics라는 객체 안에 주입한다
                //res.render('view', {topics:files}); //저장되는 배열값을 전달하고 싶음. 템플릿 안으로 주입하고자 하는 객체를 주입
                res.render('view', {topics:files, title:id, description:data});
            })  
        } else {
            //id값이 없을 때
            //res.render('view', {topics:files, title:'Hello', description:'hi hello goodbye'}); //저장되는 배열값을 전달하고 싶음. 템플릿 안으로 주입하고자 하는 객체를 주입
            res.render('view', {topics:files, title:'welcome', description:'hello, javascript for server'}); //저장되는 배열값을 전달하고 싶음. 템플릿 안으로 주입하고자 하는 객체를 주입
        }
    });    
});

app.post('/topic', function(req, res){
    var title =  req.body.title;
    var description = req.body.description;
    // data/는 디렉토리 이름. 이름이 다르면 에러나서 실행안됨(오류가 전달됨).
    fs.writeFile('data/'+title, description, function(err){
        if(err){
            res.status(500).send('Internal Server Error');
        }
        //콜백 함수를 실행 후 발생해야 함
       //res.send('Hi, post '+req.body.title);
       //redirect==> 페이지로 보냄(상세글을 볼 수 있도록)
       res.redirect('/topic/'+title);
    });
});

app.listen(3000, function(){        //특정 포트를 리스닝하도록
//콜백
    console.log('Connected Port 3000!!!');
});   

