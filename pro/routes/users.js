import express  from 'express'
import {HandleDB} from '../dao/db'
let router = express.Router();
let db = new HandleDB();
/* GET users listing. */
router.post('/signUp', function (req, res, next) {
  db.sql(
    `insert into users (user_name,password,email,gender,avatar,phone,job_no) 
    values(?,?,?,?,?,?,?)`,
    ['keli', '123456', '670550188@qq.com', 1, 'http://baidu.com', 13233333333, 4],
    'all'
  ).then(resp=>{
    res.json({a:32})
  })
});

module.exports = router;
