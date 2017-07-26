$(document).ready(function() {
  function random() {
    return Math.floor(Math.random()*2);
  }

  function randomizeSrc(element){
    if (random()){
      var temp = element.attr("src");
      element.attr("src",element.attr("alt-src"));
      element.attr("alt-src", temp);
    }
  }

  $("img").each(function() {
    randomizeSrc($(this));
  });

  function flipSrc(element){
    var temp = element.attr("src");
    element.attr("src",element.attr("alt-src"));
    element.attr("alt-src", temp);
  }

  $("img").click(function() {
    flipSrc($(this));
  });

});
