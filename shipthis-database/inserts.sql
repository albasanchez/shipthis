/* ARCHIVO DE INSERTS*/

/*Insert de Roles*/
INSERT INTO rol (rol_name) VALUES ('CLIENT');
INSERT INTO rol (rol_name) VALUES ('ADMIN');


/*Insert para tipo de ordenes*/
INSERT INTO order_type (order_name,days_to_deliver,order_type_status) VALUES ('Bronce', 5,'ACTIVE');
INSERT INTO order_type (order_name,days_to_deliver,order_type_status) VALUES ('Silver', 3,'ACTIVE');
INSERT INTO order_type (order_name,days_to_deliver,order_type_status) VALUES ('Gold', 2,'ACTIVE');
INSERT INTO order_type (order_name,days_to_deliver,order_type_status) VALUES ('Premium', 1,'ACTIVE');

INSERT INTO order_price_hist (starting_date,ending_date,time_tax,hollydays_tax,specific_destinatio_tax,order_type_fk) VALUES ('2020-04-01',null,0,2,1,1);
INSERT INTO order_price_hist (starting_date,ending_date,time_tax,hollydays_tax,specific_destinatio_tax,order_type_fk) VALUES ('2020-04-01',null,1,1,1,2);
INSERT INTO order_price_hist (starting_date,ending_date,time_tax,hollydays_tax,specific_destinatio_tax,order_type_fk) VALUES ('2020-04-01',null,2,2,1,3);
INSERT INTO order_price_hist (starting_date,ending_date,time_tax,hollydays_tax,specific_destinatio_tax,order_type_fk) VALUES ('2020-03-01','2020-04-01',2,2,1,4);
INSERT INTO order_price_hist (starting_date,ending_date,time_tax,hollydays_tax,specific_destinatio_tax,order_type_fk) VALUES ('2020-04-01',null,3,3,1,4);