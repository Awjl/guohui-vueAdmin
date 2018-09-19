import { api } from './config'
import axios from 'axios'

// 商品列表
export function getAllCoupon(data) {
  const url = `${api}/sicc_back/coupon/getAllCoupon`
  return axios.post(url, {
    endTime: data.endTime,
    isNewbee: data.isNewbee,
    isUpper: data.isUpper,
    name: data.name,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    startTime: data.startTime,
    type: data.type,
    saleType: data.saleType
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 上架下架
export function isUpperCoupon(couponId, isUpper) {
  const url = `${api}/sicc_back/coupon/isUpperCoupon`
  return axios.get(url, {
    params: {
      couponId: couponId,
      isUpper: isUpper
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 保存接口
export function addCoupon(data) {
  const url = `${api}/sicc_back/coupon/addCoupon`
  return axios.post(url, {
    endTime: data.endTime,
    isNewbee: data.isNewbee,
    isUpper: data.isUpper,
    limitPrice: data.limitPrice,
    name: data.name,
    price: data.price,
    saleType: data.saleType,
    startTime: data.startTime,
    type: data.type,
    title: data.title,
    discountTime: data.discountTime
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 删除
export function deleteCouponById(couponId) {
  const url = `${api}/sicc_back/coupon/deleteCouponById`
  return axios.get(url, {
    params: {
      couponId: couponId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 根据ID查询
export function getCouponById(couponId) {
  const url = `${api}/sicc_back/coupon/getCouponById`
  return axios.get(url, {
    params: {
      couponId: couponId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 根据ID修改
export function editCouponById(data) {
  const url = `${api}/sicc_back/coupon/editCouponById`
  return axios.post(url, {
    id: data.id,
    endTime: data.endTime,
    isNewbee: data.isNewbee,
    isUpper: data.isUpper,
    limitPrice: data.limitPrice,
    name: data.name,
    price: data.price,
    saleType: data.saleType,
    startTime: data.startTime,
    type: data.type,
    title: data.title,
    discountTime: data.discountTime
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 发布优惠券
export function sendCoupon(data) {
  const url = `${api}/sicc_back/coupon/sendCoupon`
  return axios.post(url, {
    id: data.id,
    mobile: data.mobile,
    number: data.number
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
