/*SELECT department.name AS department,
role.title, role.salary,role.id FROM role
LEFT JOIN department
ON role.department_id = department.id
*/
SELECT role.salary AS salary, role.title AS job_title, department.name AS department, em.id, em.first_name, em.last_name, man.first_name as Manager_name FROM employee em JOIN employee man ON em.manager_id = man.id LEFT JOIN role ON em.role_id = role.id LEFT JOIN department ON role.department_id = department.id



