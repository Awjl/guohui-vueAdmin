<template>
  <div class="dashboard-container">
    <div class="dashboard-text">管理员:admin</div>
    <!-- <div class="dashboard-text">职责:<span v-for='role in roles' :key='role'>{{role}}</span></div> -->
    <admin-dashboard></admin-dashboard>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'

export default {
  components: { adminDashboard },
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
