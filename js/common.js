// 页面加载完成后执行
window.onload = function() {
    // 显示当前日期（所有页面头部）
    displayCurrentDate();
    // 登录表单校验
    if (document.getElementById('loginForm')) {
        initLoginForm();
    }
    // 注册表单校验
    if (document.getElementById('registerForm')) {
        initRegisterForm();
    }
};

// 显示当前日期
function displayCurrentDate() {
    const dateElements = document.getElementsByClassName('date');
    const now = new Date();
    const dateStr = now.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
    for (let elem of dateElements) {
        elem.textContent = dateStr;
    }
}

// 登录表单校验
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    loginForm.onsubmit = function(e) {
        e.preventDefault(); // 阻止默认提交
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // 校验规则：用户名最长10字符，密码最长6位数字
        const usernameRegex = /^.{1,10}$/;
        const passwordRegex = /^\d{1,6}$/;

        // 校验用户名
        if (!usernameRegex.test(username)) {
            alert('用户名长度不能超过10个字符！');
            return false;
        }
        // 校验密码
        if (!passwordRegex.test(password)) {
            alert('密码必须是1-6位数字！');
            return false;
        }
        // 验证默认账号密码
        if (username === 'html5kc' && password === '123456') {
            alert('登录成功！');
            window.location.href = 'home.html'; // 跳转到主页
        } else {
            alert('用户名或密码错误！正确账号：html5kc，密码：123456');
            return false;
        }
    };
}

// 注册表单校验（HTML5原生校验 + 自定义校验）
function initRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    const pwd = document.getElementById('pwd');
    const repwd = document.getElementById('repwd');
    const email = document.getElementById('email');

    // 确认密码校验
    repwd.onblur = function() {
        if (this.value !== pwd.value) {
            this.setCustomValidity('两次输入的密码不一致！');
        } else {
            this.setCustomValidity('');
        }
    };

    // 邮箱格式自定义校验（增强HTML5校验）
    email.onblur = function() {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(this.value)) {
            this.setCustomValidity('请输入有效的邮箱地址！');
        } else {
            this.setCustomValidity('');
        }
    };

    // 表单提交最终校验
    registerForm.onsubmit = function(e) {
        if (!this.checkValidity()) {
            e.preventDefault();
            alert('表单填写有误，请检查！');
            return false;
        }
        alert('注册成功！');
        this.reset();
        return false;
    };
}