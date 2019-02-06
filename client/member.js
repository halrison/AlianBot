$(document).ready(function () {
    var error = '';
    var username = $("input[name='username']");
    var password = $("input[name='password']");
    var confirm = $("input[name='confirm']");
    var nickname = $("input[name='nickname']");
    $("#a_login").click(function () {
        $("#f_login").show();
        $("#f_register").hide();
        $("#f_reset").hide();
    })
    $("#a_register").click(function () {
        $("#f_login").hide();
        $("#f_register").show();
        $("#f_reset").hide();
    })
    $("#a_reset").click(function () {
        $("#f_login").hide();
        $("#f_register").hide();
        $("#f_reset").show();
    })
    $("#s_login").click(function () {
        if (username.val()=='') {
            error = '使用者名稱是必填欄位';
        }
        if (password.val()=='') {
            error &= '\n密碼是必填欄位';
        }
        if (error == '') {
            $.ajax({
                type: 'POST',
                url: 'search.php',
                data: {
                    item: 'user',
                    username: username.val(),
                    password: password.val()
                }
            }).done(function (response) {
                if (response == '成功') {
                    location.href = 'dashboard.html';
                } else if (response == '失敗') {
                    error='帳號或密碼有誤，請稍後再試';
                }
            }).fail(function () {
                error='無法登入，請稍後再試';
            });
        }        
    })
    $("#s_register").click(function () {
        if (username.val()=='') {
            error = '使用者名稱是必填欄位';
        }
        if (password.val()=='') {
            error &= '\n密碼是必填欄位';
        }
        if (password.val() !== confirm.val()) {
            error &= '\n密碼不相符';
        }
        if (error == '') {
            $.ajax({
                url: 'create.php',
                type:'POST',
                data: {
                    item: 'user',
                    username: username.val(),
                    nickname: nickname.val(),
                    password: password.val()
                }
            }).done(function (response) {
                if (response==='成功') {
                    location.href = 'dashboard.html';
                }else if(response==='失敗') {
                    error='註冊失敗，請稍後再試';
                };
            }).fail(error = '無法註冊，請稍後再試');
        }
    });
    $("#reset").click(function () {
        if (username.val()=='') {
            error = '使用者名稱是必填欄位';
        }
        if (password.val()=='') {
            error &= '\n密碼是必填欄位';
        }
        if (password.val() !== confirm.val()) {
            error &= '\n密碼不相符';
        }
        if (error == '') {
            $.ajax({
                url: 'update.php',
                type:'POST',
                data: {
                    item: 'user',
                    username: username.val(),
                    password: password.val()
                }
            }).done(function (response) {
                if (response=='成功') {
                    location.href = 'dashboard.html';
                }else if(response=='失敗') {
                    error='變更密碼失敗，請稍後再試';
                };
            }).fail(error='無法變更密碼，請稍後再試');
        }
    });
    $("#error").text(error);
});