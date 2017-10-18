$(document).ready(function() {
    updateNav();

    // replaces active a-tags with a span
    function updateNav() {
        let path = location.pathname.split("/")[1];
        let a = $('nav a[href^="/' + path + '"]')[0];
        $(a).addClass("active");
    }
});
