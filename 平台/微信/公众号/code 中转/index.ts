type QueryParams = Record<string, string | null>;

const params = [
  "appid",
  // 重定向链接地址
  "redirect_uri",
  // 返回值类型
  "response_type",
  // scope:
  // snsapi_base: 不弹出授权页面，直接跳转，只能获取用户 openid
  // snsapi_userinfo: 不弹出授权页面，直接跳转，只能获取用户 openid
  "scope",
  // 重定向后携带的参数
  "state",
  // 是否强制使用弹窗
  "forcePopup",
];

// 测试地址：
// http://localhost:3011/jump?appid=xxx&response_type=code&scope=snsapi_base&state=&forcePopup=false&redirect_uri=from&jump=to#wechat_redirect

function forwardWx(query: QueryParams, hash: string) {
  if (query.jump) {
    const url = new URL(query.jump || "");
    const to_redirect = location.origin + location.pathname;

    params.forEach((key) => {
      let value = query[key] || "";

      if (value) {
        if (key === "redirect_uri") {
          value = to_redirect;
          localStorage.setItem("from", value);
        }

        url.searchParams.set(key, value);
      }
    });

    url.hash = hash;
    location.href = url.href;
  }

  if (query.code) {
    const from = localStorage.getItem("from") || "";

    const url = new URL(from);
    url.searchParams.set("code", query.code || "");
    location.href = url.href;
  }
}
