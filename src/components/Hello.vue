<template>
  <div class="hello">
  <el-table
    :data="tableData"
    border
    align="center"
    style="width: 100%">
      <el-table-column
        prop="createdTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="电影名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="rating"
        label="评分"
        width="180">
      </el-table-column>
      <el-table-column
        prop="introduction"
        label="介绍">
      </el-table-column>
      <el-table-column
        label="操作"
        width="180">
        <template scope="scope">
          <el-button @click="del(scope.$index, tableData)" type="text" size="small">删除</el-button>
          <el-button type="text" @click="edit(scope.$index, tableData)" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="button">
      <el-button type="primary" icon="plus" @click="add()">增加</el-button>
    </div>
    <el-dialog
    title="编辑"
    :visible.sync="dialogVisible"
    size="tiny"
    :before-close="handleClose">
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
<!--         <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'hello',
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
      tableData: [],
      dialogVisible: false,
      labelPosition: 'right',
      id:'',
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
    this.getAllMovies();
  },
  methods:{
    modify(id){
      this.$http.put(`/api/movie/${id}`,this.formLabelAlign).then(res=>{
        console.log(res);
      }).catch(err=>{
        console.log(err);
      })
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          this.modify(this.id);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleClose(done) {
      done();
    },
    edit(index,value){
      this.dialogVisible = true;
      this.id = value[index]._id;
    },
    add(){//增加
      this.$router.push('Detail')
    },
    del(index,value){
      let id = value[index]._id;
      this.$http.delete(`/api/movie/${id}`).then(res=>{
        console.log(res);
        this.getAllMovies();
      })
    },
    getAllMovies(){
      this.$http.get('/api/movie',{}).then(res=>{
        res.data.forEach(function(value){
          var d = new Date(value.createdTime);
          var year = d.getFullYear();
          var month = d.getMonth() + 1 < 10?'0' +(d.getMonth()+1):''+ d.getMonth();
          var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
          var hour = d.getHours()<10?'0' + d.getHours() : '' + d.getHours();
          var minutes = d.getMinutes()<10? '0' + d.getMinutes() : '' + d.getMinutes();
          var seconds = d.getSeconds()<10? '0' + d.getSeconds() : '' +  d.getSeconds();
          value.createdTime = year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
        })
        this.tableData = res.data;
      })
      .catch(e=>{
       console.log(e)
      })
    }
  },
  filters:{
    dataFilter:function(data){
      let str = new Date(data);
      console.log(str)
      var d = new Date(str);
      var year = d.getFullYear();
      var month = d.getMonth() + 1 < 10?'0' +(d.getMonth()+1):''+d.getMonth();
      var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
      var hour = d.getHours();
      var minutes = d.getMinutes();
      var seconds = d.getSeconds();
      return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button{
  margin-top: 15px;
  text-align:center; 
}
</style>
