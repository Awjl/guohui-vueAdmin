import { api } from './config'
import axios from 'axios'

export function getAllUser(data) {
  const url = `${api}/sicc_back/user/getAllUser`
  return axios.post(url, {
    endTime: data.endTime,
    level: data.level,
    mobile: data.mobile,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    sex: data.sex,
    startTime: data.startTime,
    userId: data.userId,
    nickname: data.nickname
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
