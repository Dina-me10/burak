//Compiled language: Java, Golang, C, C++, C# , Rust => Compiling & Running

//Interpreted language: NodeJS, Python, PHP,  Ruby   => Running

//Error Java compile jarayoida hatolarni aniqlaydi, NodeJS 5-satrga otgunga qadar xatoni topish qiyin / Error Type

//Typescript bu Nodejsga type tushunchasiga obkirgan , yani dynamic type integration

//typecript javascriptni 100% qoblab olgan , js Typescript ichida ...

//Typescript  TYPES => primitive = string, number, boolean, null, undefined, symbol
//  object = array, classes,

let box: string = "hello";
box = "100";

const counter: number = 100;

let stage: number | string = "hello";

//interface
interface Person {
  name: string;
  age: number;
  nation: string;
}

let person: Person = {
  name: "martin",
  age: 30,
  nation: "australian",
};
interface Person2 {
  firstName: string;
  middleName: string;
  lastName: string;
  age: number;
}
let dina: Person2 = {
  firstName: "Dina",
  middleName: "Mirisxakova.",
  lastName: "Mirjalilovna",
  age: 21,
};

//array
let skills: (number | string)[];
skills = ["Problem Sovling", "Software Design", "Programming"];

//class
class Person3 {
  age: number;
  firstName: string;
  lastName: string;

  constructor(age: number, firstName: string, lastName: string) {
    this.age = age;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

const person4 = new Person3(20, "Aisha", "Raimjanova");

//JavaScript typelarni yozish shartmasdi lekin typescriptda yozish kerek

//function

function echo(message: string): void {
  console.log(message.toUpperCase());
}

//Architecture pattern: MVC, DI, MVP
/*Judaxam muxum bo'lgan 
Architectural pattern:MVS /manosi:MODELE VIEW CONTROL

pattern: so'zi bu Naqsh,
shartli ravishda suyak */

//design pattern: Middleware , Decotar
//body just hand
