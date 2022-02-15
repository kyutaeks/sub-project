//express 라는 패키지를 불러오기 위해 사용.
const express = require("express");
//express 를 사용하기위해 app이라는 변수에 저장. 
const app = express();
//React는 3000포트를 사용하기때문에 서버가 실행되는 포트 설정이 필요함.
//같은포트 사용시 충돌남. 
const port = 8080;

//민감정보들을 가리기위한 수단으로 사용되는 모듈.
//gitignore에 env파일은 들어가지않도록 설정함.
const dotenv = require('dotenv');
dotenv.config()

//DataBase 정보 생성
//1.Pool이란걸 사용하기위해서는 npm install pg 과정이 필요함. 
//2.Postgres를 사용하기위해 위에과정이 필요함.
//3.맨처음 실행했을때 npm install 과정에 1과정이 들어가기때문에 따로 설치할 필요 없음.
//여기서 Pool은 DB Connection 관리자가 일정의 Connection을 연결해 관리하고 있다가, 요청이 들어오면
//Connection을 할당해주고 없으면 연결 관리. 요청한 Client가 Connection을 다 사용하면 다시 반납하는 구조.
const { Pool } = require("pg");
const db = new Pool({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

let dataResult;

async function test() {
    const sql = 'select 32323'

    await db.query(sql).then((res) => {
        dataResult = {
            result : res.rows[0],
        }
    })
}

app.get('/test', async (req, res) => {
    await test();
    try {
        res.status(200).json(dataResult)
    } catch (error) {
        console.log(error);
        res.json(error.status);
    }
})

app.listen(port, () => console.log(`${port}`));