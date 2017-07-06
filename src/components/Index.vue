<template>
  <div class="hello">
  <el-button class="search" type="primary" @click="seach" icon="search">评分搜索</el-button>
  <el-input class="search_ipt" v-model="seachData"></el-input>
  <el-table
    :data="tableData"
    border>
      <el-table-column
        align="center"
        prop="createdTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="title"
        label="电影名称"
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="rating"
        label="评分"
        width="180"
        sortable
        >
      </el-table-column>
      <el-table-column
        align="center"
        prop="introduction"
        label="介绍">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        prop="_id"
        width="180">
        <template  scope="props">
          <el-button @click="del(props.row._id)" type="danger" size="small">删除</el-button>
          <el-button @click="edit(props.row)" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
      layout="prev, pager, next"
      :total="pagaNum"
      @current-change="handleCurrentChange">
      </el-pagination>      
    </div>
    <div class="button">
      <el-button type="primary" icon="plus" @click="add()">增加</el-button>
    </div>
    <el-dialog title="编辑" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
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
      seachData:'',
      pagaNum:Number,
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
    handleCurrentChange(val){
      if(this.seachData){
        this.seach();
      }else{
        this.getAllMovies(val);
      }
    },
    seach(){
      // let id = this.seachData;
      // this.$http.get(`/api/movie/${id}`).then(res=>{
      //   this.dataFilter(res.data);
      //   this.tableData = res.data;
      // }).catch(err=>{
      //   console.log(err);
      // })
      this.getAllMovies();
    },
    modify(id){
      this.$http.put(`/api/movie/${id}`,this.formLabelAlign).then(res=>{
        console.log(res);
        if(res.status === 200){
          this.$message({
            message: '电影修改成功',
            type: 'success',
            duration:1000
          })
          this.getAllMovies();
        }else{
          this.$message({
            message: '电影修改失败',
            type: 'error',
            duration:1000
          })
        }
      }).catch(err=>{
        console.log(err);
      })
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
          this.modify(this.id);
          this.getAllMovies();
        }else{
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleClose(done) {
      done();
    },
    edit(data){//编辑电影
      this.dialogVisible = true;
      this.id = data._id;
      this.formLabelAlign = data;
    },
    add(){//增加
      this.$router.push('Detail')
    },
    del(id){//删除电影
      this.$http.delete(`/api/movie/${id}`).then(res=>{
        if(res.status === 200){
          this.$message({
            message: '电影删除成功',
            type: 'success',
            duration:1000
          })
          this.getAllMovies();
        }else{
          this.$message({
            message: '电影删除失败',
            type: 'error',
            duration:1000
          })
        }
      })
    },
    getAllMovies(num){
      let rating =  this.seachData;
      this.$http.post('/api/allMovie',{num:`${num}`,rating:`${rating}`}).then(res=>{
        this.dataFilter(res.data.data);
        this.tableData = res.data.data;
        this.pagaNum = res.data.pageTotle*10;
      })
      .catch(e=>{
       console.log(e)
      })
    },
    dataFilter(arr){//时间格式化
      arr.forEach(function(value){
        var d = new Date(value.createdTime);
        var year = d.getFullYear();
        var month = d.getMonth() + 1 < 10?'0' +(d.getMonth()+1):''+ d.getMonth();
        var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
        var hour = d.getHours()<10?'0' + d.getHours() : '' + d.getHours();
        var minutes = d.getMinutes()<10? '0' + d.getMinutes() : '' + d.getMinutes();
        var seconds = d.getSeconds()<10? '0' + d.getSeconds() : '' +  d.getSeconds();
        value.createdTime = year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
      })
    }
  },
  filters:{
    dataFilter:function(data){
      let str = new Date(data);
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
.search_ipt{
  width:200px;
  margin-top:15px;
  float: right;
}
.search {
  margin:15px;
  float:right;
}
.pagination{
  float: right;
  margin: 10px;
}
</style>
