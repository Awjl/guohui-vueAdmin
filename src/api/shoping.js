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
// /sicc_back/goods/deleteGoods
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
