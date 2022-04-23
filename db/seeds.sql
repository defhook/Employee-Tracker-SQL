INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 150000, 2), 
       ("Legal Team Lead", 250000, 4), 
       ("Accountant", 125000, 3), 
       ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Software Engineer", 120000, 2),
       ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Mike", "Chan", 2, NULL),
       ("Ashley", "Rodriguez", 3, NULL),
       ("Kevin", "Tupik", 1, 5),
       ("Kunal", "Singh", 4, 1),
       ("Malia", "Brown", 1, 2),
       ("Sarah", "Lourd", 2, 3);
      



