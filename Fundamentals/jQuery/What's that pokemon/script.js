$(document).ready(function() {

  // appends images containing pokemans by reference number to the pokeman_pictures class, adjusts their width, and assigns them an id equal to their number
  function addPokemonPicture(num){
    $(".pokeman_pictures").append("<img id='" + num + "'src=http://pokeapi.co/media/img/" + num + ".png>");
    $(".pokeman_pictures img:last").css("width", "75px");
    $(".pokeman_pictures img:last").click(function(){
      onPokeClick($(this));
    });
  }

  // populates pokeman_info with info about pokeman using its JSON data
  function populatePokemanInfo(data){
    let html = "<h2>" + data.name + "</h2><img src=http://pokeapi.co/media/img/" + data.national_id + ".png><h4>Types</h4><ul>"; //breaking to iterate through types
    for (let i = 0; i < data.types.length; i++){
      html += "<li>" + data.types[i].name + "</li>";
    }
    html += "</ul><h4>Height</h4><p>" + data.height + "</p><h4>Weight</h4><p>" + data.weight +"</p>";
    $(".pokeman_info").html(html);
  }

  // fires when a pokemon is clicked, grabs info about it and populates info box with info about the pokemon by calling the relevant function
  function onPokeClick(pokemon){
    let pokeInfo = $.get("http://pokeapi.co/api/v1/pokemon/" + pokemon.attr("id"), function(data){
      console.log(data);
      populatePokemanInfo(data);
    }, "json");
  }

  // populates pokeman_pictures with pictures of 151 pokemans on load
  for (var i = 1; i <= 151; i++){
    addPokemonPicture(i);
  }

});
