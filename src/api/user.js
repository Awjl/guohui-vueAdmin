import { api } from './config'
import axios from 'axios'

export function getAllUser(data) {
  const url = `${api}/user/getAllUser`
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
  },
  {
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 会议预定管理

export function getAllBook(data) {
  const url = `${api}/book/getAllBook`
  return axios.post(url, {
    endTime: data.endTime,
    mobile: data.mobile,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
    startTime: data.startTime,
    name: data.name,
    isConnected: data.isConnected,
    email: data.email
  },
  {
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 联系接口
export function isConnected(id) {
  const url = `${api}/book/isConnected`
  return axios.get(url, {
    params: {
      id: id
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 添加反馈
export function addFeedback(data) {
  const url = `${api}/book/addFeedback`
  return axios.post(url, {
    feedBack: data.feedBack,
    id: data.id
  },
  {
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 问题查询
export function getAllHotQuestion(data) {
  const url = `${api}/service/getAllHotQuestion`
  return axios.get(url, {
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 上架下架问题
export function isUpperHotQuestion(questionId, isUpper) {
  const url = `${api}/service/isUpperHotQuestion`
  return axios.get(url, {
    params: {
      questionId: questionId,
      isUpper: isUpper
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 新增
export function addHotQuestion(data) {
  const url = `${api}/service/addHotQuestion`
  return axios.post(url, {
    answer: data.answer,
    question: data.question
  },
  {
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
//  修改
export function getHotQuestionById(questionId) {
  const url = `${api}/service/getHotQuestionById`
  return axios.get(url, {
    params: {
      questionId: questionId
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

//  修改问题
export function editHotQuestionById(data) {
  const url = `${api}/service/editHotQuestionById`
  return axios.post(url, {
    answer: data.answer,
    question: data.question,
    id: data.id
  },
  {
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 删除问题
export function deleteHotQuestionById(questionId) {
  const url = `${api}/service/deleteHotQuestionById`
  return axios.get(url, {
    params: {
      questionId: questionId
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 获取热线
export function getPhone() {
  const url = `${api}/service/getPhone`
  return axios.get(url, {
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 修改
export function updatePhone(phone) {
  const url = `${api}/service/updatePhone`
  return axios.get(url, {
    params: {
      phone: phone
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 查询全部管理员
export function getAdmins(data) {
  const url = `${api}/admin/getAdmins`
  return axios.post(url, {
    endTime: data.endTime,
    name: data.name,
    roleName: data.roleName,
    startTime: data.startTime,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  },
  {
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 查询全部角色
export function getRoles(num, size) {
  const url = `${api}/role/getRoles`
  return axios.get(url, {
    params: {
      pageNum: num,
      pageSize: size
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 新增管理员
export function addAdmin(data) {
  console.log(data)
  const url = `${api}/admin/addAdmin`
  return axios.post(url, {
    id: data.id,
    name: data.name,
    password: data.password,
    roleId: data.roleId,
    nickname: data.nickname
  },
  {
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 查询管理员
export function getAdminById(adminId) {
  const url = `${api}/admin/getAdminById`
  return axios.get(url, {
    params: {
      adminId: adminId
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 修改管理员
export function editAdmin(data) {
  const url = `${api}/admin/editAdmin`
  return axios.post(url, {
    id: data.id,
    roleId: data.roleId,
    nickname: data.nickname
  },
  {
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 删除管理员
export function deleteAdminById(adminId) {
  const url = `${api}/admin/deleteAdminById`
  return axios.get(url, {
    params: {
      adminId: adminId
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 导出用户
export function exportUserExcel(data) {
  const url = `${api}/user/exportUserExcel`
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
  },
  {
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 删除/user/deleteExcel
export function deleteExcel(path) {
  const url = `${api}/user/deleteExcel`
  return axios.get(url, {
    params: {
      path: path
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 新增角色/role/addRole
export function addRole(data) {
  const url = `${api}/role/addRole`
  return axios.post(url, {
    name: data.name,
    homeData: data.homeData,
    userData: data.userData,
    shoppingData: data.shoppingData,
    integralData: data.integralData,
    orderData: data.orderData,
    discountData: data.discountData,
    serverData: data.serverData,
    adminData: data.adminData,
    systemData: data.systemData,
    parkData: data.parkData,
    note: data.note
  },
  {
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 查询角色信息
export function getRoleById(roleId) {
  const url = `${api}/role/getRoleById`
  return axios.get(url, {
    params: {
      roleId: roleId
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 删除角色信息
export function deleteRole(roleId) {
  const url = `${api}/role/deleteRole`
  return axios.get(url, {
    params: {
      roleId: roleId
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 修改角色信息
export function editRole(data) {
  const url = `${api}/role/editRole`
  return axios.post(url, {
    name: data.name,
    homeData: data.homeData,
    userData: data.userData,
    shoppingData: data.shoppingData,
    integralData: data.integralData,
    orderData: data.orderData,
    discountData: data.discountData,
    serverData: data.serverData,
    adminData: data.adminData,
    systemData: data.systemData,
    parkData: data.parkData,
    note: data.note,
    id: data.id
  },
  {
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 查询停车列表
export function getParkInfo(data) {
  const url = `${api}/park/getParkInfo`
  return axios.post(url, {
    vplNumber: data.vplNumber,
    billId: data.billId,
    mobile: data.mobile,
    state: data.state,
    startTime: data.startTime,
    endTime: data.endTime,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  },
  {
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 生成exle
export function exportParkInfoExcel(data) {
  const url = `${api}/park/exportParkInfoExcel`
  return axios.post(url, {
    vplNumber: data.vplNumber,
    billId: data.billId,
    mobile: data.mobile,
    state: data.state,
    startTime: data.startTime,
    endTime: data.endTime,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  },
  {
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

// 查看全部系统日志
export function gerAllLog(data) {
  const url = `${api}/log/getAllLog`
  return axios.post(url, {
    adminName: data.adminName,
    startTime: data.startTime,
    endTime: data.endTime,
    pageNum: data.pageNum,
    pageSize: data.pageSize
  },
  {
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 删除系统日至
export function deleteLog(date) {
  const url = `${api}/log/deleteLog`
  return axios.get(url, {
    params: {
      date: date
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
// 会员升级
// /user/upgradeLevel
export function upgradeLevel(id) {
  const url = `${api}/user/upgradeLevel`
  return axios.get(url, {
    params: {
      id: id
    },
    headers: {
      "session-token": window.sessionStorage.getItem('sessionToken')
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
