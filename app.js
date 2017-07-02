const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const index = require('./router/index')
const movie = require('./router/movie')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/',index)
app.use('/api',movie)

mongoose.Promise = global.Promise
const db = mongoose.connect('mongodb://localhost:27017/vueData')

db.connection.on("error", function (error) {
  console.log("数据库连接失败：" + error)
})

db.connection.on("open", function () {
  console.log("数据库连接成功")
})


//启动
app.listen(port,() =>{
	console.log(`listen on port ${port}`)
})

module.exports = app