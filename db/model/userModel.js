// 用户的数据库模型
// 调用模块
const mongoose=require('mongoose')

// 创建schema对象  ==创建表头
let UserSchema=new mongoose.Schema({
    phoneNum:{type:String},
    passWord:{type:String}
})

// 将schema对象和数据集合进行关联
// mongoose.model(要关联的集合名,schema对象 );
let UserModel=mongoose.model('users',UserSchema)

// 抛出
module.exports=UserModel

// 在路由文件loginRouter.js(登录)和regRouter.js（注册）中调用