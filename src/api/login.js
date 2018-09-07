import { api } from './config'
import axios from 'axios'

export function login(data) {
  const url = `${api}/sicc_back/admin/login`
  return axios.post(url, {
    name: data.name,
    password: data.password
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
