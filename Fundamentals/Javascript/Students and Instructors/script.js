var users = {
 'Students': [
     {first_name:  'Michael', last_name : 'Jordan'},
     {first_name : 'John', last_name : 'Rosales'},
     {first_name : 'Mark', last_name : 'Guillen'},
     {first_name : 'KB', last_name : 'Tonel'}
  ],
 'Instructors': [
     {first_name : 'Michael', last_name : 'Choi'},
     {first_name : 'Martin', last_name : 'Puryear'}
  ]
 }

 function numOfChars(str){
   var count = 0;
   for (var char in str){
     count++;
   }
   return count;
 }

function getName(obj){
  return obj.first_name.toUpperCase() + " " + obj.last_name.toUpperCase();
}

function getNames(userList){
  for (var title in userList){
    console.log(title);
    var count = 1;
    for (var person in userList[title]){
      var name = getName(userList[title][person]);
      console.log(count + " - " + name + " - " + (numOfChars(name) - 1)); // have to subtract one due to space in the name
      count++;
    }
  }
}

getNames(users);
