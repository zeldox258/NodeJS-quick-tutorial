console.log("This is my first js project");

function sum(a, b) {
    return a + b;
}

function sub(a, b) {
   return a - b;
}

function mul(a, b) {
   return a * b;
}

function div(a, b) {
   return a / b;
}


function testMyFunctions() {
   let flag = true;
   while(true){
      var a = Math.floor(Math.random() * 100);
      var b = Math.floor(Math.random() * 100);

      console.log("a: ", a);
      console.log("b: ", b);

      console.log("Sum: ", sum(a, b));
      console.log("Sub: ", sub(a, b));
      console.log("Mul: ", mul(a, b));
      console.log("Div: ", div(a, b));
   }
}

testMyFunctions();