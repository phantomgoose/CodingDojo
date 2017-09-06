(function() {
    var $Dojo = function(element_id) {
        var element = document.getElementById(element_id);
        element.click = function(callback){
            element.addEventListener('click', callback);
        };
        element.hover = function(hover_on, hover_off){
            element.addEventListener('mouseover', hover_on);
            element.addEventListener('mouseout', hover_off);
        };
        return element;
    }

    // exposing $Dojo to the browser
    window.$Dojo = $Dojo;
    return $Dojo;
}());