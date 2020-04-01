// 用户登录注册的数据库操作

// 调用模块   数据模型
const goodsModel= require('../db/model/goodsModel')

// 登录 查询
let  findGoodsList =async ()=>{
   let result= await  goodsModel.find()
   return result
}

// 插入用户数据
let  insertGoods =async (obj)=>{
   let result= await  goodsModel.insertMany(obj)
   return result
}

// 删除数据
let deleteGoods = async (_id)=>{
   let result = await goodsModel.deleteOne({_id})
   return result
}

// 修改商品
let updateGoods = async (_id,updateInfo)=>{
   let result =await goodsModel.updateOne({_id},updateInfo)
   return result
}

// 分页查询
let findGoodsByPage = async(page,pageSize)=>{
   let allGoods = await goodsModel.find()
   let allCount = allGoods.length
   let result = await goodsModel.find().skip(Number(page-1)*pageSize).limit(Number(pageSize))
   return {result,allCount}
}
// 分类查询
let findGoodsBySeller = async (seller)=>{
   let result =await goodsModel.find({seller})
   return result
}
// 根据_id获取信息
let findGoodsById = async (_id)=>{
   let result =await goodsModel.find({_id})
   return result
}
// 关键字查询
let findGoodsByKw = async (kw,page,pageSize)=>{
   console.log(pageSize);
   
   let regex =new RegExp(kw)
   let allGoods = await goodsModel.find({
            $or: [{
                  desc: {
                     $regex: regex
                  }
               }, {
                  title: {
                     $regex: regex
                  }
               }, {
                  desc: {
                     $regex: regex
                  }
               }, {
                  seller: {
                     $regex: regex
                  }}]
            })
   let allCount = allGoods.length
   let result = await goodsModel.find({
                        $or: [{
                           desc: {
                              $regex: regex
                           }
                        }, {
                           title: {
                              $regex: regex
                           }
                        }, {
                           desc: {
                              $regex: regex
                           }
                        }, {
                           seller: {
                              $regex: regex
                           }
                        }]
                     }).skip(Number(page - 1) * pageSize).limit(Number(pageSize))                    
   return {result,allCount}
}
// 该变商品状态
   let changeGoodState = async (_id,state)=>{
         let result =await goodsModel.updateOne({_id},state)
   }
// 抛出
module.exports = {
   findGoodsList,
   insertGoods,
   deleteGoods,
   updateGoods,
   findGoodsByPage,
   findGoodsBySeller,
   findGoodsByKw,
   changeGoodState,
   findGoodsById
}
