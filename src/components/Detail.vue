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
/*  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model.number="ruleForm2.age"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
      <el-button @click="resetForm('ruleForm2')">重置</el-button>
    </el-form-item>
  </el-form>
  <script>
    export default {
      data() {
        var checkAge = (rule, value, callback) => {
          if (!value) {
            return callback(new Error('年龄不能为空'));
          }
          setTimeout(() => {
            if (!Number.isInteger(value)) {
              callback(new Error('请输入数字值'));
            } else {
              if (value < 18) {
                callback(new Error('必须年满18岁'));
              } else {
                callback();
              }
            }
          }, 1000);
        };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm2.checkPass !== '') {
              this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm2.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          ruleForm2: {
            pass: '',
            checkPass: '',
            age: ''
          },
          rules2: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
            age: [
              { validator: checkAge, trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
  </script>*/
</style>

