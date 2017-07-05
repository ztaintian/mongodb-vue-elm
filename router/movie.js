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
router.get('/movie',(req,res) =>{
	Movie.find({})
				.sort({updateTime:-1})
				.then(movies =>{
					res.json(movies)
				})
				.catch(err=>{
					res.json(err)
				})
})



module.exports = router