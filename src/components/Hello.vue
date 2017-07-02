<template>
  <div class="hello">
  <el-table
    :data="tableData"
    border
    align="center"
    style="width: 100%">
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
    getAllMovies(){
      this.$http.get('/api/movie',{}).then(res=>{
       this.tableData = res.data;
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
.el-button--primary{
  margin-top: 15px;
}
</style>
