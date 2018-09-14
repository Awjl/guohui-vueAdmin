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
