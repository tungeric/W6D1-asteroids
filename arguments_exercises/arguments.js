const sum1 = function sum1() {
  const args = Array.from(arguments);
  let acc = 0;
  args.forEach (el => {
    acc += el;
  });
  return acc;
};

// console.log(sum1(1, 2, 3, 4));

const sum2 = function sum2(...args) {
  let acc = 0;
  args.forEach (el => {
    acc += el;
  });
  return acc;
};

// console.log(sum2(1, 2, 3, 4, 5));

// Object.prototype.myBind = function myBind(context) {
//   const bindArgs = Array.from(arguments).slice(1);
//   const fn = this;
//   return function() {
//     const callArgs = Array.from(arguments);
//     return fn.apply(context,bindArgs.concat(callArgs));
//   };
// };

Object.prototype.myBind = function myBind(context, ...bindArgs) {
  const fn = this;
  return function(...callArgs) {
    return fn.apply(context,bindArgs.concat(callArgs));
  };
};


// -------- TESTING ------------

// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//
//   says(sound, person) {
//     console.log(`${this.name} says ${sound} to ${person}!`);
//     return true;
//   }
// }
//
// const markov = new Cat("Markov");
// const breakfast = new Cat("Breakfast");
//
// markov.says("meow", "Ned");
// // Markov says meow to Ned!
// // true
//
// // bind time args are "meow" and "Kush", no call time args
// markov.says.myBind(breakfast, "meow", "Kush")();
// // Breakfast says meow to Kush!
// // true
//
// // no bind time args (other than context), call time args are "meow" and "me"
// markov.says.myBind(breakfast)("meow", "a tree");
// // Breakfast says meow to a tree!
// // true
//
// // bind time arg is "meow", call time arg is "Markov"
// markov.says.myBind(breakfast, "meow")("Markov");
// // Breakfast says meow to Markov!
// // true
//
// // no bind time args (other than context), call time args are "meow" and "me"
// const notMarkovSays = markov.says.myBind(breakfast);
// notMarkovSays("meow", "me");
// // Breakfast says meow to me!
// // true


function curriedSum(numArgs) {
  const numbers = [];

  function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      return sum2(...numbers);
    } else {
      return _curriedSum;
    }
  }

  return _curriedSum;
}

// const sum = curriedSum(4);
// console.log(sum(5)(30)(20)(1)); // => 56
// Function.prototype.curry = function(numArgs) {
//   const args = [];
//   const fn = this;
//
//   function _curry(arg) {
//     args.push(arg);
//     if (args.length === numArgs) {
//       return fn.apply(null,args);
//     } else {
//       return _curry;
//     }
//   }
//
//   return _curry;
// };

Function.prototype.curry = function(numArgs) {
  const args = [];
  const fn = this;

  function _curry(arg) {
    args.push(arg);
    if (args.length === numArgs) {
      return fn(...args);
    } else {
      return _curry;
    }
  }

  return _curry;
};

// ------ TEST ------

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

sumThree(4, 20, 6); // == 30

// you'll write `Function#curry`!
// let f1 = sumThree.curry(3); //
// f1 = f1(4); // [Function]
// f1 = f1(20); // [Function]
// f1 = f1(6); // = 30

// or more briefly:
console.log(sumThree.curry(3)(4)(20)(6)); // == 30
