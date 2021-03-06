import { api } from './config'
import axios from 'axios'
// 顶部banner
export function getAllTopBanner(pn, pg) {
  const url = `${api}/index/getAllTopBanner`
  return axios.get(url, {
    params: {
      pageNum: pn,
      pageSize: pg
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 底部banner
export function getAllBottomBanner(pn, pg) {
  const url = `${api}/index/getAllBottomBanner`
  return axios.get(url, {
    params: {
      pageNum: pn,
      pageSize: pg
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 添加banner
export function uploadIndexPicture(data) {
  return axios({
    url: `${api}/index/uploadIndexPicture`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  })
}

// 删除
export function deleteBanner(bannerId) {
  const url = `${api}/index/deleteBanner`
  return axios.get(url, {
    params: {
      bannerId: bannerId
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 上架下架banner
export function isUpperBanner(isUpper, bannerId) {
  const url = `${api}/index/isUpperBanner`
  return axios.get(url, {
    params: {
      isUpper: isUpper,
      bannerId: bannerId
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 获取详情
export function getIntroduces() {
  const url = `${api}/index/getIntroduces`
  return axios.get(url,{
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 提交文章
export function editIntroduce(data) {
  return axios({
    url: `${api}/index/editIntroduce`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  })
}

// 获取一隅一食列表
export function getCornerMealBanner(data) {
  const url = `${api}/index/getCornerMealBanner`
  return axios.post(url,
    {
      title: data.title,
      type: data.type,
      endTime: data.endTime,
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      startTime: data.startTime
    },
    {
      headers: {
        "session-token": window.sessionStorage.getItem('sessionToken')
      }
    }).then((res) => {
      return Promise.resolve(res.data)
    })
}

// 查询一隅一食
export function getCornerMealBannerById(id) {
  const url = `${api}/index/getCornerMealBannerById`
  return axios.get(url, {
    params: {
      bannerId: id
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 保存一隅一食
export function editCornerMealBannerById(data) {
  return axios({
    url: `${api}/index/editCornerMealBannerById`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data',
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  })
}
