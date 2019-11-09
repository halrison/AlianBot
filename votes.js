$(document).ready(function () {
    var i = 1,
        options = new Array();
    $('input[name="add"]').click(function () {
        $('#AddModify').append('<tr><td></td><td><input name="option" type="text" ></td><td><input class="button1" name="confirm" type="button" value="確定"></td><td><input class="button2" name="cancel" type="button" value="取消"></td></tr>');
    })
    $(document).on('click', '.button1', function () {
        i++
        if (i % 2 == 0) {
            $(this).attr({
                name: 'edit',
                value: '編輯'
            });
            $(this).parent().next().children().attr({
                name: 'delete',
                value: '刪除'
            });
            $(this).parent().prev().children().attr('readonly', true);
            $(this).parent().prev().children().css('border', 'none');
        } else {
            $(this).attr({
                name: 'confirm',
                value: '確定'
            });
            $(this).parent().next().children().attr({
                name: 'cancel',
                value: '取消'
            });
            $(this).parent().prev().children().removeAttr('readonly');
            $(this).parent().prev().children().css('border', '1px solid');
        }
    })
    $(document).on('click', '.button2', function () {
        i++
        if (i % 2 == 0) {
            if ($('table>tbody').children().length <= 2) {
                $('#error').text("至少需要兩個選項");
            } else {
                $(this).parent().parent().remove();
            }
        } else {
            $(this).attr({
                name: 'delete',
                value: '刪除'
            });
            $(this).parent().prev().children().attr({
                name: 'edit',
                value: '編輯'
            });
            $(this).parent().prev().prev().children().removeAttr('readonly');
            $(this).parent().prev().prev().children().css('border', '1px solid');
        }
    })
    $('input[name="complete"]').click(function () {
        $('input[name="option"]').each(function () {
            options.push($(this).val())
        })
        $.ajax({
            url: 'create.php',
            type: 'POST',
            data: {
                item: 'vote',
                topic: $('input[name="topic"]').val(),
                options: options
            }
        }).done(function (response) {
            if (response == '新增成功') {
                $('#list').append('<tr><td>', $('input[name="topic"]').val(), '</td><td>', options.length, '</td><td><button name="start">開始</button></td><td><button name="end">結束</button></td></tr>');
                $('form').hide();
            } else {
                $('#error').text('新增失敗，請稍後再試')
            }
        }).fail(function () {
            $('#error').text('無法新增，請稍後再試')
        })
    })

})