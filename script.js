process.stdin.resume();
process.stdin.setEncoding("ascii");

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on("data", function (data) {
  input_stdin += data;
});

process.stdin.on("end", function () {
  input_stdin_array = input_stdin.split("\n");
  problem();
});

function line() {
  return input_stdin_array[input_currentline++];
}

function problem() {
  var q = line();
  for (var i = 0; i < q; i++) {
    var a = line();
    var b = line();
    console.log(canBeTransformed(a, b) ? "YES" : "NO");
  }
}

var x = {};

function canBeTransformed(a, b) {
  var sz = a + "_" + b;

  if (x[sz] === undefined) {
    if (b.length === 0) {
      x[sz] = a.toLowerCase() === a;
    } else if (b.length > a.length) {
      x[sz] = false;
    } else if (b.length === a.length) {
      if (a.toUpperCase() === b) {
        x[sz] = true;
      } else {
        x[sz] = false;
      }
    } else {
      var FRA = a.charAt(0);
      var FRB = b.charAt(0);
      if (FRA.toUpperCase() === FRA) {
        if (FRA === FRB) {
          x[sz] = canBeTransformed(a.substring(1), b.substring(1));
        } else {
          x[sz] = false;
        }
      } else if (FRA.toUpperCase() === FRB) {
        x[sz] =
          canBeTransformed(a.substring(1), b.substring(1)) ||
          canBeTransformed(a.substring(1), b);
      } else {
        x[sz] = canBeTransformed(a.substring(1), b);
      }
    }
  }

  return x[sz];
}
