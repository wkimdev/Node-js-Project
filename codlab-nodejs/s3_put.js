var express = require('express');   //express 모듈을 가져온다
var AWS = require('aws-sdk'); //AWS의 객체를 가져옴

var fs = require('fs');
AWS.config.region = 'ap-northeast-2';
var s3 = new AWS.S3();
var app = express();              
var ec2 = new AWS.EC2();


app.get('/ec2', function(req, res){
    ec2.describeInstances({}, function(err, data) {
            res.json(data);
    });
});

var params = {
    'Bucket' : '',
    'Key' : 'logo.png', //s3에 저장될 파일의 이름
    'ACL' : 'public-read',
    'Body' : fs.createReadStream('image_test.png'), //body property 값으로 준다. image_test.jpg 이걸  body property 값으로 주고 s3에 전송
    'ContentType' : 'image/png'
}
s3.putObject(params, function(err, data) {
    console.log(err);
    console.log(data);    
});

app.listen(3000, function(){        //특정 포트를 리스닝하도록
    //콜백
        console.log('Connected Port 3000!!!');
    });   