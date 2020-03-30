// 用户登录注册的数据库操作

// 调用模块   数据模型
const EmployeeModel = require('../db/model/employeeModel')

// 登录 查询
let findemployeelist = async () => {
    let result = await EmployeeModel.find()
    return result
}

// 注册
// 插入用户数据
let insertemployee = async (obj) => {
    let result = await EmployeeModel.insertMany(obj)
    return result
}

// 抛出
module.exports = {
    findemployeelist,
    insertemployee
}