const express = require('express')
const router = express.Router()
const Movie = require('../model/movie')

//添加一部电影
router.post('/movie',(req,res)=>{
	Movie.create(req.body,(err,movie)=>{
		if(err){
			res.json(err)
		}else{
			res.json(movie)
		}
	})
})

 //删除一部电影
 router.delete('/movie/:id',(req,res) =>{
 	Movie.findOneAndRemove({
 		_id:req.params.id
 	})
 	.then(movie =>res.send(`${movie.title}删除成功`))
 	.catch(err =>res.json(err))
 })

 // 修改一部电影
 router.put('/movie/:id',(req,res)=>{
 	Movie.findOneAndUpdate(
 	{
 		_id:req.params.id
 	},
 	{
 		$set:
 		{
 			title:req.body.title,
 			rating:req.body.rating,
 			poster:req.body.poster,
 			introduction:req.body.introduction
 		}
 	},
 	{
 		new:true
 	}).then(movie =>res.send(movie))
 	.catch(err =>res.json(err))
 })

 //查询一部电影
 router.get('/movie/:rating',(req,res)=>{
 	Movie.find({rating:req.params.rating})
 		.then(movie=>{
 			res.json(movie)
 		}).catch(err=>{
 			res.json(err)
 		})
 })
//查询所以电影
router.post('/allMovie',(req,res) =>{
	let num = req.body.num || 1;
	let rating = req.body.rating;
	let pageTotle;
	let obj = {};
	let data = {};
	if(rating){
		data.rating = rating;
	}
	Movie.find(data).count((err, res)=>{
		pageTotle =Math.ceil(res/10);
	})
	Movie.find(data).sort({updateTime:-1}).skip(num*10-10).limit(10)
		.then(movies =>{
			obj.data = movies;
			obj.pageTotle = pageTotle;
			res.json(obj)
		})
		.catch(err=>{
			res.json(err)
		})
})
module.exports = router