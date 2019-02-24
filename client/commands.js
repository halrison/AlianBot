$(function () {
    var error = '';
    var keyword = $("input[name='keyword']");
    var response = $("input[name='response']");
    var table = {};
    $("table").ready(function () {
        $.ajax({
            url: 'search.php',
            type: 'POST',
            data: { item: 'command' }
        }).done(function (result) {
            table = JSON.parse(result);
        });
    });
    for (var i = 2; i <= table.length; i++) {
        $("tr:last").append('<tr><td>'+table[i].id+'</td><td>' + table[i].KeyWord + '</td><td>' + table[i].Response + '</td><td><input type="button" name="edit" value="�ק�"/></td><td><input type="button" name="delete" value="�R��"/></td></tr >');
        var text1 = $("tr:eq(i)>td:eq(2)");
        var text2 = $("tr:eq(i)>td:eq(3)");
        var button1 = $("tr:eq(i)>td:eq(4)");
        var button2 = $("tr:eq(i)>td:last");
        $("input[name='edit']")[i].click(function () {
            text1.replaceWith(keyword).attr('disabled');
            text2.replaceWith(response);
            text1.val() = table[i].KeyWord;
            text2.val() = table[i].Response;
            $(this).attr('name', 'send');
            $(this).attr('value', '�e�X');
            button2.attr('name', 'cancel');
            button2.attr('value', '����');
        });
        $("input[name='send']")[i].click(function () {
            if (text1.val() == '') {
                error = '����r�O�������';
            }
            if (text2.val() == '') {
                error &= '\n�^���O�������';
            }
            if (error == '') {
                $.ajax({
                    url: 'update.php',
                    type: 'POST',
                    data: {
                        item: 'command',
                        keyword: text1.val(),
                        response: text2.val()
                    }
                }).done(function (result2) {
                    text1.replaceWith(result2.KeyWord).removeAttr('disabled');
                    text2.replaceWith(result2.Response);
                    $(this).attr('name', 'edit');
                    $(this).attr('value', '�ק�');
                    button2.attr('name', 'delete');
                    button2.attr('value', '�R��');
                }).fail(error = '���^�����ѡA�еy��A��');
            }
        });
        $("input[name='delete']")[i].click(function () {
            $.ajax({
                url: 'delete.php',
                type: 'POST',
                data: {
                    item: 'command',
                    keyword: text1.val(),
                    response: text2.val()
                }
            }).done($("tr")[i].remove());
        });
        $("input[name='cancel']")[i].click(function () {
            text1.replaceWith(table[i].KeyWord).removeAttr('disabled');
            text2.replaceWith(table[i].Response);
            button1.attr('name', 'edit');
            button1.attr('value', '�ק�');
            $(this).attr('name', 'delete');
            $(this).attr('value', '�R��');
        });
    }
    $("form").submit(function (event) {
        event.preventDefault();
        if (keyword.val() == '') {
            error = '����r�O�������';
        }
        if (response.val() == '') {
            error &= '\n�^���O�������';
        }
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
             ).fail(error = '�L�k�s�W�R�O�A�еy��A��');
        } else { error = '�s�W�R�O���ѡA�еy��A��'; }
    });    
    $("#error").text(error);
})
