const express =require('express')
const bodyParse = require ('body-parser')
const fs = require('fs')
const path = require('path')
var multer = require('multer')
// 创建multer对象
const upload = multer({})
const router = express.Router()
/**
 * @api {post} /upload/pic   管理平台商品图片上传
 * @apiName pic
 * @apiGroup upload
 *
 * @apiParam {String} pic 图片.
 *
 * @apiSuccess {String} err 状态码r.
 * @apiSuccess {String} msg  信息提示.
 */
router.post('/pic',upload.single('pic'),(req,res)=>{
      // req.file 上传的文件信息默认是不存在的  只有被multer中间件处理过之后才有
      
      console.log(req.file);
      let {buffer,mimetype,size,orinalname} = req.file

      let name = (new Date()).getTime()+'_'+parseInt(Math.random()*6666)
      let ext = mimetype.split('/')[1]
      fs.writeFile(path.join(__dirname,`../public/${name}.${ext}`),buffer,(err)=>{
        if(err){
            res.send({err:-1,msg:'图片上传失败'})
          }else{
            // let result=path.join(__dirname,`../public/${name}.${ext}`)
            res.send({err:0,msg:'图片上传0k',path:`/public/${name}.${ext}`})
          }
      })  
})
module.exports = router