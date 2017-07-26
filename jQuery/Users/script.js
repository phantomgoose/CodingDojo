$(document).ready(function() {

  function formItemsToString(){

    var firstname = $("input[name=first-name]").val();
    var lastname = $("input[name=last-name]").val();
    var email = $("input[name=email]").val();
    var phone = $("input[name=phone]").val();

    $("table").append("<tr>"+"<th>"+firstname+"</th>"+"<th>"+lastname+"</th>"+"<th>"+email+"</th>"+"<th>"+phone+"</th>"+"</tr>");
    $("table tr:last th").css("font-weight", "normal");
  }

  $("form").submit(function() {
    formItemsToString();
    return false;
  });
});
