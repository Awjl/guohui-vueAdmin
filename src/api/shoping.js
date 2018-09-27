import { api } from './config'
import axios from 'axios'

// 商品列表
export function getAllGoods(data) {
  const url = `${api}/sicc_back/goods/getAllGoods`
  return axios.post(url, {
    endTime: data.endTime,
    isCommend: data.isCommend,
    isUpper: data.isUpper,
    name: data.name,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    startTime: data.startTime,
    type: data.type
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 上架或者下架商品
export function isUpperGoods(isUpper, goodsId) {
  const url = `${api}/sicc_back/goods/isUpperGoods`
  return axios.get(url, {
    params: {
      isUpper: isUpper,
      goodsId: goodsId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 是否为热推
export function setHotGoods(isCommend, goodsId) {
  const url = `${api}/sicc_back/goods/setHotGoods`
  return axios.get(url, {
    params: {
      isCommend: isCommend,
      goodsId: goodsId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 删除商品
export function deleteGoods(goodsId) {
  const url = `${api}/sicc_back/goods/deleteGoods`
  return axios.get(url, {
    params: {
      goodsId: goodsId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 积分商品列表
export function getAllPointGoods(data) {
  const url = `${api}/sicc_back/pointGoods/getAllPointGoods`
  return axios.post(url, {
    endTime: data.endTime,
    id: data.id,
    isUpper: data.isUpper,
    level: data.level,
    name: data.name,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    startTime: data.startTime,
    type: data.type
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 上架下架积分商品
export function isUpperPointGoods(isUpper, goodsId) {
  const url = `${api}/sicc_back/pointGoods/isUpperPointGoods`
  return axios.get(url, {
    params: {
      isUpper: isUpper,
      pointGoodsId: goodsId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 查询所有订单
export function getAllGoodsOrders(data) {
  const url = `${api}/sicc_back/order/getAllGoodsOrders`
  return axios.post(url, {
    code: data.code,
    endTime: data.endTime,
    goodsId: data.goodsId,
    mobile: data.mobile,
    name: data.name,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    startTime: data.startTime,
    state: data.state
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 查询所有积分订单
export function getAllPointGoodsOrders(data) {
  const url = `${api}/sicc_back/order/getAllPointGoodsOrders`
  return axios.post(url, {
    code: data.code,
    courierNumber: data.courierNumber,
    endTime: data.endTime,
    mobile: data.mobile,
    name: data.name,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    startTime: data.startTime,
    state: data.state
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 填写快递单号
export function insertCourierNumber(courierNumber, orderId) {
  const url = `${api}/sicc_back/order/insertCourierNumber`
  return axios.get(url, {
    params: {
      courierNumber: courierNumber,
      orderId: orderId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 新增一隅一食图片/sicc_back/index/setCornerMealBanner
export function setCornerMealBanner(data) {
  return axios({
    url: `${api}/sicc_back/index/setCornerMealBanner`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 获取吧
export function getAllBars(data) {
  const url = `${api}/sicc_back/bar/getAllBars`
  return axios.post(url, {
    endTime: data.endTime,
    isUpper: data.isUpper,
    name: data.name,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    startTime: data.startTime
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 上架下架吧
export function isUpperBar(barId, isUpper) {
  const url = `${api}/sicc_back/bar/isUpperBar`
  return axios.get(url, {
    params: {
      barId: barId,
      isUpper: isUpper
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 根据ID查询吧
export function getBarById(barId) {
  const url = `${api}/sicc_back/bar/getBarById`
  return axios.get(url, {
    params: {
      barId: barId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 新增吧
export function addBar(data) {
  return axios({
    url: `${api}/sicc_back/bar/addBar`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 修改吧
export function editBar(data) {
  return axios({
    url: `${api}/sicc_back/bar/editBar`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 删除吧
export function deleteBar(barId) {
  const url = `${api}/sicc_back/bar/deleteBar`
  return axios.get(url, {
    params: {
      barId: barId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取所有吧商品
export function getAllBarsGoods(data) {
  const url = `${api}/sicc_back/barGoods/getAllBarsGoods`
  return axios.post(url, {
    endTime: data.endTime,
    isUpper: data.isUpper,
    name: data.name,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    startTime: data.startTime,
    barId: data.barId
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 吧商品上架下架
export function isUpperBarGoods(barGoodsId, isUpper) {
  const url = `${api}/sicc_back/barGoods/isUpperBarGoods`
  return axios.get(url, {
    params: {
      barGoodsId: barGoodsId,
      isUpper: isUpper
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 新增吧商品
export function addBarGoods(data) {
  return axios({
    url: `${api}/sicc_back/barGoods/addBarGoods`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 修改吧商品
export function editBarGoods(data) {
  return axios({
    url: `${api}/sicc_back/barGoods/editBarGoods`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 根据ID 查询商品
export function getBarGoodsById(barGoodsId) {
  const url = `${api}/sicc_back/barGoods/getBarGoodsById`
  return axios.get(url, {
    params: {
      barGoodsId: barGoodsId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 删除吧商品
// /sicc_back/barGoods/deleteBarGoods
export function deleteBarGoods(barGoodsId) {
  const url = `${api}/sicc_back/barGoods/deleteBarGoods`
  return axios.get(url, {
    params: {
      barGoodsId: barGoodsId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 查询顶部热推
export function getCornerMealListBanner() {
  const url = `${api}/sicc_back/index/getCornerMealListBanner`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 修改
export function setCornerMealListBanner(data) {
  return axios({
    url: `${api}/sicc_back/index/setCornerMealListBanner`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 新增商品
export function addGoods(data) {
  return axios({
    url: `${api}/sicc_back/goods/addGoods`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 删除接口
export function deleteGood(goodsId) {
  const url = `${api}/sicc_back/goods/deleteGoods`
  return axios.get(url, {
    params: {
      goodsId: goodsId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 查询接口
export function getGoodsById(goodsId) {
  const url = `${api}/sicc_back/goods/getGoodsById`
  return axios.get(url, {
    params: {
      goodsId: goodsId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 删除图片接口
export function deleteGoodPic(picId) {
  const url = `${api}/sicc_back/goods/deleteGoodsPic`
  return axios.get(url, {
    params: {
      picId: picId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 修改商品
export function editGoods(data) {
  return axios({
    url: `${api}/sicc_back/goods/editGoods`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 添加积分商品
export function addPointGoods(data) {
  return axios({
    url: `${api}/sicc_back/pointGoods/addPointGoods`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
// 删除积分商城
export function deletePointGoods(pointGoodsId) {
  const url = `${api}/sicc_back/pointGoods/deletePointGoods`
  return axios.get(url, {
    params: {
      pointGoodsId: pointGoodsId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 查询积分商品
export function getPointGoodsById(pointGoodsId) {
  const url = `${api}/sicc_back/pointGoods/getPointGoodsById`
  return axios.get(url, {
    params: {
      pointGoodsId: pointGoodsId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 修改积分商品
export function editPointGoods(data) {
  return axios({
    url: `${api}/sicc_back/pointGoods/editPointGoods`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 导出商品订单
export function exportGoodsOrderExcel(data) {
  const url = `${api}/sicc_back/order/exportGoodsOrderExcel`
  return axios.post(url, {
    userId: data.userId,
    nickname: data.nickname,
    sex: data.sex,
    mobile: data.mobile,
    level: data.level,
    startTime: data.startTime,
    endTime: data.endTime,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 导出积分商品订单
export function exportPointGoodsOrderExcel(data) {
  const url = `${api}/sicc_back/order/exportPointGoodsOrderExcel`
  return axios.post(url, {
    userId: data.userId,
    nickname: data.nickname,
    sex: data.sex,
    mobile: data.mobile,
    level: data.level,
    startTime: data.startTime,
    endTime: data.endTime,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
