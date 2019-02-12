$(function () {
    var topic = $("input[name='topic']").val()
    ,options = []
    ,rows = $("tr:gt(0)")
    ,option =rows.find("td").eq(1)
    ,button1 = $(".button1")
    ,button2 =$(".button2")
    for (var row = 0; row <= rows.length;row++) {
        let i = 0;
        button1[row].live("click",function () {
            i++;
            if (i % 2 == 0) {
                button1[row].val( '確定');
                button2[row].val( '取消');
                option[row].html("<input name='options' type='text' value='"+ options[i]+"'/>");
            } else {
                button1[row].val('修改');
                button2[row].val('刪除');
                const j = $.inArray(option[row].text(), options);
                if (j == -1) { options.push(option[row].text()); }
                else { options[i] = option[row].text();}
            }
        })
        button2[row].live("click",function () {
            i++;
            if (i % 2 == 0) { rows[row].remove(); }
            else {
                button2[row].val('刪除');
                button1[row].val('修改')
                option[row].text(options[row]);
            }
        })
    }    
    $("input[name='add']").on("click",function () {
        $("tbody").append("<tr><td></td><td><input name='options' type='text'/></td><td><input class='button1' type='button' value='確定'/></td><td><input class='button2' type='button' value='取消'/></td></tr>")
    })

    $("form").submit(function () {
        $.ajax({
            url: 'create.php',
            type: 'POST',
            data: {
                topic: topic,
                options:JSON.stringify(options)
            }
        }).fail($("#error").text('新增投票失敗，請稍後再試'))
    })
})