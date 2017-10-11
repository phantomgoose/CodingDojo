$(document).ready(function() {
    let global_state;
    // get game state on page load and update ui
    $.getJSON("/fetch", game => {
        global_state = game;
        updateLoop();
    });

    function updateLoop() {
        setTimeout(function() {
            // would be better to add some events for when these values actually change instead of updating everything every 200ms, but meh
            $("#message").html(global_state.message);
            if (global_state.gameOver) {
                $(".btn-playing").hide();
                $(".btn-done").show();
            } else {
                $(".btn-done").hide();
                $(".btn-playing").show();
            }
            $("#fullness").html(global_state.fullness);
            $("#happiness").html(global_state.happiness);
            $("#meals").html(global_state.meals);
            $("#energy").html(global_state.energy);
            updateLoop();
        }, 200);
    }

    $("#feed").click(function(e) {
        e.preventDefault();
        $.get("/feed", function(game) {
            global_state = game;
        });
    });

    $("#work").click(function(e) {
        e.preventDefault();
        $.get("/work", function(game) {
            global_state = game;
        });
    });

    $("#play").click(function(e) {
        e.preventDefault();
        $.get("/play", function(game) {
            global_state = game;
        });
    });

    $("#sleep").click(function(e) {
        e.preventDefault();
        $.get("/sleep", function(game) {
            global_state = game;
        });
    });

    $("#reset").click(function(e) {
        e.preventDefault();
        $.get("/reset", function(game) {
            global_state = game;
        });
    });
});
