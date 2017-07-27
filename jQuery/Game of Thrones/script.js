$(document).ready(function(){

  function populateInfo(houseName,  maxPages = 20, houseObj = undefined){
    let page = 1;

    // if we have no house object...
    if (!houseObj){
      // iterate through several pages (20 by default) of houses until we find one with the name that we're looking for
      while (page <= maxPages){
        $.get("https://www.anapioficeandfire.com/api/houses/?pageSize=50&page=" + page, function(data){
          for (var i = 0; i < data.length; i++){
            if(data[i].name.indexOf(houseName) >= 0){
              // recursively call populateInfo once we have the right object
              populateInfo(houseName, maxPages, data[i]);
            }
          }
        });
        page++;
      }
    }
    // once we have our house object, we can generate and push out the html!
    else {
      let html = "<h4>House Details</h4><p>Name: " + houseObj.name + "</p><p>Words: " + houseObj.words + "</p><p>Titles: ";//breaking to add titles
      for (title in houseObj.titles){
        html += " " + houseObj.titles[title] + ",";
      }
      html = html.substring(0, html.length - 1); // removing last comma
      html += "</p>";
      // stuffing the whole mess into the main section
      $("main").html(html);
    }
  }

  $("img").click(function(){
    // why can't I just call .val() here?
    populateInfo($(this).attr("value"));
  });
});
