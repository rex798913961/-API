// 连接数据库文件
// 连接数据库 27017 默认端口号
var mongoose = require('mongoose');
let url='mongodb+srv://NZ1911:NZ1911@cluster0-gcfgw.mongodb.net/book?retryWrites=true&w=majority'
mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true });

var db = mongoose.connection //数据库的连接对象
db.on('error',()=>{ console.log('数据库连接失败')});
db.once('open', function() {
  console.log('数据库第一次连接成功')
});

// 在服务器启动的时候就启动数据库
// 在server.js开头就引入启动文件