var HOUR = 11;
var MINUTE = 5;
var PERIOD = "PM";

var verbose_tod = "";
var verbose_time = "";
var print_next_hour = false;

if (MINUTE < 30) {
  if (MINUTE < 10) {
    verbose_time = "five after";
  }
  else if (MINUTE <= 20) {
    verbose_time = "quarter after";
  }
  else {
    verbose_time = "half past";
  }
}
else {
  if (MINUTE < 40) {
    verbose_time = "half past";
  }
  else if (MINUTE <= 50) {
    verbose_time = "quarter to";
    print_next_hour = true;
  }
  else {
    verbose_time = "five to";
    print_next_hour = true;
  }
}

if (PERIOD == "AM") {
  if (HOUR < 3) {
    verbose_tod = "at night";
  }
  else {
    verbose_tod = "in the morning";
  }
}
else {
  if (HOUR < 6) {
    verbose_tod = "in the afternoon";
  }
  else if (HOUR < 10) {
    verbose_tod = "in the evening";
  }
  else {
    verbose_tod = "at night";
  }
}

if (!print_next_hour) {
  console.log("It's", verbose_time, HOUR, verbose_tod);
}
else {
  console.log("It's", verbose_time, HOUR+1, verbose_tod);
}
