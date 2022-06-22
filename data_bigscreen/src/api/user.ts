import instance from "./http";

export function login(data: any) {
  return instance({
    url: "/user/login",
    method: "post",
    data,
  });
}

export function register(data: any) {
  return instance({
    url: "/user/register",
    method: "post",
    data,
  });
}

// 获取用户信息
export function getInfo() {
  return instance({
    url: "/user/profile",
    method: "get",
  });
}
