// 这个文件是注册路由

// 调用模块
const express = require('express')

// 调用数据模型
const UserModel = require('../db/model/userModel')

// 调用数据库操作
const {
    findUser,
    insertUser
} = require('../controls/userControl')

// 实例化
const router = express.Router()

// 设置API接口
// 写api接口文件
/**
 * @api {get} /admin/reg   管理平台注册页面
 * @apiName reg
 * @apiGroup User
 *
 * @apiParam {String} phoneNum 手机号码.
 * @apiParam {String} passWord 登录密码.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */
// 注册
router.get('/reg', (req, res) => {
    // 获取前端传来的数据
    let {
        phoneNum,
        passWord
    } = req.query
    console.log(phoneNum, passWord);

    // 对数据库进行操作
    // 检查号码是否已经注册
    findUser({
            phoneNum: phoneNum
        })
        .then((data) => {
            console.log(data);
            //    没有数据就可以注册
            if (data.length == 0) {
                // 数据库写入数据
                // UserModel.insertMany({
                //         phoneNum: phoneNum,
                //         passWord: passWord
                //     })
                insertUser({
                        phoneNum: phoneNum,
                        passWord: passWord
                    })
                    .then((data) => {
                        res.send({
                            err: 0,
                            msg: "注册成功"
                        })
                    })
                    .catch((err) => {
                        res.send({
                            err: -1,
                            msg: "注册失败"
                        })
                    })
            } else {
                res.send({
                    err: -1,
                    msg: "账号已存在"
                })
            }
        })
        .catch((err) => {
            res.send({
                err: -2,
                msg: err
            })
        })
})

// 抛出
module.exports = router

// 在server.js调用