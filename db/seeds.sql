INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Accounting"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 8320.00, 1), 
       ("Sales Manager", 140000.00, 1), 
       ("Software Architect", 160000.00, 2), 
       ("Senior Engineer", 120000.00, 2),
       ("Junior Engineer", 90000.00, 2),
       ("Chief Financial Officer", 250000.00, 3),
       ("Accountant", 95000.00, 3),
       ("Head of Legal", 250000.00, 4),
       ("Attorney", 175000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 2, NULL),
       ("Mike", "Chan", 1, 1),
       ("Ashley", "Rodriguez", 3, NULL),
       ("Kevin", "Tupik", 4, 3),
       ("Kunal", "Singh", 5, 3),
       ("Malia", "Brown", 6, NULL),
       ("Sarah", "Lourd", 7, 6),
       ("Tom", "Allen", 8, NULL),
       ("Joe", "Smith", 9, 8);