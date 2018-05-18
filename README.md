# Node.js-MySQL
Week 12 Homework
Video Demo is here:
https://drive.google.com/file/d/1PVMZkXjsg7inNaadrFHrEhMDS5UFRYXh/view

Screenshot is in the "Screenshot.pdf"


- GENERAL:
- This homework created a bamazon database in mysql; two tables, products and departments; Three js file, customer, manager and supervisor; utilized one dependency in the supervisr.js to print table in the bash.


- Challenge #1: Customer View (Minimum Requirement)

- prompt call at Line 58 to ask what product and how many is customer ordering

- Then call different functions to achive view products, purchase,and return total cost for a client, also return the total sale of each product listed, and write back into mysql by using updating function call.

- When customer order a quantity more that in stock quantity, it will not place order and will print "Insufficient quantity" message. When customer is doing shopping, it will pring out each transaction of one item and will also accumulate the total cost for the customer, as well as updating the quantity and product sale for each item. When customer choose finish shopping, it will print out the total cost of all the products customer has shopped. These are put in calculatCost()function and being called.

See Line 146
```

function calculateCost() {
  currentCost = price * orderquantity;
  totalCost+=currentCost;
  console.log("Your current cost is: $", currentCost);
  console.log("Your total cost is: $", totalCost);
  console.log("The " + itemID + " product total sale now is: $" + totalSale)
}

```

- bamazonManager.js file: 


- Challenge #2: Manager View (Next Level)

- prompt call at Line 23 to ask what action the manager wants to take, then call functions accordingly. Functions include view all products, view low inventory, add or delete products. These are all updated in mysql database



Challenge #3: Supervisor View (Final Level)

- department table was set initially only with the dummy overhead cost for each existing department

- In bamazonSupervisor.js file, use query GROUP BY to group data from products table, and then use update function to write into the department table.

See Line 60
```

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

```

- Then inside the groupDept()function, call the updateDept() function, which is used to write the group data from product table to department table with a for loop shown as above and below code.
See Line 60
```

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
       }
     );
   } 

```

- To show the total profit by calculating the difference between overhead cost and product sale, I used alliases query, so the profit is not writing into the mysql but only log out in bash. See below code.

BONUS:
- Also I used a npm package to log out the data in a table shown in bash, see below code

See Line 115
```

function generateProfitshowAllfields() { 
    var query = "SELECT department_id, department_name, over_head_cost, product_sales, product_sales-over_head_cost as total_profit FROM departments";
    //TOTAL_PROFIT IS ONLY LISTING IN THE TABLE AS A ALIAS, IS NOT WRTING INTO MYSQL
  connection.query(query, function(err, res) {
  var table = new Table({
  head: ['department_id', 'department_name', 'product_sales', 'over_head_cost', 'total_profit']
    , colWidths: [16, 18,16,16,16]
    });
  for (var i = 0; i < res.length; i++) {     
  table.push(
  [res[i].department_id, res[i].department_name, res[i].product_sales,res[i].over_head_cost,res[i].total_profit]
);
    }
    console.log(table.toString()); //print out the table
    runSearch()
});
  } 

```