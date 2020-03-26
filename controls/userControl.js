// 用户登录注册的数据库操作

// 调用模块   数据模型
const userModel= require('../db/model/userModel')

// 登录 查询
let  findUser =async (obj)=>{
   let result= await  userModel.find(obj)
   return result
}

// 注册
// 插入用户数据
let  insertUser =async (obj)=>{
   let result= await  userModel.insertMany(obj)
   return result
}

// 抛出
module.exports={findUser,insertUser}

// 在路由文件loginRouter.js(登录)和regRouter.js（注册）中调用