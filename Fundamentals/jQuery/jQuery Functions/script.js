$(document).ready(function(){

  function updateMethodList(tested_method){
    $("#"+tested_method).css("background", "green");
  }

  $("h1").fadeOut(400, function(){
    updateMethodList("fadeOut");
    $("h1").append(" !!!!!!!");
    updateMethodList("append");
    $("h1").fadeIn(400, function(){
      updateMethodList("fadeIn");
    });
  });

  $("main").slideDown(1000, function() {
    updateMethodList("slideDown");
  });

  $("#nav_toggle").click(function(){
    $("nav").slideToggle();
    updateMethodList("click");
    updateMethodList("slideToggle");
  });

  $("#hide_content").click(function(){
    $("main").hide();
    updateMethodList("click");
    updateMethodList("hide");
  });

  $("#show_content").click(function(){
    $("main").show();
    updateMethodList("click");
    updateMethodList("show");
  });

  $("h2").click(function() {
    $("h2").slideUp(1000, function(){
      updateMethodList("click");
      updateMethodList("slideUp");
      $("h2").slideDown(1000, function() {
        updateMethodList("slideDown");
      });
    });
  });

  $("p:first").text("changy changy. you can also click me to hide/unhide the next paragraph");
  updateMethodList("text");

  $("p:first").click(function() {
    updateMethodList("click");
    $("p:nth-child(3)").toggle();
    updateMethodList("toggle");
  });

  $("p:nth-child(3)").html("<h4>this is h4 now</h4>");
  updateMethodList("html");

  $("#add_class_to_p").click(function() {
    updateMethodList("click");
    $("p").addClass("test_class");
    updateMethodList("addClass");
  });

  $("#add_before_p").click(function() {
    updateMethodList("click");
    $(".test_class").before("inserting before ");
    updateMethodList("before");
  });

  $("#add_after_p").click(function() {
    updateMethodList("click");
    $(".test_class").after(" inserting after");
    updateMethodList("after");
  });

  $("#get_button_type").click(function() {
    updateMethodList("click");
    $("#get_button_type").text($("nav button").attr("class"));
    updateMethodList("text");
    updateMethodList("attr");
  });

  $("#val_button").click(function() {
    updateMethodList("click");
    alert($("select").val());
    updateMethodList("val");
  });

  $("#store").click(function() {
    updateMethodList("click");
    $("main").data("user_thoughts", $("select").val());
    updateMethodList("val");
    updateMethodList("data");
  });

  $("#load").click(function() {
    updateMethodList("click");
    var user_thought = $("main").data("user_thoughts");
    console.log("user_thought is " + $("main").data("user_thoughts"));
    updateMethodList("data");
    var our_thoughts = "";
    switch (user_thought) {
      case "not cool":
      our_thoughts = "you're not cool";
      break;
      case "pretty cool":
      our_thoughts = "you're pretty cool, too";
      break;
      case "pretty dang awesome":
      our_thoughts = "hey, you're awesome too, buddy";
      break;
      default:
      our_thoughts = "something went wrong with the selection thingy. Did you store your selection using the button above?";
    }
    $("span").text(our_thoughts);
    updateMethodList("text");
  });

  $("#end_it").click(function() {
    updateMethodList("click");
    $("p:last").toggle();
    updateMethodList("toggle");
  });

});
