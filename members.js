$(document).ready(function () {
    var error = '';
    var username;
    var password;
    var confirm;
    var nickname;
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
    $("#s_login").click(function (event) {
        event.preventDefault();
        username = $("#username_login");
        password = $("#password_login");
        if (error == '') {
            $.ajax({
                type: 'POST',
                url: 'search.php',
                data: {
                    item: 'user',
                    username: username.val(),
                    password: password.val()
                }
            }).done(function (data) {
                if (data == '成功') {
                    location.href = 'dashboard.html';
                } else if (data == '失敗') {
                    error = '帳號或密碼有誤，請稍後再試';
                }
            }).fail(function () {
                error = '無法登入，請稍後再試';
            });
        }
    })
    $("#s_register").click(function (event) {
        event.preventDefault();
        username = $("#username_register");
        nickname = $("#nickname");
        password = $("#password_register");
        confirm = $("#confirm_register");
        if (password.val() !== confirm.val()) {
            error = '密碼不相符';
        }
        if (error == '') {
            $.ajax({
                url: 'create.php',
                type: 'POST',
                data: {
                    item: 'user',
                    username: username.val(),
                    nickname: nickname.val(),
                    password: password.val()
                }
            }).done(function (data) {
                if (data === '成功') {
                    location.href = 'dashboard.html';
                } else if (data === '失敗') {
                    error = '註冊失敗，請稍後再試';
                };
            }).fail(function () {
                error = '無法註冊，請稍後再試'
            });
        }
    });
    $("#reset").click(function (event) {
        event.preventDefault();
        username = $("#username_reset");
        password = $("#password_reset");
        confirm = $("#confirm_reset");
        if (password.val() !== confirm.val()) {
            error = '密碼不相符';
        }
        if (error == '') {
            $.ajax({
                url: 'update.php',
                type: 'POST',
                data: {
                    item: 'user',
                    username: username.val(),
                    password: password.val()
                }
            }).done(function (data) {
                if (data == '成功') {
                    location.href = 'dashboard.html';
                } else if (data == '失敗') {
                    error = '變更密碼失敗，請稍後再試';
                };
            }).fail(function () {
                error = '無法變更密碼，請稍後再試'
            });
        }
    });
    $("#error").text(error);
});