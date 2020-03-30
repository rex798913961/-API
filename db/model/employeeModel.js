// 用户的数据库模型
// 调用模块
const mongoose=require('mongoose')

// 创建schema对象  ==创建表头
let EmployeeSchema=new mongoose.Schema({
    name:{type:String},
    phonenum:{type:String},
    birthdate:{type:String},
    store:{type:String},
    jobClassification:{type:String},
    educationBackground:{type:String},
    salary:{type:Number}
})

// 将schema对象和数据集合进行关联
// mongoose.model(要关联的集合名,schema对象 );
let EmployeeModel=mongoose.model('employees',EmployeeSchema)

// 抛出
module.exports=EmployeeModel