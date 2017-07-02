const mongoose = require('mongoose')
const movieSchema =mongoose.Schema({
	title:{//电影名称
		type:String,
		require:true
	},
	poster:String,//简介
	rating:String,//评分
	introductin:String,//介绍
	createdTime:{//创建时间
		type:Date,
		default:Date.now
	},
	updateTime:{//更新时间
		type:Date,
		default:Date.now
	}
})
const Movie = module.exports = mongoose.model('Movie',movieSchema)