//-------------------- 切换两个盒子 --------------------
$('.login a').click(function () {
    $('.register').show().prev().hide();
});

$('.register a').click(function () {
    $('.login').show().next().hide();
});



//-------------------- 注册 --------------------
//表单提交 - 阻止默认行为 - 收集表单数据(查询字符串) - 提交ajax请求 
$(".register form").on('submit', function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        url: '/api/reguser',
        type: 'POST',
        data: data,
        // 提示
        success: function (res) {
            layer.msg(res.message);
            if (res.status === 0) {
                $(".register form")[0].reset(); 
                //切换到登录盒子
                $('.login').show().next().hide();
            }
        }
        
    })
})


//-------------------- 自定义表单验证  使用layui的form模块 --------------------
//只要使用layui模块,必须先加载
var form = layui.form;
//调用 form 模块的内置方法verify,自定义验证规则
form.verify({
    //键(验证规则) : 值(验证方法)
    //[/正则表达式/,'验证不通过的提示']
    user: [/^[a-zA-Z0-9]{2,10}$/, '用户名只能是数字字母,且2-10位'],
    
    len: [/^\S{6,12}$/, '密码6-12位且不能有空格'],

    same: function (val) {
         //形参,表示使用该验证规则的输入框的值(谁用,val就表示谁的值)
        if (val !== $('.pwd').val) {
            return '两次密码不一致'
        }
    }
});
