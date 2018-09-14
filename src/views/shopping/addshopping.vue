<template>
  <div class="app-container">
    <el-form ref="dataForm" label-position="center" label-width="100px" style='width: 1000px; margin-left:50px;'>
      <el-row>
        <el-col :span="24">
          <el-form-item label="名称">
            <el-input placeholder="请输入商品名称" v-model="shoplist.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="产品类型">
            <el-select clearable style="width: 150px" class="filter-item" v-model="shoplist.type" placeholder="选择分类">
              <el-option label="房券" :value="1">
                房券
              </el-option>
              <el-option label="餐券" :value="2">
                餐券
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否推荐">
            <el-select clearable style="width: 150px" class="filter-item" v-model="shoplist.isCommend" placeholder="选择分类">
              <el-option label="房券" :value="1">
                热推
              </el-option>
              <el-option label="餐券" :value="2">
                非热推
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否预约">
            <el-select clearable style="width: 150px" class="filter-item" v-model="shoplist.isBespeak" placeholder="选择分类">
              <el-option label="需要预约" :value="1">
                需要预约
              </el-option>
              <el-option label="不需要预约" :value="2">
                不需要预约
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
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
        <el-col :span="12">
          <el-form-item label="原价">
            <el-input placeholder="请输入价格" v-model="shoplist.oldPrice"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="折扣价">
            <el-input placeholder="请输入折扣价" v-model="shoplist.newPrice"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="简介">
            <el-input placeholder="请输入简介" v-model="shoplist.summary"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="介绍">
            <el-input placeholder="请输入介绍" v-model="shoplist.introduce"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="有效期">
            <el-input placeholder="请输入有效期" v-model="shoplist.termOfValidity"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用时间">
            <el-input placeholder="请输入使用时间" v-model="shoplist.useTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="使用规则">
            <el-input placeholder="请输入使用规则" v-model="shoplist.useRule"></el-input>
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
                  <div class="btndel">删除</div>
                </el-col>
              </div>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="缩略图标题">
            <el-input placeholder="请输入缩略图标题" v-model="shoplist.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="缩略图">
            <div class="upbtn">
              <label for="up">预览图片</label>
              <input @change="upavatarimg" type="file" id="up" value="图片上传预览" />
            </div>
            <el-row :gutter="20">
              <el-col :span="8"  v-if="shoplist.showFile">
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
import { addGoods, getGoodsById, deleteGoodPic, editGoods } from '@/api/shoping'
import { ERR_OK } from '@/api/config'

const formData = new FormData()

export default {
  data() {
    return {
      shoplist: {
        name: '',
        type: '',
        oldPrice: '',
        newPrice: '',
        summary: '',
        introduce: '',
        isCommend: '',
        isBespeak: '',
        termOfValidity: '',
        useTime: '',
        useRule: '',
        showFile: '',
        bannerFiles: '',
        introduceFiles: '',
        title: '',
        isUpper: ''
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
    if (this.$route.params.id) {
      this._getGoodsById(this.$route.params.id)
    }
  },
  methods: {
    _addGoods() {
      console.log(formData.getAll('bannerFiles'))
      addGoods(formData).then((res) => {
        if (res.data.code === ERR_OK) {
          console.log('-----------------------')
        }
      })
    },
    _editGoods() {
      editGoods(formData).then((res) => {
        if (res.data.code === ERR_OK) {
          console.log('-----------修改------------')
        }
      })
    },
    _getGoodsById(id) {
      getGoodsById(id).then((res) => {
        if (res.code === ERR_OK) {
          this.shoplist.name = res.data.goods.name
          this.shoplist.type = res.data.goods.type
          this.shoplist.oldPrice = res.data.goods.oldPrice
          this.shoplist.newPrice = res.data.goods.newPrice
          this.shoplist.summary = res.data.goods.summary
          this.shoplist.introduce = res.data.goods.introduce
          this.shoplist.isCommend = res.data.goods.isCommend
          this.shoplist.isBespeak = res.data.goods.isBespeak
          this.shoplist.termOfValidity = res.data.goods.termOfValidity
          this.shoplist.useTime = res.data.goods.useTime
          this.shoplist.useRule = res.data.goods.useRule
          this.shoplist.isUpper = res.data.goods.isUpper
          this.shoplist.showFile = res.data.showPic.url
          this.shoplist.title = res.data.showPic.title

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
      formData.append('type', this.shoplist.type)
      formData.append('oldPrice', this.shoplist.oldPrice)
      formData.append('newPrice', this.shoplist.newPrice)
      formData.append('summary', this.shoplist.summary)
      formData.append('introduce', this.shoplist.introduce)
      formData.append('isCommend', this.shoplist.isCommend)
      formData.append('isBespeak', this.shoplist.isBespeak)
      formData.append('termOfValidity', this.shoplist.termOfValidity)
      formData.append('useTime', this.shoplist.useTime)
      formData.append('useRule', this.shoplist.useRule)
      formData.append('title', this.shoplist.title)
      formData.append('isUpper', this.shoplist.isUpper)
      if (this.$route.params.id) {
        formData.append('id', this.$route.params.id)
        this._editGoods()
      } else {
        this._addGoods()
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
