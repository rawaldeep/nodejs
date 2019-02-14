#!/usr/bin/env node
const axios = require("axios");
const validator = require("email-validator");
let readline = require('readline-sync');
const chalk = require("chalk");                 //
const validity = chalk.black.bgGreen.underline  // some styles for my confirmation messages.
const errorMessage = chalk.black.bgRed.underline; //
const email = readline.question("what's your email adress?");

if(validator.validate(email)){
    const encodeEmail = encodeURIComponent(email);
    const url = "https://haveibeenpwned.com/api/v2/breachedaccount/" + encodeEmail;

    axios.get(url, { 'headers': { "User-Agent": "Node CLI tool"}})
    .then(function(response){
        console.log(errorMessage("This email has been breached!"))
    }).catch(function(error){
        console.log(validity("This email has not been breached!"))
    })
}else(console.log(errorMessage("Please enter a valid email.")))