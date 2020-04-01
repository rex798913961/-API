// 这个文件是登录路由

// 调用模块
const express = require('express')

// 调用数据模型
const goodsModel = require('../db/model/goodsModel')

// 调用数据库操作
const {
    findGoodsList,
    insertGoods,
    deleteGoods,
    updateGoods,
    findGoodsByPage,
    findGoodsBySeller,
    findGoodsByKw,
    changeGoodState,
    findGoodsById
} = require('../controls/goodsControl')

// 实例化
const router = express.Router()

// 设置API接口
router.get('/goodsList', (req, res) => {
    /**
     * @api {get} /goods/goodsList   管理平台查询全部商品
     * @apiName  goodslist
     * @apiGroup goods
     *
     *
     * @apiSuccess {String} err 状态码.
     * @apiSuccess {String} msg  信息提示.
     */
    findGoodsList()
        .then((data) => {
            // console.log('then', data)
            if (data !==null) {
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


router.post('/goodsAdd', (req, res) => {
    // 获取前端发过来的信息 需要解析 在server.js进行
    let {
        title,
        desc,
        price,
        seller,
        path,
        state,
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
     * @api {post} /goods/goodsAdd   管理平台添加商品
     * @apiName  goodsadd
     * @apiGroup goods
     *
     * 
     * @apiParam {String} title 食品名.
     * @apiParam {String} desc 食品描述.
     * @apiParam {Number} price 价格.
     * @apiParam {String} seller 商家.
     * @apiParam {String} path 图片路径.
     * @apiParam {String} state 状态.
     *
     * @apiSuccess {String} err 状态码r.
     * @apiSuccess {String} msg  信息提示.
     */
    insertGoods({
            title,
            desc,
            price,
            seller,
            path,
            state
        })
        .then((data) => {
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
// 删除商品
router.post('/goodsDel',(req,res)=>{
    /**
    * @api {post} /goods/goodsDel   管理平台删除商品
    * @apiName  goodsdel
    * @apiGroup goods
    *
    * @apiParam {String} _id 商品id.
    *
    * @apiSuccess {String} err 状态码.
    * @apiSuccess {String} msg  信息提示.
    */
    let {_id} = req.body
    deleteGoods(_id)
    .then(()=>{res.send({err:0,msg:'删除成功'})})
    .catch((err) => { res.send({ err: -1, msg:"删除失败请重试"})})
})

// 修改商品
router.post('/goodsUpdate',(req,res)=>{
    /**
    * @api {post} /goods/goodsUpdate   管理平台更新商品
    * @apiName  goodsUpdate
    * @apiGroup goods
    *
    * @apiParam {String} _id 商品id.
    * @apiParam {String} title 食品名.
    * @apiParam {String} desc 食品描述.
    * @apiParam {Number} price 价格.
    * @apiParam {String} seller 商家.
    * @apiParam {String} path 图片路径.
    * @apiParam {String} state 状态.
    *
    * @apiSuccess {String} err 状态码.
    * @apiSuccess {String} msg  信息提示.
    */

    let {_id} =req.body
    let {title,desc,price,seller,path,state} =req.body.payload
    updateGoods(_id, { title, desc, price, seller,path,state})
    .then(()=>{
        res.send({err:0,msg:'修改成功'})
    })
        .catch((err)=>{
        res.send({err:-1,msg:'修改失败请重试'})
    })
})

// 分页查询
router.post('/getInfos',(req,res)=>{
    /**
     * @api {post} /goods/getInfos   管理平台分页查询
     * @apiName  getInfos
     * @apiGroup goods
     *
     * @apiParam {Number} page 查询页码.
     * @apiParam {Number} pageSize 每页数据.
     *
     * @apiSuccess {String} err 状态码.
     * @apiSuccess {String} msg  信息提示.
     */
    let page=req.body.page||1
    let pageSize = req.body.pageSize || 2
    findGoodsByPage(page,pageSize)
    .then((data)=>{
        let {result,allCount} = data
        res.send({err:0,msg:'查询成功',list:result,allCount})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'查询失败'})
    })
})
// 根据店铺查询
router.post('/getInfosBySeller',(req,res)=>{
    /**
     * @api {post} /goods/getInfosBySeller   管理平台店铺查询
     * @apiName  getInfosBySeller
     * @apiGroup goods
     *
     * @apiParam {String} seller 店铺名称.
     *
     * @apiSuccess {String} err 状态码.
     * @apiSuccess {String} msg  信息提示.
     */
    let {seller} = req.body
    findGoodsBySeller(seller)
    .then((data)=>{
        res.send({err:0,msg:'查询成功',list:data})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'查询失败'})
    })

})
// 根据商品id查询
router.get('/getInfosById',(req,res)=>{
    /**
     * @api {get} /goods/getInfosById   管理平台根据商品id查询
     * @apiName  getInfosById
     * @apiGroup goods
     *
     * @apiParam {String} _id 商品id.
     *
     * @apiSuccess {String} err 状态码.
     * @apiSuccess {String} msg  信息提示.
     */
    let {_id} = req.query
    findGoodsById(_id)
    .then((data)=>{
        res.send({err:0,msg:'查询成功',list:data})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'查询失败'})
    })

})

// 关键字查询
router.post('/getInfoByKw',(req,res)=>{
    /**
     * @api {post} /goods/getInfoByKw   管理平台关键字查询
     * @apiName getInfoByKw
     * @apiGroup goods
     *
     * @apiParam {String} kw 关键字.
     * @apiParam {Number} page 查询页码.
     * @apiParam {Number} pageSize 每页数据.
     *
     * @apiSuccess {String} err 状态码.
     * @apiSuccess {String} msg  信息提示.
     */
    let kw = req.body.kw ||''
    let page = req.body.page ||1
    let pageSize=req.body.pageSize||2
    findGoodsByKw(kw,page,pageSize)
    .then((data)=>{
        res.send({err:0,msg:'查询成功',list:data.result,allCount:data.allCount})
    })
    .catch((err) => {
        res.send({
            err: -1,
            msg: '查询失败'
        })
    })
})

// 商品状态调整
router.post('/changeGoodsState',(req,res)=>{
    /**
     * @api {post} /goods/changeGoodsState   管理平台商品状态调整
     * @apiName changeGoodsState
     * @apiGroup goods
     *
     * @apiParam {String} _id 商品id.
     * @apiParam {String} state 状态值.
     *
     * @apiSuccess {String} err 状态码.
     * @apiSuccess {String} msg  信息提示.
     */
    let {_id,state} =req.body
    console.log({_id,state});
    changeGoodState(_id,{state})
    .then(()=>{
        res.send({err:0,msg:'调整状态成功'})
    })
    .catch(()=>{
        res.send({err:-1,msg:'调整状态失败，请重试'})
    })
})
// 抛出
module.exports = router


// 在server.js调用