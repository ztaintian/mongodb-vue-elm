<template>
  <div class="detail">
    <el-form :label-position="labelPosition" :rules="rules" ref="ruleForm" label-width="80px" :model="formLabelAlign">
      <el-form-item label="电影名称" prop="title">
        <el-input v-model="formLabelAlign.title"></el-input>
      </el-form-item>
      <el-form-item label="评分" prop="rating">
        <el-input v-model="formLabelAlign.rating"></el-input>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input type="textarea" v-model="formLabelAlign.introduction"></el-input>
      </el-form-item>
    	<el-form-item>
    	  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    	  <el-button @click="resetForm">重置</el-button>
    	</el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    let checkTitle = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('标题不能为空'));
      }else{
        callback();
      }
    };
    let checkRating = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('评分不能为空'));
      }
      setTimeout(() => {
        if (isNaN(value)){
          callback(new Error('请输入数字值'));
        } else {
          callback();
        }
      }, 200);
    };
    return {
			labelPosition: 'right',
      formLabelAlign: {
        title: '',
        poster: '',
        rating: '',
        introduction:''
      },
      rules:{
        title: [
          { validator: checkTitle, trigger: 'blur' }
        ],
        rating: [
          { validator: checkRating, trigger: 'blur' }
        ]
      }
    }
  },
  mounted(){
  },
  methods:{
  	submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addMovies();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
  	},
  	resetForm(){
  		this.formLabelAlign ={};
  	},
    addMovies(){
      this.$http.post('/api/movie',this.formLabelAlign).then(res=>{
       this.$router.push('/');
      })
      .catch(e=>{
       console.log(e)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

