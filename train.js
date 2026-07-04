console.log ("JavaScript 1 ");

console.log ("qoshish");

function add ( a ,b ) {
    return a + b; 
}

console.log(add(10, 12));

function add1 ( c , d) {
    return c + d;
}

console.log(add1(22, 22));

console.log ("ayirish");

function sub (a , b ) {
    return a-b;

}
console.log(sub(20, 2 ));

function sub1 ( c ,d) {
  return ( c- d);
}
 console.log(sub1(100, 70));

 console.log ("ko'paytirish");

 function mul ( a, b) {
    return (a*b);

 }
 console.log(mul(800, 2));

 function mul1 (c , d) {
    return (c*d) ;

 }

 console.log(mul1(20,20));

console.log ("bo'lish");

function div ( a , b) {
    return (a/b);
}
console.log(div(100, 2));

function div1 ( c , d) {
    return (c/d);
}
console.log(div1(100, 10));


console.log("JavaScript 2 ");

console.log("juft yoki toq");

function evenOdd ( number1) {
    if (number1 % 2 == 0 ) {
        return "even";
    } else {
        return "odd"; }

}

console.log(evenOdd(10));
console.log(evenOdd(7));

console.log("manfiy yoki musbat");

function NegativePositive (number1) {
    if (number1 > 0) {
        return "positive number" ;
    } else if (number1 < 0) {
        return "negative number";
    } else {
        return "zero";
    }
}

console.log(NegativePositive(10));
console.log(NegativePositive(-5));
console.log(NegativePositive(0));


console.log( " Arrays ");

console.log(" ohiriga array element qo'shish ");

const fruits = ["orange", "banana", "apple"];
fruits.push("melon");
console.log(fruits);

console.log(" ohiridan array element o'chirish ");

const fruits1 = ["orange", "banana", "apple"];
fruits1.pop();  
console.log(fruits1);

console.log(" boshidan array element qo'shish ");

const fruits2 = ["orange", "banana", "apple"];
fruits2.unshift("melon");
console.log(fruits2);

console.log(" boshidan array element ochirish");

const fruits3 = ["orange", "banana", "apple"];
fruits3.shift();
console.log(fruits3);

console.log ("for loop ");

//let i = 0 → i = 0 dan boshla
//i <= 5 → i 5 dan kichik yoki teng bo'lguncha davom et
//i++ → har safar i ga 1 qo'sh

console.log("for loop har bir elementni chiqarish");

const cars = ["BMW", "Volvo", "Chevrolet ", "Ford"];
for (let i = 0; i <cars.length; i++){
 console.log(cars[i]);
}

const names = ["Aisha", "dina", "alex", "burak"];
for (let i = 0; i < names.length; i++) {
    console.log(names[i]);
}

//Faqat elementlar kerak → for...of ✅
//Indeks ham kerak → oddiy for ✅

console.log("for...of loop har bir elementni chiqarish");

const colors = ["red", "green", "blue", "yellow"];
for (const color of colors ) {
    console.log(color);
}