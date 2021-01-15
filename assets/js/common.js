//项目通用 配置

// 全局变量 baseUrl，以便后续多次使用
let baseUrl = 'http://www.itcbc.com:8080';

$.ajaxPrefilter(function (option) {
    // option 就是ajax选项；我们可以修改它，也可以增加一些选项
    // 1. 统一配置url
    option.url = baseUrl + option.url;

    // 2. 统一配置请求头
    option.headers = {
        Authorization: localStorage.getItem('token')
    };
    
    // 3. 请求完成后，如果接口返回“身份认证失败”，则需要跳转到登录页面
    option.complete = function (xhr) {
        var res = xhr.responseJSON;
        if (res && res.status === 1 && res.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href = './login.html';
        }
    }
});
