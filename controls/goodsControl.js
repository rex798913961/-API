// 用户登录注册的数据库操作

// 调用模块   数据模型
const goodsModel= require('../db/model/goodsModel')

// 登录 查询
let  findgoodslist =async ()=>{
   let result= await  goodsModel.find()
   return result
}

// 注册
// 插入用户数据
let  insertgoods =async (obj)=>{
   let result= await  goodsModel.insertMany(obj)
   return result
}

// 抛出
module.exports={findgoodslist,insertgoods}
