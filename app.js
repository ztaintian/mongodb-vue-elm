const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const index = require('./router/index')
const movie = require('./router/movie')
const bodyParser = require('body-parser')
const axios = require('axios')
const Movie = require('./model/movie')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/',index)
app.use('/api',movie)

mongoose.Promise = global.Promise
const db = mongoose.connect('mongodb://localhost:27017/vueData')

const doubanUrl = 'https://bird.ioliu.cn/v1?url=http://api.douban.com/v2/movie/top250?count='
let fetchData = num =>{
	const url = `${doubanUrl}${num}`
	axios.get(url).then(res=>{
		res.data.subjects.map( value =>{
			let movie = {
				rating:value.rating.average,
				introduction:value.genres,
				title:value.title
			}
			Movie.create(movie,(err,movie)=>{
				if(err){
					console.log(err)
				}else{
					// console.log(movie.title,'---------')
				}

			})
		})
	}).catch(err=>{
		console.log(err)
	})
}
fetchData(10)
db.connection.on("error", function (error) {
  console.log("数据库连接失败：" + error)
})

db.connection.on("open", function () {
  console.log("数据库连接成功")
})

db.connection.on('close', function() {
    console.log('数据库断开，重新连接数据库');
    mongoose.connect('mongodb://localhost:27017/vueData');
});

//启动
app.listen(port,() =>{
	console.log(`listen on port ${port}`)
})

module.exports = app