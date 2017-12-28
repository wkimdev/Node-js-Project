/* 
1) 어떤식으로 문서화??
2) fileUtil - db따로 빼기/ app.js 여기 설정파일 참고


*/

var conn = mysql.createConnection({
    host     : 'hello5mysql.ci9ipxrkurji.ap-northeast-2.rds.amazonaws.com',
    user     : 'master',
    password : 'byefive5%5',
    port     : '3306',
    charset  : 'utf8'
  });
conn.connect();






var express = require('express');   

/** 
 * API 리스트 입니다.
*/

/** 
 * 회원관리 list를 출력하는 함수.
 * @param list {string} 출력할 리스트 입니다.
*/
new.post('/memberList', function(req, res){

});

/** 
 * 진도 list를 출력하는 함수.
 * @param list {string} 출력할 리스트 입니다.
*/
new.post('/classList', function(req, res){
    
});

/** 
 * 도서 list를 출력하는 함수.
 * @param list {string} 출력할 리스트 입니다.
*/
new.post('/bookList', function(req, res){
    
});

/** 
 * 진도과정관리 수정 함수.
 * @param list {string} 수정
*/
new.post('/classMngUpdate', function(req, res){
    
});

/** 
 * 진도과정관리 삭제 함수.
 * @param list {string} 수정
*/
new.post('/classMngDelete', function(req, res){
    
});

/** 
 * 진도과정관리 등록 함수.
 * @param list {string} 수정
*/
new.post('/classMngAdd', function(req, res){
    
});