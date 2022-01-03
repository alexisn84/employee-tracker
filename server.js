//bring dependencies
const express = require('express');
const res = require('express/lib/response');
const db = require('./db/connection');
//const apiRoutes = require('./routes/apiRoutes');
const inquirer = require('inquirer');
const { allowedNodeEnvironmentFlags } = require('process');
require('console.table');

const PORT = process.env.PORT || 3001;
const app = express()

//express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use('/api', apiRoutes);

//connect the sql server to sql database
db.connect (function (err) {
    if (err) throw err;
    firstPrompt();
})

//function allows user to to see prompt for what they like to do 
function firstPrompt() {
    inquirer.prompt({
            type: 'list',
            name: 'task',
            message: 'Please select function you would like to do.',
            choices: [
                "View All Employees",
                "View Employees by Department",
                "Add Employee",
                "Remove Employee",
                "Update Employee Role",
                "Add Role",
                "Add Department",
                "Exit"
            ]
        })
        .then(function ({ task }) {
            switch (task) {
                case "View All Employees":
                    viewEmployees();
                    break;
                case "View Employees by Department":
                    viewEmployeeByDepartment();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Remove Employees":
                    removeEmployees();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Exit":
                    db.end();
                    break;
            }
        });
}

//view all employees
function viewEmployees() {
    let query = 
    `SELECT 
        employee.id, 
        employee.first_name, 
        employee.last_name, 
        role.title, 
        department.name AS department, 
        role.salary, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN role
        ON employee.role_id = role.id
    LEFT JOIN department
        ON department.id = role.department_id
    LEFT JOIN employee manager
        ON manager.id = employee.manager_id`

    db.query(query, (err, res)=>{
        if (err) throw err;
        console.table(res);
        firstPrompt();
    });
}


//default response for other (Not Found) requests
app.use((req, res) => {
    res.status(404).end();
});

//Listen
db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
});