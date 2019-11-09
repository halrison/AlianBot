$(function () {
    var i = 0
    $('#twitch_toggle').change(function () {
        if ($(this).is(':checked')) {
            $('#twitch_status').text('啟用-未連線');
            $('#twitch_status').after("<button id='twitch_connect' formnovalidate>連線</button>");
        } else {
            $('#twitch_status').text('停用');
            $(this).parents('td').find('button').remove();
        }
    })
    $('#youtube_toggle').change(function () {
        if ($(this).is(':checked')) {
            $('#youtube_status').text('啟用-未連線');
            $('#youtube_status').after("<button id='youtube_connect' formnovalidate>連線</button>");
        } else {
            $('#youtube_status').text('停用');
            $(this).parents('td').find('button').remove();
        }
    })
    $(document).on('click', '#twitch_connect', function (event) {
        event.preventDefault();
        i++;
        if (i % 2 == 0) {
            $(this).text('連線');
            $('#twitch_status').text('啟用-未連線');
        } else {
            $(this).text('斷線');
            $('#twitch_status').text('啟用-已連線()');
        }
        return false;
    })
    $(document).on('click', '#youtube_connect', function (event) {
        event.preventDefault();
        i++;
        if (i % 2 == 0) {
            $(this).text('連線');
            $('#youtube_status').text('啟用-未連線');
        } else {
            $(this).text('斷線');
            $('#youtube_status').text('啟用-已連線()');
        }
        return false;
    })
    $('form').submit(function (event) {
        event.preventDefault();
        if ($("input[name='confirm']").val() == $("input[name='password']").val()) {
            $.ajax({
                url: 'update.php',
                method: 'POST',
                data: {
                    item: 'user',
                    nickname: $("input[name='nickname']").val(),
                    username: $("input[name='username']").val(),
                    password: $("input[name='password']").val()
                }
            }).fail(function () {
                $('#error').text('變更設定失敗，請稍後再試');
            })
        } else {
            $('#error').text('密碼不符，請重新輸入');
        }
    })
})