<template>
  <div class="app-container">
    <el-form ref="dataForm" label-position="center" label-width="100px" style='width: 1000px; margin-left:50px;'>
      <el-row>
        <el-col :span="24">
          <el-form-item label="名称">
            <el-input placeholder="请输入商品名称" v-model="shoplist.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="简介">
            <el-input placeholder="请输入简介" v-model="shoplist.summary"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="类型">
            <el-input placeholder="请输入类型" v-model="shoplist.kind"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="参数">
            <el-input placeholder="请输入参数" v-model="shoplist.param"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="对应级别">
            <el-select clearable style="width: 150px" class="filter-item" v-model="shoplist.level" placeholder="选择对应级别">
              <el-option label="全部" :value="3">
                全部
              </el-option>
              <el-option label="V1会员" :value="1">
                V1会员
              </el-option>
              <el-option label="V2会员" :value="2">
                V2会员
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="是否上架">
            <el-select clearable style="width: 150px" class="filter-item" v-model="shoplist.isUpper" placeholder="选择分类">
              <el-option label="上架" :value="1">
                上架
              </el-option>
              <el-option label="不上架" :value="2">
                不上架
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="库存">
            <el-input placeholder="请输入库存" v-model="shoplist.stock"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="原积分">
            <el-input placeholder="请输入价格" v-model="shoplist.oldPoint"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="v1积分">
            <el-input placeholder="v1对应的积分" v-model="shoplist.v1NewPoint"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="v2积分">
            <el-input placeholder=" v2对应的积分" v-model="shoplist.v2NewPoint"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="介绍">
            <el-input placeholder="请输入介绍" v-model="shoplist.introduce"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="顶部图片">
            <div class="upbtn">
              <label for="up">多张上传</label>
              <input @change="upTopImg" type="file" id="upTop" value="图片上传预览" multiple/>
            </div>
            <el-row :gutter="20">
              <div>
                <el-col :span="8" v-if="topImg" v-for="(item, index) in topImg" :key="index" class="delbox">
                  <img :src="item" alt="">
                  <div class="btndel">删除</div>
                </el-col>
              </div>
              <div>
                <el-col :span="8" v-if="topDataList" v-for="(item, index) in topDataList" :key="index" class="delbox">
                  <img :src="item.url" alt="">
                  <div class="btndel" @click="delUpimg(item.id)">删除</div>
                </el-col>
              </div>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="详情图片">
            <div class="upbtn">
              <label for="up">多张上传</label>
              <input @change="upaBottomimg" type="file" id="upBottom" value="图片上传预览" multiple/>
            </div>
            <el-row :gutter="20">
              <div>
                <el-col :span="8" v-if="bottomImg" v-for="(item, index) in bottomImg" :key="index" class="delbox">
                  <img :src="item" alt="">
                  <div class="btndel">删除</div>
                </el-col>
              </div>
              <div>
                <el-col :span="8" v-if="bottomDataList" v-for="(item, index) in bottomDataList" :key="index" class="delbox">
                  <img :src="item.url" alt="">
                  <div class="btndel" @click="delUpimg(item.id)" >删除</div>
                </el-col>
              </div>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="缩略图">
            <div class="upbtn">
              <label for="up">预览图片</label>
              <input @change="upavatarimg" type="file" id="up" value="图片上传预览" />
            </div>
            <el-row :gutter="20">
              <el-col :span="8" v-if="shoplist.showFile">
                <img :src="shoplist.showFile" alt="">
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button @click="quxiao">重置</el-button> -->
      <el-button type="primary" @click="trueover">保存</el-button>
    </div>
  </div>
</template>
<script>
import { addPointGoods, getPointGoodsById, deleteGoodPic, editPointGoods } from '@/api/shoping'
import { ERR_OK } from '@/api/config'

const formData = new FormData()

