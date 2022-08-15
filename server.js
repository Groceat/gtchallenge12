const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3003;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Megabhyfc12!',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

const inquirer = require('inquirer');
const fs = require('fs');



const manage_company = () =>
inquirer
  .prompt([
    {
      type: 'checkbox',
      message: 'What would you like to do?',
      name: 'nextstep',
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department','Add a role','Add an employee','Update an employee role'],
    },
    
  ])
  .then((data) => {
    console.log(data.nextstep)
    if(data.nextstep=='View all roles'){
      db.query('SELECT department.name AS department, role.title, role.salary,role.id FROM role LEFT JOIN department ON role.department_id = department.id', function (err, results) {
        console.table(results);
      })
      
      manage_company()
    }
    if(data.nextstep=='View all employees'){
      db.query('SELECT role.salary AS salary, role.title AS job_title, department.name AS department, em.id, em.first_name, em.last_name, man.first_name as Manager_name FROM employee em JOIN employee man ON em.manager_id = man.id LEFT JOIN role ON em.role_id = role.id LEFT JOIN department ON role.department_id = department.id', function (err, results) {
        console.table(results);
      });
      manage_company();
    }
    if(data.nextstep=='View all departments'){
      db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
      });
      manage_company();
    }
    if(data.nextstep=='Add a department'){
      inquirer
      .prompt([
        {
          type: 'input',
          message: 'What is the department name?',
          name: 'dep_name',
        },
        
      ])
      .then((data) => {
        const sql = `INSERT INTO department (name)
        VALUES (?)`;
      const params = [data.dep_name];
        db.query(sql,params, (err, result) => {
          if (err) {
            console.log(err)
          }
          else{ console.log(result)}
        });
        manage_company();
      })

    }
    if(data.nextstep=='Add a role'){
      inquirer
      .prompt([
        {
          type: 'input',
          message: 'What is the role title?',
          name: 'role_title',
        },
        {
          type: 'input',
          message: 'What is the role salary?',
          name: 'role_sal',
        },
        {
          type: 'input',
          message: 'What is the role department_id?',
          name: 'rol_dep',
        },
        
      ])
      .then((data) => {
         const params = [data.role_title , data.role_sal, data.rol_dep];
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`;
     
      console.log(params)
        db.query(sql,params, (err, result) => {
          if (err) {
            console.log(err)
          }
          else{ console.log(result)}
        });
        manage_company();
    })}
    if(data.nextstep=='Add an employee'){
      inquirer
      .prompt([
        {
          type: 'input',
          message: 'What is their first name?',
          name: 'f_name',
        },
        {
          type: 'input',
          message: 'What is their last name?',
          name: 'l_name',
        },
        {
          type: 'input',
          message: 'What is their manager id?',
          name: 'm_id',
        },
        {
          type: 'input',
          message: 'What is their role id?',
          name: 'r_id',
        },
        
      ])
      .then((data) => {
        const params = [data.f_name , data.l_name,data.m_id,data.r_id];
        const sql = `INSERT INTO employee (first_name, last_name, manager_id, role_id) VALUES (?,?,?,?)`;
     
      console.log(params)
        db.query(sql,params, (err, result) => {
          if (err) {
            console.log(err)
          }
          else{ console.log(result)}
        });
      
        manage_company();})
    }
    if(data.nextstep=='Update an employee role'){
holdrole=[]
      db.query('SELECT role.id FROM role', function (err, results) {
        for(var i =0; i<results.length; i++){
          holdrole.push(results[i].id)
        }
      })
      db.query('SELECT employee.first_name FROM employee', function (err, results) {
        var holdarr=[]
        for(var i =0; i<results.length; i++){
          holdarr.push(results[i].first_name)
        }
       inquirer
       .prompt([
         {
           type: 'checkbox',
           message: 'Which Employee would you like to update?',
           name: 'nextstep',
           choices: holdarr,
         },
         {
          type: 'checkbox',
          message: 'What role would you like to update it to?',
          name: 'nextrole',
          choices: holdrole,
        }
         
       ])
       .then((data) => {
         params =[data.nextrole[0],data.nextstep[0]]
         console.log(params)
        db.query('UPDATE employee SET role_id = (?) WHERE employee.first_name = (?)',params,function (err, results) {
           console.log(results)
        })
       })
      });
    
    }
  })



app.use((req, res) => {
  res.status(404).end();
});
app.listen(PORT, () => {});
manage_company();