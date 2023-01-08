import axios from 'axios'

// 进行一些全局配置
axios.defaults.baseURL = 'http://192.168.31.239:8081'
axios.defaults.timeout = 3000;
axios.defaults.withCredentials = false;

//添加拦截器
axios.interceptors.request.use(function (config) {
  config.headers.token = localStorage.getItem('token');

  return config
}, function (error) {
  return Promise.reject(error)
})
//响应拦截器
axios.interceptors.response.use(function (response) {
  //对响应数据做什么
  return response
}, function (error) {
  return Promise.reject(error)
})

// 封装get/post方法
export default {
  get: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(path, {
        params: data
      })
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  post: function (path = '', data = {},contentType) {
    if(contentType === 'json'){
      data = JSON.stringify(data)
    }
    let config = contentType === 'json' ? { headers: { "Content-Type": 'application/json; charset=utf-8' } } :
      contentType === 'form' ? { headers: { "Content-Type": 'multipart/form-data','Access-Control-Allow-Origin':'*' } } : {}
    return new Promise(function (resolve, reject) {
      axios.post(path, data,config)
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  all: function (list) {
    return new Promise(function (resolve, reject) {
      axios.all(list)
        .then(axios.spread(function (...result) {
          //两个请求都执行完成
          resolve(result)
        }))
        .catch(function (error) {
          reject(error)
        })
    })
  }
}
