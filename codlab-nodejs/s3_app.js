var express = require('express');   //express 모듈을 가져온다
var formidable = require('formidable');
var AWS = require('aws-sdk'); //AWS의 객체를 가져옴
var fs = require('fs');
AWS.config.region = 'ap-northeast-2';
var s3 = new AWS.S3();
var app = express();              

app.get('/s3', function(req, res){
    res.send('Hello s3');
});

app.get('/form', function(req, res){
    var output = `
<html>
<body>
    <form enctype="multipart/form-data" method="post" action="upload_receiver">
        <input type="file" name="userfile">
        <input type="submit">
    </form>
</body>
</html>
    `;
    res.send(output);
});
app.post('/upload_receiver', function(req, res) {
    //express자체가 업로드 처리하는게 없다. 그래서  formidable이라는 모듈을 사용한다.

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        var s3 = new AWS.S3();
        var params = {
            Bucket : 'testhello5',
            Key : files.userfile.name,
            ACL :  'public-read',
            Body : require('fs').createReadStream(files.userfile.path) //임시 디렉토리에서 읽어서
        }
        s3.upload(params, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                console.log(data);
            }
        });
        console.log(err, fields, files);
    });
});

app.get('/s3', function(req, res){
    res.send('Hello s3');
});

app.listen(3000, function(){        //특정 포트를 리스닝하도록
    //콜백
        console.log('Connected Port 3000!!!');
    });   