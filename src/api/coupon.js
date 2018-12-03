import { api } from './config'
import axios from 'axios'

// 商品列表
export function getAllCoupon(data) {
  const url = `${api}/coupon/getAllCoupon`
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
  const url = `${api}/coupon/isUpperCoupon`
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
  const url = `${api}/coupon/addCoupon`
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
  const url = `${api}/coupon/deleteCouponById`
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
  const url = `${api}/coupon/getCouponById`
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
  const url = `${api}/coupon/editCouponById`
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
  const url = `${api}/coupon/sendCoupon`
  return axios.post(url, {
    id: data.id,
    mobile: data.mobile,
    number: data.number
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 核销优惠券
export function useCoupon(couponCode) {
  const url = `${api}/coupon/useCoupon`
  return axios.get(url, {
    params: {
      couponCode: couponCode
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 查找优惠券
export function getQRCode(couponId) {
  const url = `${api}/coupon/getQRCode`
  return axios.get(url, {
    params: {
      couponId: couponId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 添加库存
export function sendCouponQRCode(data) {
  const url = `${api}/coupon/sendCouponQRCode`
  return axios.post(url, {
    couponId: data.couponId,
    total: data.total
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
