import axios from "axios";

import Qs from "qs";

const instance = axios.create({
  baseURL: "/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    Authorization: String(localStorage.getItem("token")),
  },
});

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
    //注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
    // const token = sessionStorage.getItem("Admin-Token"); //这里取token之前，需要先拿到token,存一下
    // if (token) {
    //   // config.params = { 'token': token } //如果要求携带在参数中
    //   // config.headers.Authorization = '5fb94a47-0904-4368-819f-0d0c7f534a6a'; //如果要求携带在请求头中
    //   config.headers.Authorization = token; //如果要求携带在请求头中
    // }
    // config.headers.username = getUsername(); //如果要求携带在请求头中
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 对响应数据做什么
    return Promise.resolve(res.data);
  },
  (error) => {
    // 对错误响应做什么
    return Promise.reject(error);
  }
);

export default instance;
