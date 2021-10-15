import Taro from "@tarojs/taro";
/**
 * @description 获取当前页url
 */
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  let url = currentPage.route
  return url
}

export const pageToLogin = () => {
  let path = getCurrentPageUrl()
  if (!path.includes('login')) {
    Taro.navigateTo({
      url: "/pages/login/index"
    });
  }
}

/** 对象转url参数 */
export const stringify = (params) => {
  const obj = typeof params === 'object' && params !== null ? params : {};
  const isEmpty = (v) => v === '' || v === null || v === undefined;
  return Object.keys(obj).filter(k => !isEmpty(obj[k])).map(key => `${key}=${encodeURIComponent(obj[key])}`).join('&');
}
