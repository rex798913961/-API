// 这个文件是登录路由

// 调用模块
const express = require('express')

// 调用数据模型
const goodsModel = require('../db/model/goodsModel')

// 调用数据库操作
const {
    findgoodslist,
    insertgoods 
} = require('../controls/goodsControl')

// 实例化
const router = express.Router()

// 设置API接口
router.get('/goodslist', (req, res) => {
    /**
     * @api {get} /admin/goodslist   管理平台登录界面
     * @apiName login
     * @apiGroup User
     *
     * @apiParam {String} phoneNum 手机号码.
     * @apiParam {String} passWord 登录密码.
     *
     * @apiSuccess {String} err 状态码r.
     * @apiSuccess {String} msg  信息提示.
     */
    findgoodslist()
        .then((data) => {
            // console.log('then', data)
            if (data.length == 1) {
                res.send({
                    err: 0,
                    msg: data
                })
            } else {
                res.send({
                    err: -1,
                    msg: 'err'
                })
            }
        })
        .catch((err) => {
            res.send({
                err: -2,
                msg: '内部错误请重试'
            })
            console.log("err", err)
        })
})

router.post('/goodsadd', (req, res) => {
    // 获取前端发过来的信息 需要解析 在server.js进行
    let {
        title,
        desc,
        price
    } = req.body
    // 数据库操作   
    // 需要启动数据库 在DB文件夹书写 连接文件和 数据模型
    // 处理数据 根据结果 返回数据给前端
    // 抽离数据库操作到 controls文件夹 并在头部进行调用
    // UserModel.find({
    //         phoneNum,
    //         passWord
    //     })
    // 写api接口文件

    /**
     * @api {post} /admin/goodsadd   管理平台登录界面
     * @apiName login
     * @apiGroup User
     *
     * @apiParam {String} title 食品名.
     * @apiParam {String} desc 食品描述.
     * @apiParam {Number} price 价格.
     *
     * @apiSuccess {String} err 状态码r.
     * @apiSuccess {String} msg  信息提示.
     */
    insertgoods({
        title,
        desc,
        price
        })
        .then((data) => {
            // console.log('then', data)
            if (data.length == 1) {
                res.send({
                    err: 0,
                    msg: '添加成功'
                })
            } else {
                res.send({
                    err: -1,
                    msg: '错误'
                })
            }
        })
        .catch((err) => {
            res.send({
                err: -2,
                msg: '内部错误请重试'
            })
            console.log("err", err)
        })
})
// 抛出
module.exports = router


// 在server.js调用