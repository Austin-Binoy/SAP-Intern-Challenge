// Import necessary modules
const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();
const port = 5000;


let employees = [];

app.use(express.json());



// Reading the data.csv file
fs.createReadStream('data.csv')
  .pipe(csv())
  .on('data', (data) => employees.push(data))  //stores it into the employees arrat
  .on('end', () => {
    console.log('CSV file read');
  });


// CRUD API Endpoints

// GET all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// Get a specific employee by ID
app.get('/employees/:id', (req, res) => {
  const employee = employees.find(emp => emp.id === req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(400).send('Employee doesnt exist');
  }
});

// Add a new employee
app.post('/employees', (req, res) => {
  const newEmployee = req.body;
  if (newEmployee.id && newEmployee.name && newEmployee.email && newEmployee.position && newEmployee.salary) {
    // Check if salary is a number and is positive
    let num = parseFloat(newEmployee.salary);
    if (isNaN(num)) {
      res.status(400).send('Salary must be a number');
    } else if(num < 0) { 
      res.status(400).send('Salary must be positive');
    }
    // Check if the employee id already exists
    const employeeExists = employees.find(emp => emp.id === newEmployee.id);
    if (employeeExists) {
      res.status(400).send('Employee already exists');
    }
    // Check email is valid format
    const email = newEmployee.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).send('Invalid email format');
    }
    employees.push(newEmployee);
    res.status(201).send('Employee added successfully');
  } else {
    res.status(400).send('Invalid employee data');
  }
});

// UPDATE Function
app.put('/employees/:id', (req, res) => {
  const employeeIndex = employees.findIndex(emp => emp.id === req.params.id);
  if (employeeIndex !== -1) {
    employees[employeeIndex] = { ...employees[employeeIndex], ...req.body };
    res.send('Employee updated successfully');
  } else {
    res.status(400).send('Employee doesnt exist');
  }
});

// DELETE Function
app.delete('/employees/:id', (req, res) => {
  const employeeIndex = employees.findIndex(emp => emp.id === req.params.id);
  if (employeeIndex !== -1) {
    employees.splice(employeeIndex, 1);
    res.send('Employee deleted successfully');
  } else {
    res.status(400).send('Employee doesnt exist');
  }
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
