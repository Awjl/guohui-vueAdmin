<template>
  <div class="app-container" style="width: 80%">
    <!-- <el-button @click="quxiaoover" style="float:right;">关闭</el-button> -->
    <el-form
      ref="dataForm"
      label-position="center"
      label-width="100px"
      style="width: 1000px; margin-left:50px;"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="名称">
            <span style="position: absolute;bottom:-30px;left:0px;color:red">{{nameERR}}</span>
            <el-input placeholder="请输入商品名称" v-model="shoplist.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="产品类型">
            <el-select
              style="width: 150px"
              class="filter-item"
              v-model="shoplist.type"
              placeholder="选择分类"
            >
              <el-option label="房券" :value="1">房券</el-option>
              <el-option label="餐券" :value="2">餐券</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否推荐">
            <el-select
              style="width: 150px"
              class="filter-item"
              v-model="shoplist.isCommend"
              placeholder="选择分类"
            >
              <el-option label="热推" :value="1">热推</el-option>
              <el-option label="非热推" :value="2">非热推</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="是否预约">
            <el-select
              style="width: 150px"
              class="filter-item"
              v-model="shoplist.isBespeak"
              placeholder="选择分类"
            >
              <el-option label="需要预约" :value="1">需要预约</el-option>
              <el-option label="不需要预约" :value="2">不需要预约</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="上下架操作">
            <el-select
              style="width: 150px"
              class="filter-item"
              v-model="shoplist.isUpper"
              placeholder="选择分类"
            >
              <el-option label="上架" :value="1">上架</el-option>
              <el-option label="不上架" :value="2">不上架</el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="原价(分)">
            <span style="position: absolute;bottom:-30px;left:0px;color:red">{{oldPriceERR}}</span>
            <el-input placeholder="请输入价格(单位：分)" v-model="shoplist.oldPrice"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="折扣价(分)">
            <span style="position: absolute;bottom:-30px;left:0px;color:red">{{newPriceERR}}</span>
            <el-input placeholder="请输入折扣价(单位：分)" v-model="shoplist.newPrice"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="简介">
            <span style="position: absolute;bottom:-30px;left:0px;color:red">{{summaryERR}}</span>
            <el-input placeholder="请输入简介" v-model="shoplist.summary"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="介绍">
            <span style="position: absolute;bottom:-30px;left:0px;color:red">{{introduceERR}}</span>
            <el-input
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 15}"
              placeholder="请输入介绍"
              v-model="shoplist.introduce"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="有效期">
            <span style="position: absolute;bottom:-30px;left:0px;color:red">{{dataERR}}</span>
            <el-date-picker
              v-model="dataArr"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用时间">
            <span style="position: absolute;bottom:-30px;left:0px;color:red">{{useTimeERR}}</span>
            <el-input placeholder="格式如：周一至周五（默认：周末、法定节假日通用）" v-model="shoplist.useTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="使用规则">
            <span style="position: absolute;bottom:-30px;left:0px;color:red">{{useRuleERR}}</span>
            <el-input placeholder="格式如：周一至周五使用/早上到晚上/需要预约" v-model="shoplist.useRule"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="顶部图片(750*500)">
            <span style="position: absolute;top:20px;left:0px;color:red">{{TopImgERR}}</span>
            <div class="upbtn">
              <label for="upTop">多张上传</label>
              <input @change="upTopImg" type="file" id="upTop" value="图片上传预览" multiple>
            </div>
            <el-row :gutter="20">
              <div>
                <el-col
                  :span="8"
                  v-if="topImg"
                  v-for="(item, index) in topImg"
                  :key="index"
                  class="delbox"
                >
                  <img :src="item" alt>
                  <div class="btndel" @click="dellocalhostimg(index)">删除</div>
                </el-col>
              </div>
              <div>
                <el-col
                  :span="8"
                  v-if="topDataList"
                  v-for="(item, index) in topDataList"
                  :key="index"
                  class="delbox"
                >
                  <img :src="item.url" alt>
                  <div class="btndel" @click="delUpimg(item.id)">删除</div>
                </el-col>
              </div>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="详情图片">
            <span style="position: absolute;top:20px;left:0px;color:red">{{BottomimgERR}}</span>
            <div class="upbtn">
              <label for="upBottom">多张上传</label>
              <input @change="upaBottomimg" type="file" id="upBottom" value="图片上传预览" multiple>
            </div>
            <el-row :gutter="20">
              <div>
                <el-col
                  :span="8"
                  v-if="bottomImg"
                  v-for="(item, index) in bottomImg"
                  :key="index"
                  class="delbox"
                >
                  <img :src="item" alt>
                  <div class="btndel" @click="delbottomlocalhostimg(index)">删除</div>
                </el-col>
              </div>
              <div>
                <el-col
                  :span="8"
                  v-if="bottomDataList"
                  v-for="(item, index) in bottomDataList"
                  :key="index"
                  class="delbox"
                >
                  <img :src="item.url" alt>
                  <div class="btndel" @click="delUpimg(item.id)">删除</div>
                </el-col>
              </div>
            </el-row>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="缩略图标题">
            <span style="position: absolute;bottom:-30px;left:0px;color:red">{{titleERR}}</span>
            <el-input placeholder="请输入缩略图标题" v-model="shoplist.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="缩略图(335*300)">
            <span style="position: absolute;top:20px;left:0px;color:red">{{avatarimgERR}}</span>
            <div class="upbtn">
              <label for="up">预览图片</label>
              <input @change="upavatarimg" type="file" id="up" value="图片上传预览">
            </div>
            <el-row :gutter="20">
              <el-col :span="8" v-if="shoplist.showFile">
                <img :src="shoplist.showFile" alt>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="quxiaoover">取消</el-button>
      <el-button type="primary" @click="trueover">保存</el-button>
    </div>
  </div>
