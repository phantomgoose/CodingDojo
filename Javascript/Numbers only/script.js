function numbersOnly(arr){
  var result = [];
  for (var i = 0; i < arr.length; i++){
    if (typeof arr[i] === "number"){
      result.push(arr[i]);
    }
  }

  return result;
}

//...without using splice
function removeArrayElement(arr, index){
  for (var i = index; i < arr.length-1; i++){
    arr[i] = arr[i+1];
  }
  arr.pop();
}

function removeNumbers(arr){
  for (var i = 0; i < arr.length; i++){
    if (typeof arr[i] !== "number"){
      removeArrayElement(arr, i);
    }
  }
}

var newArray = numbersOnly([1, "apple", -3, "orange", 0.5]);
console.log(newArray);
var anotherTestArray = [1, "apple", -3, "orange", 0.5];
console.log(anotherTestArray);
removeNumbers(anotherTestArray);
console.log(anotherTestArray);
