$(document).ready(function() {
    $("#generate-btn").click(function(e) {
        $.post("/generate", function(res) {
            $("#gen_count").html(res.gen_count);
            $("#passcode").val(res.passcode);
        });
        e.preventDefault();
    });
    $("#passcode").click(function() {
        $(this).select();
    });
});
