var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  runSearch();
});



function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Product Sales by Department",
        "Create New Department",
        "Delete a Department"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Product Sales by Department":
        groupDept();
        break;

      case "Create New Department":
        createNewdept();
        break;

      case "Delete a Department":
        deleteDept();
        break;
      }
    });
}

//state all variables first
var departmentName;
var productSales;

  function groupDept() { 
    var query = "SELECT department_name, SUM(product_sales) as product_sales FROM products GROUP BY department_name";
  connection.query(query, function(err, res) {
    // console.log(res);
    for (var i = 0; i < res.length; i++) {
    departmentName= res[i].department_name
    productSales = res[i].product_sales
    updateDept()
    }
    generateProfitshowAllfields()
});
  }


  function updateDept() {
    // console.log("Updating below: \n");
     var query = connection.query(
       "UPDATE departments SET ? WHERE ?",
       [
         {
           product_sales: productSales
         },
         {
           department_name: departmentName
         }
       ],
       function(err, res) {
        //  console.log(res.affectedRows + " products updated!\n");
       }
     );
      // logs the actual query being run
      // console.log(query.sql);
   } 
   
  function readProducts() {
    console.log("View Product Sales by Department: \n");
    connection.query("SELECT * FROM departments", function(err, res) {
      if (err) throw err;
      // Log all results of the SELECT statement
      // console.log(res); 
    for (var i = 0; i < res.length; i++) {
        console.log(
          "department_id: " +
            res[i].department_id +
            " || department_name: " +
            res[i].department_name +
            " || product_sales: " +
            res[i].product_sales +
            " || over_head_cost: " +
            res[i].over_head_cost
        );
      }
      runSearch()
    });
  }

  function generateProfitshowAllfields() { 
    var query = "SELECT department_id, department_name, over_head_cost, product_sales, product_sales-over_head_cost as total_profit FROM departments";
    //TOTAL_PROFIT IS ONLY LISTING IN THE TABLE AS A ALIAS, IS NOT WRTING INTO MYSQL
  connection.query(query, function(err, res) {
    // console.log(res);
  var table = new Table({
  head: ['department_id', 'department_name', 'product_sales', 'over_head_cost', 'total_profit']
    , colWidths: [16, 18,16,16,16]
    });

  for (var i = 0; i < res.length; i++) {     
  table.push(
  [res[i].department_id, res[i].department_name, res[i].product_sales,res[i].over_head_cost,res[i].total_profit]
);
    } //end of for loop

    console.log(table.toString()); //print out the table
    runSearch()
});
  } //end of generateProfitshowAllfields() function

  function createNewdept()  {
    var deptName;
    var overheadCost;
  
    console.log("Creating new depaertments below: "); 
    inquirer.prompt([
      {
        name: "dept",
        message: "Department Name: "
      },{
        name: "overheadcost",
        message: "Overhead Cost: "
      }
    ]).then(function(answers) {
      //PLACE TO ADD INPUT VALIDATE!!!
      deptName = answers.dept;
      overheadCost = parseInt(answers.overheadcost)

      console.log("Adding a new product...\n");
      var query = connection.query(
        "INSERT INTO departments SET ?",
        {
          department_name: deptName,
          over_head_cost: overheadCost,
          product_sales: 0
        },
        function(err, res) {
          console.log(res.affectedRows + " product inserted!\n");
          // Call updateProduct AFTER the INSERT completes
        }
      );
      // logs the actual query being run
      console.log(query.sql);
      readProducts();
    });
  }


  function deleteDept()  {
    var deptIDD;
  
    console.log("Which department do you want to delete? "); 
    inquirer.prompt([
      {
        name: "deptidd",
        message: "Department ID: "
      }
    ]).then(function(answers) {
      //PLACE TO ADD INPUT VALIDATE!!!
      deptIDD = answers.deptidd;
  
      console.log("Deleting department below: \n");
      connection.query(
        "DELETE FROM departments WHERE ?",
        {
          department_id: deptIDD
        },
        function(err, res) {
          console.log(res.affectedRows + " departments deleted!\n");
        }
      );
      readProducts();
    });
  }



