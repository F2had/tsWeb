import axios from 'axios';
import User from './model/User';


const newUser = new User({name: 'BB', age: 25});

const data = newUser.save();
console.log(newUser)
