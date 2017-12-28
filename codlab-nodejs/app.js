const express = require('express'); //express를 로드함. 이를 통해 express 모듈(함수)을 제어한다.
var bodyParser = require('body-parser') //body-parser모듈 포함var bodyParser = require('body-parser') //body-parser모듈 포함
const app = express();  //express함수가 application함수를 로드하고 app 객체에 담는다.
app.locals.pretty = true;
app.set('view engine', 'jade'); //express와 jade를 연결하는 코드, 템플릿 엔진으로 jade설정
app.set('views', './views');  //템플릿 엔진들을 통상적으로 views라는 디렉토리에 넣는다. (기본값)
app.use(express.static('public'));  //정적인 파일에 대한 public이라는 디렉토리 지정
app.use(bodyParser.urlencoded({ extended: false })) //사용자에게 post방식으로 요청이 들어오면, 확장기능(미들웨어) 모듈을 통과한 후 라우터로 동작한다.

//컨트롤러의 첫번째 매개변수 값으로 req
//쿼리라는 객체에 id라는 property값으로 들어오는 값이 return된다.
//API - 사용할 수 있는 명령들 (reference = 사전/http://expressjs.com/ko/4x/api.html) 

//어떤 id값으로 들어와도 적용 path적용
//이런 경우는 get방식
app.get('/topic/:id', function(req, res){
  //다른 정보
  var topics = [
    'javascript is....',
    'Nodejs is...',
    'Express is...'
  ];      
  var output = `
  <a href="/topic/0">Javascript</a><br>
  <a href="/topic/1">Nodejs</a><br>
  <a href="/topic/2">Express</a><br><br>
  ${topics[req.params.id]}   
  `
  res.send(output); //query는
});
//function ~ 여기가 콜백
app.get('/topic/:id/:mode', function(req, res){
  res.send(req.params.id+','+req.params.mode)
});

app.get('/form', function(req, res){
  res.render('form');
});
//get방식
app.get('/form_receiver', function(req, res){  
  var title = req.query.title;
  var description = req.query.description;  //사용자가 요청한 data를 받음
  res.send(title+','+description);
});
app.post('/form_receiver', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  res.send(title+','+description);
});



app.get('/template', function(req, res){
  res.render('temp', {time:Date(), _title:'Jade'}); //temp는 jade형식으로 있어야 한다.
});
app.get('/', function(req, res){
  //응답함수에 대한 callback
  res.send('hello home page');
});

//동적인 것은 요청이 들어올때마다 node액션을 잡아줘서 서버를 껏다 켜야 함
// 변수를 추가하고 싶을 때 ===>  ${lis}
// 작은 따옴표 내에서 써야 저게 가능ㄴ
app.get('/dynamic', function(req, res){
  var lis = '';
  for(var i=0;i<5;i++){
    lis = lis + "<li>coding</li>";
  }
  var time = Date();
  var output = `
  <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
        <body>
          Hello, Dynamic!
          <ul>
          ${lis}
          </ul>
          ${time}
        </body>
    </html>`
  res.send(output);
});

//웹에 이미지 넣고 싶을 때
//public이라는 정적 디렉토리를 통해 해당 이미지 서비스 제공 가능
//정적인 것은 요청이 들어올때마다 node액션을 잡아줘서 서버를 껏다 안 켜도 됨
app.get('/route', function(req, res){
  res.send('Hello Router, <img src="/1.png">')
});

//사용자 경로 지정 , get이 이런 일을 함
//어떤 요청이 들어왔을 때 길을 찾게 해줌
//이런 역할을 하는 애 : router(길을 찾는다)
//이런 일 : routing
app.get('/login', function(req, res){
  //응답함수에 대한 callback
  res.send('<h1>Login please</h1>');
});


app.listen(3000, function(){  //port지정
  //접속 성공을 알기 위한 callback 표현
  console.log('Connected 3000 port!');
}); 

