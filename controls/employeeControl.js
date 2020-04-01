// 用户登录注册的数据库操作

// 调用模块   数据模型
const EmployeeModel = require('../db/model/employeeModel')

// 查询
let findemployeelist = async () => {
    let result = await EmployeeModel.find()
    return result
}

// 插入用户数据
let insertemployee = async (obj) => {
    let result = await EmployeeModel.insertMany(obj)
    return result
}

// 删除数据
let delemployee=async (_id)=>{
    let result = await EmployeeModel.deleteOne({_id})
    return result
}

// 更新数据
let updateemployee=async (_id,obj)=>{
    let result = await EmployeeModel.update({_id},obj)
    return result
}

// 关键字搜索
let employeeone=async (obj) => {
    let result = await EmployeeModel.find(obj)
    return result
}



// 抛出
module.exports = {
    findemployeelist,
    insertemployee,
    delemployee,
    updateemployee,
    employeeone
}