export default {
  data() {
    return {
      shoplist: {
        name: '',
        summary: '',
        kind: '',
        oldPoint: '',
        v1NewPoint: '',
        v2NewPoint: '',
        param: '',
        introduce: '',
        stock: '',
        isUpper: '',
        level: '',
        showFile: '',
        bannerFiles: '',
        introduceFiles: ''
      },
      imgType: {
        type: 'image/jpeg, image/png, image/jpg'
      },
      topImg: [],
      bottomImg: [],
      topDataList: [],
      bottomDataList: []
    }
  },
  created() {
    if (this.$route.params.id !== 'null') {
      this._getPointGoodsById(this.$route.params.id)
    }
  },
  methods: {
    _addPointGoods() {
      addPointGoods(formData).then((res) => {
        if (res.data.code === ERR_OK) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        }
      })
    },
    _editPointGoods() {
      editPointGoods(formData).then((res) => {
        if (res.data.code === ERR_OK) {
          console.log('-----------修改------------')
          this.$message({
            type: 'success',
            message: '修改成功'
          })
        }
      })
    },
    _getPointGoodsById(id) {
      getPointGoodsById(id).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res.data)
          this.shoplist.name = res.data.pointGoods.name
          this.shoplist.oldPoint = res.data.pointGoods.oldPoint
          this.shoplist.v1NewPoint = res.data.pointGoods.v1NewPoint
          this.shoplist.v2NewPoint = res.data.pointGoods.v2NewPoint
          this.shoplist.param = res.data.pointGoods.param
          this.shoplist.stock = res.data.pointGoods.stock
          this.shoplist.level = res.data.pointGoods.level
          this.shoplist.summary = res.data.pointGoods.summary
          this.shoplist.introduce = res.data.pointGoods.introduce
          this.shoplist.isUpper = res.data.pointGoods.isUpper
          this.shoplist.showFile = res.data.showPic.url
          this.shoplist.kind = res.data.pointGoods.kind
          this.topDataList = res.data.bannerPics
          this.bottomDataList = res.data.introducePics
          console.log(this.shoplist)
        }
      })
    },
    delUpimg(id) {
      console.log(id)
      deleteGoodPic(id).then((res) => {
        if (res.code === ERR_OK) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      })
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
          _this.shoplist.showFile = e.target.result
        }
        formData.set('showFile', e.target.files[0])
      }
    },
    upTopImg(e) {
      var avatarImg = e.target.files
      console.log(avatarImg)
      for (var i = 0; i < avatarImg.length; i++) {
        var Img = e.target.files[i]
        var avatarImgsize = Img.size
        var avatarImgtype = Img.type
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
          reader.readAsDataURL(Img)
          reader.onload = function(e) {
            _this.topImg.push(e.target.result)
          }
          console.log(this.topImg)
          formData.append('bannerFiles', Img)
        }
      }
    },
    upaBottomimg(e) {
      var avatarImg = e.target.files
      console.log(avatarImg)
      for (var i = 0; i < avatarImg.length; i++) {
        var Img = e.target.files[i]
        var avatarImgsize = Img.size
        var avatarImgtype = Img.type
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
          reader.readAsDataURL(Img)
          reader.onload = function(e) {
            _this.bottomImg.push(e.target.result)
          }
          console.log(this.topImg)
          formData.append('introduceFiles', Img)
        }
      }
    },
    trueover() {
      formData.append('name', this.shoplist.name)
      formData.append('summary', this.shoplist.summary)
      formData.append('kind', this.shoplist.kind)
      formData.append('oldPoint', this.shoplist.oldPoint)
      formData.append('v1NewPoint', this.shoplist.v1NewPoint)
      formData.append('v2NewPoint', this.shoplist.v2NewPoint)
      formData.append('param', this.shoplist.param)
      formData.append('introduce', this.shoplist.introduce)
      formData.append('stock', this.shoplist.stock)
      formData.append('isUpper', this.shoplist.isUpper)
      formData.append('level', this.shoplist.level)
      if (this.$route.params.id !== 'null') {
        console.log(this.$route.params.id)
        formData.append('id', this.$route.params.id)
        this._editPointGoods()
      } else {
        console.log('保存')
        this._addPointGoods()
      }
    }
  }
}
</script>
<style>
img {
  width: 100%;
}
.he20 {
  height: 20px;
}
.filter-container {
  width: 100%;
  min-height: 700px;
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
.delbox {
  position: relative;
}
.btndel {
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background: #66b1ff;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
}
</style>
