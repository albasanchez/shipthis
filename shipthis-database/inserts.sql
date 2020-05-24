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

/*Inserts para tipos de paquetes*/
INSERT INTO category (caegory_name) VALUES ('Envelope');
INSERT INTO category (caegory_name) VALUES ('Box');

INSERT INTO item_type (item_name,max_weight,max_volume,item_type_status,category_fk) VALUES ('Little Envelope',200,200,'ACTIVE',1);
INSERT INTO item_type (item_name,max_weight,max_volume,item_type_status,category_fk) VALUES ('Big Envelope',400,400,'ACTIVE',1);
INSERT INTO item_type (item_name,max_weight,max_volume,item_type_status,category_fk) VALUES ('Small Box',1000,2000,'ACTIVE',2);
INSERT INTO item_type (item_name,max_weight,max_volume,item_type_status,category_fk) VALUES ('Medium Box',2000,3000,'ACTIVE',2);
INSERT INTO item_type (item_name,max_weight,max_volume,item_type_status,category_fk) VALUES ('Large Box',3000,5000,'ACTIVE',2);

INSERT INTO item_price_hist (starting_date,ending_date,base_price,price_km,ensurance_tax,fragily_tax,item_type_fk) VALUES ('2020-04-01',null,2,1,20,3,1);
INSERT INTO item_price_hist (starting_date,ending_date,base_price,price_km,ensurance_tax,fragily_tax,item_type_fk) VALUES ('2020-04-01',null,3,2,20,5,2);
INSERT INTO item_price_hist (starting_date,ending_date,base_price,price_km,ensurance_tax,fragily_tax,item_type_fk) VALUES ('2020-04-01',null,3,3,30,10,3);
INSERT INTO item_price_hist (starting_date,ending_date,base_price,price_km,ensurance_tax,fragily_tax,item_type_fk) VALUES ('2020-04-01',null,4,4,40,20,4);
INSERT INTO item_price_hist (starting_date,ending_date,base_price,price_km,ensurance_tax,fragily_tax,item_type_fk) VALUES ('2020-03-01','2020-04-01',4.5,4.7,10,5,5);
INSERT INTO item_price_hist (starting_date,ending_date,base_price,price_km,ensurance_tax,fragily_tax,item_type_fk) VALUES ('2020-04-01',null,5,5,50,30,5);