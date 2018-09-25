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

// 会议预定管理

export function getAllBook(data) {
  const url = `${api}/sicc_back/book/getAllBook`
  return axios.post(url, {
    endTime: data.endTime,
    mobile: data.mobile,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    startTime: data.startTime,
    name: data.name,
    isConnected: data.isConnected
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 联系接口
export function isConnected(id) {
  const url = `${api}/sicc_back/book/isConnected`
  return axios.get(url, {
    params: {
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 添加反馈
export function addFeedback(data) {
  const url = `${api}/sicc_back/book/addFeedback`
  return axios.post(url, {
    feedBack: data.feedBack,
    id: data.id
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 问题查询
export function getAllHotQuestion(data) {
  const url = `${api}/sicc_back/service/getAllHotQuestion`
  return axios.get(url, {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 上架下架问题
export function isUpperHotQuestion(questionId, isUpper) {
  const url = `${api}/sicc_back/service/isUpperHotQuestion`
  return axios.get(url, {
    params: {
      questionId: questionId,
      isUpper: isUpper
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 新增
export function addHotQuestion(data) {
  const url = `${api}/sicc_back/service/addHotQuestion`
  return axios.post(url, {
    answer: data.answer,
    question: data.question
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//  修改
export function getHotQuestionById(questionId) {
  const url = `${api}/sicc_back/service/getHotQuestionById`
  return axios.get(url, {
    params: {
      questionId: questionId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

//  修改问题
export function editHotQuestionById(data) {
  const url = `${api}/sicc_back/service/editHotQuestionById`
  return axios.post(url, {
    answer: data.answer,
    question: data.question,
    id: data.id
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 删除问题
export function deleteHotQuestionById(questionId) {
  const url = `${api}/sicc_back/service/deleteHotQuestionById`
  return axios.get(url, {
    params: {
      questionId: questionId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取热线
export function getPhone() {
  const url = `${api}/sicc/service/getPhone`
  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 修改
export function updatePhone(phone) {
  const url = `${api}/sicc_back/service/updatePhone`
  return axios.get(url, {
    params: {
      phone: phone
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 查询全部管理员
export function getAdmins(data) {
  const url = `${api}/sicc_back/admin/getAdmins`
  return axios.post(url, {
    endTime: data.endTime,
    name: data.name,
    roleName: data.roleName,
    startTime: data.startTime,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 查询全部角色
export function getRoles() {
  const url = `${api}/sicc_back/role/getRoles`
  return axios.get(url, {
    params: {
      pageNum: 1,
      pageSize: 100
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 新增管理员
export function addAdmin(data) {
  const url = `${api}/sicc_back/admin/addAdmin`
  return axios.post(url, {
    name: data.name,
    password: data.password,
    roleId: data.roleId
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 查询管理员
export function getAdminById(adminId) {
  const url = `${api}/sicc_back/admin/getAdminById`
  return axios.get(url, {
    params: {
      adminId: adminId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 修改管理员
export function editAdmin(data) {
  const url = `${api}/sicc_back/admin/editAdmin`
  return axios.post(url, {
    id: data.id,
    name: data.name,
    roleId: data.roleId
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 删除管理员
export function deleteAdminById(adminId) {
  const url = `${api}/sicc_back/admin/deleteAdminById`
  return axios.get(url, {
    params: {
      adminId: adminId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 导出用户
export function exportUserExcel(data) {
  const url = `${api}/sicc_back/user/exportUserExcel`
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
