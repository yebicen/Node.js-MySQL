DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT NOT NULL,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  product_sales INT NULL,
  PRIMARY KEY (id)
);


CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(45) NULL,
  product_sales INT NULL,
  over_head_cost DECIMAL(10,2) NULL,
  PRIMARY KEY (department_id)
);


INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (1234, "banana", "fruit", 1.50, 1000, 0);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (4321, "apple", "fruit", 2.50, 500, 0);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (1122,"beer", "drink", 5.50, 300, 0);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (1133,"bread", "food", 2.50, 100, 0);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (1144,"pear", "fruit", 1.50, 300, 0);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (1155,"pen", "office", 1.50, 400, 0);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (1166,"eraser", "office", 0.50, 400, 0);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (1177,"lego", "toy", 10.00, 100, 0);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (1188,"orange juice", "drink", 3.50, 300, 0);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (1199,"red wine", "drink", 14.00, 50, 0);



INSERT INTO departments (department_name, over_head_cost)
VALUES ("drink", 6000);

INSERT INTO departments (department_name, over_head_cost)
VALUES ("office", 3000);

INSERT INTO departments (department_name, over_head_cost)
VALUES ("fruit", 1000);

INSERT INTO departments (department_name, over_head_cost)
VALUES ("toy", 4500);

INSERT INTO departments (department_name, over_head_cost)
VALUES ("food", 3500);




