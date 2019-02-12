$(function () {
    var error = '';
    var keyword = $("input[name='keyword']");
    var response = $("input[name='response']");
    var table = {};
    var text1 = $("td:nth-child(2)");
    var text2 = $("td:nth-child(3)");
    var button1 = $("td:nth-last-child(2)");
    var button2 = $("td:last");
    $("table").ready(function () {
        $.ajax({
            url: 'search.php',
            type: 'POST',
            data: { item: 'command' }
        }).done(function (result) {
            table = JSON.parse(result);
        });
    });
    for (var i = 2; i <= table.length+1; i++) {
        $("tr:last").append('<tr><td>'+table[i].id+'</td><td>' + table[i].KeyWord + '</td><td>' + table[i].Response + '</td><td><input type="button" name="edit" value="修改"/></td><td><input type="button" name="delete" value="刪除"/></td></tr >');        
        $("input[name='edit']")[i-1].click(function () {
            text1[i].html(keyword).attr('disabled');
            text2[i].html(response);
            text1[i].val() = table[i-1].KeyWord;
            text2[i].val() = table[i-1].Response;
            $(this).attr({
                name: 'send',
                value: '送出'
            });
            button2[i].attr({
                name: 'cancel',
                value: '取消'
            })
        });
        $("input[name='send']")[i-1].click(function () {            
            if (error == '') {
                $.ajax({
                    url: 'update.php',
                    type: 'POST',
                    data: {
                        item: 'command',
                        keyword: text1[i].val(),
                        response: text2[i].val()
                    }
                }).done(function (result2) {
                    text1[i].text(result2.KeyWord).removeAttr('disabled');
                    text2[i].text(result2.Response);
                    $(this).attr({
                        name: 'edit',
                        value: '修改'
                    });
                    button2[i].attr({
                        name: 'delete',
                        value: '刪除'
                    });
                }).fail(error = '更改回應失敗，請稍後再試');
            }
        });
        $("input[name='delete']")[i-1].click(function () {
            $.ajax({
                url: 'delete.php',
                type: 'POST',
                data: {
                    item: 'command',
                    keyword: text1[i].val(),
                    response: text2[i].val()
                }
            }).done($("tr")[i].remove());
        });
        $("input[name='cancel']")[i-1].click(function () {
            text1[i].html(table[i - 1].KeyWord).removeAttr('disabled');
            text2[i].html(table[i - 1].Response);
            button1.attr({
                name: 'edit',
                value: '修改'
            });
            $(this).attr({
                name: 'delete',
                value: '刪除'
            });
        });
    }
    $("form").submit(function () {        
        if (error == '') {
            $.ajax({
                url: 'create.php',
                type: 'POST',
                data: {
                    item: 'command',
                    keyword: keyword.val(),
                    response: response.val()
                }
            }).done($("table").ready()
             ).fail(error = '無法新增命令，請稍後再試');
        } else { error = '新增命令失敗，請稍後再試'; }
    });    
    $("#error").text(error);
})
