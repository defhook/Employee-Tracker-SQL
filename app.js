//Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql2");
const chartTable = require("console.table");

require("dotenv").config(); //this helps to hide sensitive information

//connect your database
const connection = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  console.log("Connected to the employee tracker database.")
);

connection.connect((err) => {
  if (err) throw err;
  startPrompt();
});

function startPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "View All Employees?",
          "View All Employee's By Roles?",
          "View all Employee's By Departments",
          "Update Employee",
          "Add Employee?",
          "Add Role?",
          "View All Roles?",
          "Add Department?",
          "View All Departments?",
          "Exit"
        ],
      },
    ])
    .then(function (val) {
      switch (val.choice) {
        case "View All Employees?":
          viewAllEmployees();
          break;

        case "View All Employee's By Roles?":
          viewAllEmployeesByRole();
          break;
        case "View all Employee's By Departments?":
          viewAllDepartmentsforEmployees();
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

        case "View All Roles?":
          viewAllRoles();
          break;

        case "Add Department?":
          addDepartment();
          break;
        case "View All Departments?":
          viewAllDepartments();
          break;
        default:
          console.log("Good bye ");

          process.exit(0);
      }
    });
}
//View All Employees
function viewAllEmployees() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
}
//View All Roles
function viewAllRoles() {
  connection.query(
    "SELECT  role.title AS Title, role.salary  as Salary, department.name as Department FROM role JOIN department ON role.department_id = department.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
}
function viewAllEmployeesByRole() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
}
//View All Employees By Departments
function viewAllDepartmentsforEmployees() {
  connection.query(
    "SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
}

function viewAllDepartments() {
  connection.query(
    "SELECT id, name AS Department FROM department;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      startPrompt();
    }
  );
}

//Select Role Queries Role Title for Add Employee
var roleArr = [];
function selectRole() {
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  });
  return roleArr;
}
//Select Role Queries The Managers for Add Employee
var managersArr = [];
function selectManager() {
  connection.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL",
    function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        //managersArr.push({ name: res[i].first_name, value: res[i].employee_id});
        //managersArr.push({res[i].first_name: res[i].employee_id});

        managersArr.push(res[i].first_name);
        
      }
    }
  );
  return managersArr;
}
//Add Employee
function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Enter their first name ",
      },
      {
        name: "lastName",
        type: "input",
        message: "Enter their last name ",
      },
      {
        name: "role",
        type: "list",
        message: "What is their role? ",
        choices: selectRole(),
      },
      {
        name: "choice",
        type: "rawlist",
        message: "Whats their managers name?",
        choices: selectManager(),
      },
    ])
    .then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1;
      var managerId = selectManager().indexOf(val.choice) + 1;
      //console.log(val.choice); 
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: val.firstName,
          last_name: val.lastName,
          manager_id: managerId,
          role_id: roleId,
        },
        function (err) {
          if (err) throw err;
          console.table(val);
          startPrompt();
        }
      );
    });
}
// Update Employee
function updateEmployee() {
  connection.query(
    "SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
      if (err) throw err;
      console.log(res);
      inquirer
        .prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function () {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: selectRole(),
          },
        ])
        .then(function (val) {
          var roleId = selectRole().indexOf(val.role) + 1;
          connection.query(
            "UPDATE employee SET WHERE ?",
            {
              last_name: val.lastName,
            },
            {
              role_id: roleId,
            },
            function (err) {
              if (err) throw err;
              console.table(val);
              startPrompt();
            }
          );
        });
    }
  );
}
// Add Employee Role
function addRole() {
  connection.query(
    "SELECT role.title AS Title, role.salary AS Salary FROM role",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the roles Title?",
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the Salary?",
          },
          {
            name: "department_id",
            type: "input",
            message: "Please enter the department id",
          },
        ])
        .then(function (res) {
          connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
              department_id: res.department_id
            },
            function (err) {
              if (err) throw err;
              console.table(res);
              startPrompt();
            }
          );
        });
    }
  );
}
// Add Department
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What Department would you like to add?",
      },
    ])
    .then(function (res) {
      var query = connection.query(
        "INSERT INTO department SET ? ",
        {
          name: res.name,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          startPrompt();
        }
      );
    });
}
