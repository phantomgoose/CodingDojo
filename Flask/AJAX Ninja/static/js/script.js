$(document).ready(function(){
    $("button").click(function(e){
        $.ajax({
            url: "/process",
            method: "POST",
            data: { color: e.target.id },
            dataType: "json"
        }).done(function(data){
            var html = "<h1>You chose " + data.turtle + "</h1><img src='/static/img/" + data.turtle + ".jpg'>";
            $(".turtle").html(html);
        });
    });
});
