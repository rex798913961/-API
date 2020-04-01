// 这个文件是登录路由

// 调用模块
const express = require('express')

// 调用数据模型
const employeeModel = require('../db/model/employeeModel')

// 调用数据库操作
const {
    findemployeelist,//查询列表
    insertemployee,  //插入数据
    delemployee,     //删除数据
    updateemployee,   //更新数据
    employeeone
} = require('../controls/employeeControl')

// 实例化
const router = express.Router()

// 设置API接口
router.get('/employeelist', (req, res) => {
    /**
     * @api {get} /employee/employeelist   员工列表
     * @apiName  employeelist
     * @apiGroup employee
     *
     *
     * @apiSuccess {String} err 状态码r.
     * @apiSuccess {String} msg  信息提示.
     */
    findemployeelist()
        .then((data) => {
            // console.log('then', data)
            if (data.length >= 1) {
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
// id搜索
router.get('/employeeone', (req, res) => {
    let _id= req.query._id
    console.log({_id});
    /**
     * @api {get} /employee/employeeone   关键字搜索
     * @apiName  employeeone
     * @apiGroup employee
     *
     *
     * @apiSuccess {String} err 状态码r.
     * @apiSuccess {String} msg  信息提示.
     */
    employeeone({_id})
        .then((data) => {
            // console.log('then', data)
            if (data.length >= 1) {
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

router.post('/employeeadd', (req, res) => {
    // 获取前端发过来的信息 需要解析 在server.js进行
    let {
        name,
        phonenum,
        birthdate,
        employmentDate,
        store,
        jobClassification,
        educationBackground,
        salary
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
     * @api {post} /employee/employeeadd   添加员工
     * @apiName  employeeadd
     * @apiGroup employee
     *
     * @apiParam {String} name 姓名.
     * @apiParam {String} phonenum 手机号.
     * @apiParam {String} birthdate 出生日期.
     * @apiParam {String} employmentDate g雇佣日期.
     * @apiParam {String} store 店铺.
     * @apiParam {String} jobClassification 职位.
     * @apiParam {String} educationBackground 学历.
     * @apiParam {Number} salary 薪资.
     *
     * @apiSuccess {String} err 状态码r.
     * @apiSuccess {String} msg  信息提示.
     */
    insertemployee({
        name,
        phonenum,
        birthdate,
        employmentDate,
        store,
        jobClassification,
        educationBackground,
        salary
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

router.delete('/delemployee',(req,res)=>{
    let _id=req.body._id
    console.log(req.body);
    
     /**
     * @api {delete} /employee/delemployee   删除员工
     * @apiName  delemployee
     * @apiGroup employee
     *
     * @apiParam {String} _id  ID.
     *
     * @apiSuccess {String} err 状态码r.
     * @apiSuccess {String} msg  信息提示.
     */
    delemployee(_id).then((data)=>{
        
        res.send({
            err: 0,
            msg: '删除成功'+data
        })
    }).catch((err)=>{
        res.send({
            err: -2,
            msg: '内部错误请重试'+err
        })
    })
})
router.put('/updateemployee',(req,res)=>{
    let {_id}=req.body
    // let obj={_id,...values}
    let {name,phonenum,birthdate,employmentDate,store,jobClassification,educationBackground,salary}=req.body
    let obj={name,phonenum,birthdate,employmentDate,store,jobClassification,educationBackground,salary}
    console.log(obj);
    
     /**
     * @api {put} /employee/updateemployee   更新员工信息
     * @apiName  updateemployee
     * @apiGroup employee
     *
     * @apiParam {String} _id  ID.
     * @apiParam {String} name 姓名.
     * @apiParam {String} phonenum 手机号.
     * @apiParam {String} birthdate 出生日期.
     * @apiParam {String} employmentDate g雇佣日期.
     * @apiParam {String} store 店铺.
     * @apiParam {String} jobClassification 职位.
     * @apiParam {String} educationBackground 学历.
     * @apiParam {Number} salary 薪资.
     *
     *
     * @apiSuccess {String} err 状态码r.
     * @apiSuccess {String} msg  信息提示.
     */
    updateemployee(_id,obj).then((data)=>{
        // console.log(data);
        res.send({
            err: 0,
            msg: '更新成功'
        })
    }).catch((err)=>{
        res.send({
            err: -2,
            msg: '内部错误请重试'+err
        })
    })
})

// 抛出
module.exports = router


// 在server.js调用