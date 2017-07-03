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
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" icon="plus" @click="add()">增加</el-button>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      tableData: []
    }
  },
  mounted(){
    this.getAllMovies();
  },
  methods:{
    add(){
      this.$router.push('Detail')
    },
    del(index,value){
      console.log(value[index])
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
.el-button--primary{
  margin-top: 15px;
}
</style>
