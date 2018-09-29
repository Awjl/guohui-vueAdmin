<template>
  <div class="home">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="文字介绍" prop="desc">
        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 15}" v-model="ruleForm.contentFirst"></el-input>
        <span style="position: absolute;bottom:-30px;left:0px;color:red">{{textone}}</span>
      </el-form-item>
      <el-form-item label="上传图片">
        <span style="position: absolute;top:30px;left:0px;color:red">{{imgone}}</span>
        <div class="upbtn">
          <label for="up">预览图片</label>
          <input @change="upavatarimg" type="file" id="up" value="图片上传预览" />
        </div>
          <img :src="oneavatar" alt="" v-if="oneavatar">
      </el-form-item>
          <el-form-item label="文字介绍" prop="desc">
            <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 15}" v-model="ruleForm.contentSecond"></el-input>
            <span style="position: absolute;bottom:-30px;left:0px;color:red">{{texttwo}}</span>
          </el-form-item>
          <el-form-item label="上传图片">
            <span style="position: absolute;top:30px;left:0px;color:red">{{imgtwo}}</span>
            <div class="upbtn">
              <label for="uptwo">预览图片</label>
              <input @change="upavatartwoimg" type="file" id="uptwo" value="图片上传预览" />
        </div>
              <img :src="twoavatar" alt="" v-if="twoavatar">
      </el-form-item>
              <el-form-item label="文字介绍" prop="desc">
                <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 15}" v-model="ruleForm.contentThird"></el-input>
                <span style="position: absolute;bottom:-30px;left:0px;color:red">{{textthree}}</span>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm" :disabled="!(homeData.indexOf('4') !== -1)" :title="(homeData.indexOf('4') !== -1) ? '' : '暂无权限'">保存</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
    </el-form>
  </div>

</template>


<script>
import { getIntroduces, editIntroduce } from '@/api/home'
import { ERR_OK } from '@/api/config'
import { mapGetters } from 'vuex'

const formData = new FormData()

export default {
  data() {
    return {
      imageUrl: '',
      ruleForm: {},
      rules: {
      },
      oneavatar: '',
      twoavatar: '',
      imgType: {
        type: 'image/jpeg, image/png, image/jpg'
      },
      textone: '',
      texttwo: '',
      textthree: '',
      imgone: '',
      imgtwo: ''
    }
  },
  created() {
    this._getIntroduces()
  },
  computed: {
    ...mapGetters([
      'homeData'
    ])
  },
  methods: {
    _getIntroduces() {
      getIntroduces().then((res) => {
        if (res.code === ERR_OK) {
          console.log('获取详情==========')
          console.log(res.data)
          this.ruleForm = res.data[0]
          this.oneavatar = res.data[0].urlFirst
          this.twoavatar = res.data[0].urlSecond
        }
      })
    },
    submitForm(formName) {
      if (!this.ruleForm.contentFirst) {
        this.textone = '请输入文字介绍'
        return
      }
      if (!this.ruleForm.contentSecond) {
        this.texttwo = '请输入文字介绍'
        return
      }
      if (!this.ruleForm.contentThird) {
        this.textthree = '请输入文字介绍'
        return
      }
      if (!this.ruleForm.contentFirst) {
        this.imgone = '请上传图片'
        return
      }
      if (!this.ruleForm.contentSecond) {
        this.imgtwo = '请上传图片'
        return
      }
      formData.set('id', this.ruleForm.id)
      formData.set('contentFirst', this.ruleForm.contentFirst)
      formData.set('contentSecond', this.ruleForm.contentSecond)
      formData.set('contentThird', this.ruleForm.contentThird)
      editIntroduce(formData).then((res) => {
        if (res.data.code === ERR_OK) {
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.textone = ''
          this.texttwo = ''
          this.textthree = ''
          this.imgone = ''
          this.imgtwo = ''
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    upavatarimg(e) {
      var avatarImg = e.target.files[0]
      var avatarImgsize = avatarImg.size
      var avatarImgtype = avatarImg.type
      // 验证图片格式
      if (this.imgType.type.indexOf(avatarImgtype) === -1) {
        this.$message.error('格式不正确')
        return false
      } else if (avatarImgsize > 5242880) {
        this.$message.error('图片太大了')
        return false
      } else {
        const _this = this
        if (!e || !window.FileReader) return
        const reader = new FileReader()
        reader.readAsDataURL(avatarImg)
        reader.onload = function(e) {
          _this.oneavatar = e.target.result
        }
        formData.set('urlFirst', e.target.files[0])
      }
    },
    upavatartwoimg(e) {
      var avatartwoImg = e.target.files[0]
      var avatarImgsize = avatartwoImg.size
      var avatarImgtype = avatartwoImg.type
      // 验证图片格式
      if (this.imgType.type.indexOf(avatarImgtype) === -1) {
        this.$message.error('格式不正确')
        return false
      } else if (avatarImgsize > 5242880) {
        this.$message.error('图片太大了')
        return false
      } else {
        const _this = this
        if (!e || !window.FileReader) return
        const reader = new FileReader()
        reader.readAsDataURL(avatartwoImg)
        reader.onload = function(e) {
          _this.twoavatar = e.target.result
        }
        formData.set('urlSecond', e.target.files[0])
      }
    }
  }
}
</script>

<style>
.home {
  padding: 20px;
  width: 60%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.upbtn {
  width: 100px;
  height: 30px;
  background: #66b1ff;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  margin-bottom: 50px;
}
.upbtn label {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100px;
  height: 30px;
  color: #fff;
  text-align: center;
  line-height: 30px;
}
.upbtn input {
  opacity: 0;
}
</style>
