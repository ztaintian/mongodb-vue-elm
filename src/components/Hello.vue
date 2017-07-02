<template>
  <div class="hello">
    <el-table
      :data="tableData"
      style="width: 100%;">
      <el-table-column
        prop="title"
        label="电影名称"
       >
      </el-table-column>
      <el-table-column
        prop="rating"
        label="评分"
       >
      </el-table-column>
      <el-table-column
        prop="introduction"
        label="介绍"
       >
      </el-table-column>
      <el-table-column
        prop="remake"
        label="备注">
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
  methods:{
    add(){
      this.$router.push('Detail')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.hello .el-table th{
  text-align: center;
}
</style>
