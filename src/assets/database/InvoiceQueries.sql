-- SELECT  first_name, last_name, first_name ||' '|| last_name as 'Full Name' from Customer ORDER BY first_name;


-- SELECT  Customer.first_name ||' '|| Customer.last_name as CustomerName,  Customer.customer_id, Invoice.invoice_id
-- FROM  Customer, Invoice
-- WHERE Customer.customer_id = Invoice.customer_id ;




SELECT * FROM Customer;
SELECT * FROM Item;
SELECT * FROM Invoice;
SELECT * FROM Cart;

-- INSERT INTO Cart (
--                      price,
--                      quantity,
--                      item_id,
--                      invoice_id
--                  )
--                  VALUES (
--                      45,
--                      5,
--                      5,
--                      1014
--                  );
-- INSERT INTO Invoice (
--                         total_price,
--                         created_date,
--                         customer_id,
--                         invoice_id
--                     )
--                     VALUES (
--                         NOT NULL,
--                         date('now'),
--                         108,
--                         1012
--                     );

-- SELECT quantity*price as total_price from Cart;
-- this will update the total_price of invoice table
UPDATE  Invoice SET total_price =(SELECT quantity*price from Cart WHERE Cart.invoice_id = Invoice.invoice_id);

SELECT * FROM Invoice;
SELECT * FROM Cart;

INSERT INTO Cart (
                        ,
                        created_date,
                        customer_id,
                        invoice_id
                    )
                    VALUES (
                        NOT NULL,
                        date('now'),
                        108,
                        1012
                    );
