// 用户的数据库模型
// 调用模块
const mongoose=require('mongoose')

// 创建schema对象  ==创建表头
let GoodsSchema=new mongoose.Schema({
    title:{type:String},
    desc:{type:String},
    price:{type:Number},
    seller:{type:String},
    path:{type:String},
    state:{type:String},
})

// 将schema对象和数据集合进行关联
// mongoose.model(要关联的集合名,schema对象 );
let GoodsModel=mongoose.model('goods',GoodsSchema)

// 抛出
module.exports=GoodsModel
