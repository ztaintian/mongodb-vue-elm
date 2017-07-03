<template>
  <div class="detail">
<el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
  <el-form-item label="电影名称">
    <el-input v-model="formLabelAlign.title"></el-input>
  </el-form-item>
  <el-form-item label="评分">
    <el-input v-model="formLabelAlign.rating"></el-input>
  </el-form-item>
  <el-form-item label="介绍">
    <el-input type="textarea" v-model="formLabelAlign.introduction"></el-input>
  </el-form-item>
	<el-form-item>
	  <el-button type="primary" @click="submitForm">提交</el-button>
	  <el-button @click="resetForm">重置</el-button>
	</el-form-item>
</el-form>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
			labelPosition: 'right',
      formLabelAlign: {
        title: '',
        poster: '',
        rating: '',
        introduction:''
      }
    }
  },
  mounted(){
  },
  methods:{
  	submitForm(){
  		this.addMovies();
  	},
  	resetForm(){
  		this.formLabelAlign ={};
  	},
    addMovies(){
      this.$http.post('/api/movie',this.formLabelAlign).then(res=>{
       console.log(res.data)
       this.$router.push('hello');
      })
      .catch(e=>{
       console.log(e)
      })
    }
  },
  filters:{
    dataFilter:(data)=> {
      let str = new Date(data);
      console.log(str)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
