import User from "./model/User";

const newUser = new User({name: 'AA', age: 20})


console.log(newUser.get('name'));
console.log(newUser.get('age'));
newUser.set({name: 'BB',  age: 24 });
console.log(newUser.get('name'));
console.log(newUser.get('age'));