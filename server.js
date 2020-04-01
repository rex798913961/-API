// 调用模块
const express=require('express')
const path = require('path')
const bodyParser=require('body-parser')

// 在服务器启动的时候就启动数据库 引入数据库连接
const db = require('./db/connect')

//实例化
const app = express()

// post 数据的解析
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 静态资源路径
// http://localhost:2020/public
app.use('/public',express.static(path.join(__dirname,'./public')))


// 路由
// 登录 http://localhost:2020/admin/login
let loginRouter=require('./router/loginRouter')
app.use('/admin',loginRouter)
// 注册
let regRouter=require('./router/regRouter')
app.use('/admin',regRouter)

// 商品
let goodsRouter=require('./router/goodsRouter')
app.use('/goods',goodsRouter)

// 图片上传
let uploadRouter = require('./router/uploadRouter')
app.use('/upload',uploadRouter)

// 监听端口号
app.listen(2020,()=>{
    console.log('服务器启动成功');
})