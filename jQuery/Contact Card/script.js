$(document).ready(function(){
  //spits card's contents out into a new div under main, adds styling, stores description for later swapping, and adds a handler to swap html contents with stored data on hover
  function appendContactCardDiv(obj){
    $("main").append(obj.html);
    $(".contact-card:last").css("border", "thick solid black");
    $(".contact-card:last").css("min-height", "65px");
    $(".contact-card:last").data("storedInfo", obj.storedInfo);
    $(".contact-card:last").hover(function(){
      swapContactCardData($(this));
    },
    function(){
      swapContactCardData($(this));
    });
  }

  //returns html along with the description
  //html is appended to main, description is stored as data on the appropriate div
  function generateContactCardDiv(){
    var firstname = $("input[name=first-name]").val();
    var lastname = $("input[name=last-name]").val();
    var description = $("textarea[name=description]").val();
    var result = {
      html : "<div class='contact-card'><h2>" + firstname + " " + lastname + "</h2><p>Hover for description!</p></div>",
      storedInfo : description
    }
    return result;
  }

  //temporarily stores html contents of a card, then swaps them with the stored contents (initially description)
  function swapContactCardData(card){
    var temp = card.html();
    card.html(card.data("storedInfo"));
    card.data("storedInfo", temp);
  }

  $("form").submit(function(){
    appendContactCardDiv(generateContactCardDiv());
    return false;
  });

});