</template>
<script>
import {
  addGoods,
  getGoodsById,
  deleteGoodPic,
  editGoods
} from "@/api/shoping";
import { ERR_OK } from "@/api/config";

export default {
  data() {
    return {
      formData: new FormData(),
      shoplist: {
        name: "",
        type: 1,
        oldPrice: "",
        newPrice: "",
        summary: "",
        introduce: "",
        isCommend: 1,
        isBespeak: 1,
        termOfValidity: "",
        useTime: "",
        useRule: "",
        showFile: "",
        bannerFiles: "",
        introduceFiles: "",
        title: "",
        isUpper: 1
      },
      imgType: {
        type: "image/jpeg, image/png, image/jpg"
      },
      topImg: [],
      bottomImg: [],
      topDataList: [],
      bottomDataList: [],
      topListImg: [],
      bottomListImg: [],
      dataArr: [],
      stateTime: "",
      endTime: "",
      nameERR: "", // 验证
      oldPriceERR: "",
      newPriceERR: "",
      summaryERR: "",
      introduceERR: "",
      dataERR: "",
      useTimeERR: "",
      useRuleERR: "",
      TopImgERR: "",
      BottomimgERR: "",
      titleERR: "",
      avatarimgERR: ""
    };
  },
  created() {
    if (this.$route.params.id !== "null") {
      this._getGoodsById(this.$route.params.id);
    }
  },
  methods: {
    _addGoods() {
      console.log(this.formData.getAll("bannerFiles"));
      addGoods(this.formData).then(res => {
        if (res.data.code === ERR_OK) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.$router.push({
            path: "/shoppingAdmin/shopping"
          });
        }
      });
    },
    _editGoods() {
      editGoods(this.formData).then(res => {
        if (res.data.code === ERR_OK) {
          console.log("-----------修改------------");
          this.$message({
            type: "success",
            message: "修改成功"
          });
          this.$router.push({
            path: "/shoppingAdmin/shopping"
          });
        }
      });
    },
    _getGoodsById(id) {
      this.dataArr = [];
      getGoodsById(id).then(res => {
        if (res.code === ERR_OK) {
          console.log(res.data);
          this.shoplist.name = res.data.goods.name;
          this.shoplist.type = res.data.goods.type;
          this.shoplist.oldPrice = res.data.goods.oldPrice;
          this.shoplist.newPrice = res.data.goods.newPrice;
          this.shoplist.summary = res.data.goods.summary;
          this.shoplist.introduce = res.data.goods.introduce;
          this.shoplist.isCommend = res.data.goods.isCommend;
          this.shoplist.isBespeak = res.data.goods.isBespeak;
          this.dataArr.push(new Date(res.data.goods.startDate));
          this.dataArr.push(new Date(res.data.goods.endDate));
          this.shoplist.useTime = res.data.goods.useTime;
          this.shoplist.useRule = res.data.goods.useRule;
          this.shoplist.isUpper = res.data.goods.isUpper;
          this.shoplist.showFile = res.data.showPic.url;
          this.shoplist.title = res.data.showPic.title;

          this.topDataList = res.data.bannerPics;
          this.bottomDataList = res.data.introducePics;
        }
      });
    },
    delUpimg(id) {
      console.log(id);
      deleteGoodPic(id).then(res => {
        if (res.code === ERR_OK) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this._getGoodsById(this.$route.params.id);
        }
      });
    },
    dellocalhostimg(item) {
      this.topImg.splice(item, 1);
      this.topListImg.splice(item, 1);
    },
    delbottomlocalhostimg(item) {
      this.bottomImg.splice(item, 1);
      this.bottomListImg.splice(item, 1);
    },
    upavatarimg(e) {
      var avatarImg = e.target.files[0];
      var avatarImgsize = avatarImg.size;
      var avatarImgtype = avatarImg.type;
      // 验证图片格式
      if (this.imgType.type.indexOf(avatarImgtype) === -1) {
        this.$message.error("格式不正确");
        return false;
      } else if (avatarImgsize > 5242880) {
        this.$message.error("图片太大了");
        return false;
      } else {
        const _this = this;
        if (!e || !window.FileReader) return;
        const reader = new FileReader();
        reader.readAsDataURL(avatarImg);
        reader.onload = function(e) {
          _this.shoplist.showFile = e.target.result;
        };
        this.formData.set("showFile", e.target.files[0]);
      }
    },
    upTopImg(e) {
      var avatarImg = e.target.files;
      console.log(avatarImg);
      for (var i = 0; i < avatarImg.length; i++) {
        var Img = e.target.files[i];
        var avatarImgsize = Img.size;
        var avatarImgtype = Img.type;
        if (this.imgType.type.indexOf(avatarImgtype) === -1) {
          this.$message.error("格式不正确");
          return false;
        } else if (avatarImgsize > 5242880) {
          this.$message.error("图片太大了");
          return false;
        } else {
          const _this = this;
          if (!e || !window.FileReader) return;
          const reader = new FileReader();
          reader.readAsDataURL(Img);
          reader.onload = function(e) {
            _this.topImg.push(e.target.result);
          };
          this.topListImg.push(Img);
        }
      }
    },
    upaBottomimg(e) {
      var avatarImg = e.target.files;
      for (var i = 0; i < avatarImg.length; i++) {
        var Img = e.target.files[i];
        var avatarImgsize = Img.size;
        var avatarImgtype = Img.type;
        if (this.imgType.type.indexOf(avatarImgtype) === -1) {
          this.$message.error("格式不正确");
          return false;
        } else if (avatarImgsize > 5242880) {
          this.$message.error("图片太大了");
          return false;
        } else {
          const _this = this;
          if (!e || !window.FileReader) return;
          const reader = new FileReader();
          reader.readAsDataURL(Img);
          reader.onload = function(e) {
            _this.bottomImg.push(e.target.result);
          };
          console.log(this.topImg);
          // this.formData.append('introduceFiles', Img)
          this.bottomListImg.push(Img);
        }
      }
    },
    trueover() {
      this.nameERR = "";
      this.oldPriceERR = "";
      this.newPriceERR = "";
      this.summaryERR = "";
      this.introduceERR = "";
      this.dataERR = "";
      this.useTimeERR = "";
      this.useRuleERR = "";
      this.TopImgERR = "";
      this.BottomimgERR = "";
      this.titleERR = "";
      this.avatarimgERR = "";
      if (!this.shoplist.name) {
        this.nameERR = "请输入用户名";
        return;
      }
      if (!this.shoplist.oldPrice) {
        this.oldPriceERR = "请输入原价";
        return;
      }
      if (!this.shoplist.newPrice) {
        this.newPriceERR = "请输入折扣价";
        return;
      }
      if (Number(this.shoplist.newPrice) > this.shoplist.oldPrice) {
        console.log(
          Number(this.shoplist.newPrice),
          Number(this.shoplist.oldPrice)
        );
        this.newPriceERR = "折扣价不能比原价大";
        return;
      } else {
        this.newPriceERR = "";
      }
      if (!this.shoplist.summary) {
        this.summaryERR = "请输入简介";
        return;
      }
      if (!this.shoplist.introduce) {
        this.introduceERR = "请输入介绍";
        return;
      }
      if (this.dataArr.length < 2) {
        this.dataERR = "请选择有效期";
        return;
      }
      if (!this.shoplist.useTime) {
        this.useTimeERR = "请输入使用时间";
        return;
      }
      if (!this.shoplist.useRule) {
        this.useRuleERR = "请输入使用规则";
        return;
      }
      if (this.topImg.length < 1 && this.topDataList.length < 1) {
        this.TopImgERR = "请上传顶部图片";
        return;
      }
      if (this.bottomImg.length < 1 && this.bottomDataList.length < 1) {
        this.BottomimgERR = "请上传详情图片";
        return;
      }
      if (!this.shoplist.title) {
        this.titleERR = "请输入缩略图标题";
        return;
      }
      if (!this.shoplist.showFile) {
        this.avatarimgERR = "请上传缩略图";
        return;
      }
      this.stateTime = `${new Date(this.dataArr[0]).getFullYear()}-${
        new Date(this.dataArr[0]).getMonth() + 1 < 10
          ? "0" + (new Date(this.dataArr[0]).getMonth() + 1)
          : new Date(this.dataArr[0]).getMonth() + 1
      }-${
        new Date(this.dataArr[0]).getDate() < 10
          ? "0" + new Date(this.dataArr[0]).getDate()
          : new Date(this.dataArr[0]).getDate()
      }`;
      this.endTime = `${new Date(this.dataArr[1]).getFullYear()}-${
        new Date(this.dataArr[1]).getMonth() + 1 < 10
          ? "0" + (new Date(this.dataArr[1]).getMonth() + 1)
          : new Date(this.dataArr[1]).getMonth() + 1
      }-${
        new Date(this.dataArr[1]).getDate() < 10
          ? "0" + new Date(this.dataArr[1]).getDate()
          : new Date(this.dataArr[1]).getDate()
      }`;
      this.formData.append("name", this.shoplist.name);
      this.formData.append("type", this.shoplist.type);
      this.formData.append("oldPrice", this.shoplist.oldPrice);
      this.formData.append("newPrice", this.shoplist.newPrice);
      this.formData.append("summary", this.shoplist.summary);
      this.formData.append("introduce", this.shoplist.introduce);
      this.formData.append("isCommend", this.shoplist.isCommend);
      this.formData.append("isBespeak", this.shoplist.isBespeak);
      this.formData.append(
        "termOfValidity",
        `${this.stateTime}至${this.endTime}`
      );
      this.formData.append("useTime", this.shoplist.useTime);
      this.formData.append("useRule", this.shoplist.useRule);
      this.formData.append("title", this.shoplist.title);
      this.formData.append("isUpper", this.shoplist.isUpper);
      for (let i = 0; i <= this.topListImg.length; i++) {
        this.formData.append("bannerFiles", this.topListImg[i]);
      }
      for (let i = 0; i <= this.bottomListImg.length; i++) {
        this.formData.append("introduceFiles", this.bottomListImg[i]);
      }
      console.log(this.formData.get("termOfValidity"));
      if (this.$route.params.id !== "null") {
        this.formData.append("id", this.$route.params.id);
        this._editGoods();
      } else {
        this._addGoods();
      }
    },
    quxiaoover() {
      this.$router.push({
        path: "/shoppingAdmin/shopping"
      });
    }
  }
};
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
.dialog-footer {
  padding: 0 90px;
}
</style>
