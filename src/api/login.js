import { api } from './config'
import axios from 'axios'

export function login(data) {
  const url = `${api}/admin/login`
  return axios.post(url,
    {
      name: data.name,
      password: data.password
    }).then((res) => {
      return Promise.resolve(res.data)
    })
}

// 查看首页数据/index/getIndexInfo
export function getIndexInfo() {
  const url = `${api}/index/getIndexInfo`
  return axios.get(url,{
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
