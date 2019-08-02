<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img class="user-avatar" src="./my-tou.png" />
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>首页</el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="password" style="display:block;">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog title="修改密码" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="新密码" prop="newpass">
          <el-input type="password" v-model="ruleForm.newpass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="twonewpass">
          <el-input type="password" v-model="ruleForm.twonewpass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { removeToken } from "@/utils/auth";
// 修改密码
import { changePassword } from "@/api/login";
import { ERR_OK } from "@/api/config";

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        newpass: "",
        twonewpass: ""
      },
      rules: {
        newpass: [{ validator: validatePass, trigger: "blur" }],
        twonewpass: [{ validator: validatePass2, trigger: "blur" }]
      },
      centerDialogVisible: false
    };
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters(["sidebar"])
  },
  methods: {
    _changePassword(password) {
      console.log(password);
      return;
      let data = {
        id: window.sessionStorage.getItem("userId"),
        password: password
      };
      changePassword(data).then(res => {
        if (res.code === ERR_OK) {
          this.$message({
            type: "success",
            message: "密码修改成功"
          });
          this.centerDialogVisible = false;
          this.logout();
        }
      });
    },
    toggleSideBar() {
      this.$store.dispatch("ToggleSideBar");
    },
    logout() {
      removeToken();
      this.$router.push({
        path: "/login"
      });
    },
    password() {
      this.centerDialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this._changePassword(this.ruleForm.twonewpass);
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

