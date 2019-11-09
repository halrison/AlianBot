$(function () {
    var error = '';
    $("table").ready(function () {
        $.ajax({
            url: 'search.php',
            type: 'POST',
            data: {
                item: 'request'
            }
        }).done(function (result) {
            var table = JSON.parse(result);
            for (var i = 1; i <= table.length; i++) {
                $("tbody").wrapInner('<tr><td></td><td></td><td></td><td><button type="button" name="play" value="播放"></td><td><button type="button" name="delete" value="刪除"></td></tr>');
                $("tr:eq(i)>td:first").text(table[i].id);
                $("tr:eq(i)>td:eq(2)").text(table[i].OrderedBy);
                $("tr:eq(i)>td:eq(3)").text(table[i].RequestTo);
                $("tr:eq(i)>td:eq(4)").text(table[i].PlayStatus);
                $("button[name='play']")[i].click(function () {
                    $.ajax({
                        url: 'update.php',
                        type: 'POST',
                        data: {
                            item: 'request',
                            id: $("tr:eq(i)>td:first").text()
                        }
                    }).done(function (result2) {
                        var row = JSON.parse(result2);
                        $("tr:eq(i)>td:eq(4)").empty().text(table[i].PlayStatus);
                    }).fail(error = '播放失敗，請稍後再試');
                });
                $("button[name='delete']")[i].click(function () {
                    $.ajax({
                            url: 'delete.php',
                            type: 'POST',
                            data: {
                                item: 'request',
                                id: $("tr:eq(i)>td:first").text()
                            }
                        }).done($("tr:eq(i)").remove())
                        .fail(error = '刪除歌曲失敗，請稍後再試');
                })
            }
        })
    })
    $("#error").text(error);
})