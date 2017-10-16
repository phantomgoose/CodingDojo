$(document).ready(function() {
    refreshNotes();

    $("#new-note").submit(function(e) {
        e.preventDefault();
        $.post("/notes", $("#new-note").serialize(), function(res) {
            refreshNotes();
        });
    });

    $("body").on("submit", ".update-note", function(e) {
        e.preventDefault();
        $form = $(this);
        $.ajax({
            url: $form.attr("action"),
            type: "PATCH",
            data: $form.serialize(),
            success: function(res) {
                refreshNotes();
            }
        });
    });

    $("body").on("click", ".delete-btn", function(e) {
        e.preventDefault();
        let note_id = this.parentElement.getAttribute("data-value");
        $.ajax({
            url: `/notes/${note_id}`,
            type: "DELETE",
            success: function(res) {
                refreshNotes();
            }
        });
    });

    $("body").on("click", ".description", function(e) {
        $(this).replaceWith(
            $(
                `<form class='update-note' action='/notes/${this.parentElement.getAttribute(
                    "data-value"
                )}' method='patch'><input class='update-description' type='text' value='${this
                    .innerHTML}' name='description'></form>`
            )
        );
    });

    function refreshNotes() {
        $.get("/notes", res => {
            console.log(res);
            $(".notes").html("");
            for (let note of res) {
                let html = `<div data-value='${note.id}'><h4 class='title'>${note.title}</h4><p class='description'>${note.description}</p><button class='delete-btn' >Delete</button></div>`;
                $(".notes").append(html);
            }
        });
    }
});
