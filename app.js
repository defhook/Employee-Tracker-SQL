//---------------Dependencies---------------//
const inquirer = require("inquirer");
const mysql = require("mysql2");
const chartTable = require('console.table');

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

//--------------------Connetion ID--------------//
connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    startPrompt();
});

//--------------------Initial prompt--------------//
function startPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
        message: "What would you like to do?",
        name: "userChoice",
      },
    ])
    .then(function (val) {
      switch (val.choice) {
        case "View all Employees?":
          viewAllEmployees();
          break;
        case "View all Employees By Deparments":
          viewAllDepartments();
          break;

        case "Add Employee?":
          addEmployee();
          break;

        case "Update Employee":
          updateEmployee();
          break;

        case "Add Role?":
          addRole();
          break;

        case "Add Department?":
          addDepartment();
          break;
      }
    });
}
