const inquirer = require("inquirer");
const mysql = require("mysql2");

require('dotenv').config(); //this helps to hide sensitive information 

//connect your database
const connection = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  console.log("Connected to the employee tracker database.")
);

inquirer
  .prompt([
    {
      type: "list",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
        "Exit",
      ],
      message: "What would you like to do ?",
      name: "userChoice",
    },
  ])
  .then((response) =>{
       console.log(response);
       //if elseif 
       //switch 
  });
