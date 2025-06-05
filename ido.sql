CREATE TABLE images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_url VARCHAR(255) NOT NULL,
    related_type VARCHAR(50) NOT NULL,  -- e.g., 'product', 'banner'
    related_id INT NOT NULL             -- the ID in that table
);



ALTER TABLE products
CHANGE COLUMN Product_ID product_id INT,
CHANGE COLUMN Description description TEXT,
CHANGE COLUMN Type_of_Product type_of_product VARCHAR(100),
CHANGE COLUMN Amount_of_Product amount_of_product INT,
DROP COLUMN Pictures;