INSERT INTO department (name)
VALUES ("IT"),
       ("Tech"),
       ("ER");

INSERT INTO role (title,salary,department_id)
VALUES ("Entry-level coder",10000,2),
       ("Entry-level consultant",8000,3),
       ("Entry-level IT",5000,1),
       ("Manager-IT", 11000,1),
       ("Manager-ER", 15000,3),
       ("Manager-TECH", 20000,2);
       

INSERT INTO employee (first_name,last_name,manager_id,role_id)
VALUES    ("NULL","NULL", NULL, NULL),
          ("Chuck", "Great", 1, 6),
          ("Huckleberry", "Finn", 1, 4),
          ("John","Green", 1,5),
          ("Guy", "Mean", 2, 1),
          ("Over","Yonder", 3, 3);
     
     
       