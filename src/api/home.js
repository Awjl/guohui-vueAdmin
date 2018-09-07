import { api } from './config'
import axios from 'axios'

export function getAllTopBanner(pn, pg) {
  const url = `${api}/sicc_back/index/getAllTopBanner`
  return axios.get(url, {
    params: {
      pageNum: pn,
      pageSize: pg
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 底部banner
export function getAllBottomBanner(pn, pg) {
  const url = `${api}/sicc_back/index/getAllBottomBanner`
  return axios.get(url, {
    params: {
      pageNum: pn,
      pageSize: pg
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
