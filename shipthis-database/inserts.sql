/* ARCHIVO DE INSERTS*/

/*Insert de Roles*/
INSERT INTO rol
    (rol_name)
VALUES
    ('CLIENT');
INSERT INTO rol
    (rol_name)
VALUES
    ('ADMIN');


/*Insert para tipo de ordenes*/
INSERT INTO order_type
    (order_name,days_to_deliver,order_type_status)
VALUES
    ('Bronce', 5, 'ACTIVE');
INSERT INTO order_type
    (order_name,days_to_deliver,order_type_status)
VALUES
    ('Silver', 3, 'ACTIVE');
INSERT INTO order_type
    (order_name,days_to_deliver,order_type_status)
VALUES
    ('Gold', 2, 'ACTIVE');
INSERT INTO order_type
    (order_name,days_to_deliver,order_type_status)
VALUES
    ('Premium', 1, 'ACTIVE');

INSERT INTO order_price_hist
    (starting_date,ending_date,time_tax,hollydays_tax,specific_destinatio_tax,order_type_fk)
VALUES
    ('2020-04-01', null, 0, 2, 1, 1);
INSERT INTO order_price_hist
    (starting_date,ending_date,time_tax,hollydays_tax,specific_destinatio_tax,order_type_fk)
VALUES
    ('2020-04-01', null, 1, 1, 1, 2);
INSERT INTO order_price_hist
    (starting_date,ending_date,time_tax,hollydays_tax,specific_destinatio_tax,order_type_fk)
VALUES
    ('2020-04-01', null, 2, 2, 1, 3);
INSERT INTO order_price_hist
    (starting_date,ending_date,time_tax,hollydays_tax,specific_destinatio_tax,order_type_fk)
VALUES
    ('2020-03-01', '2020-04-01', 2, 2, 1, 4);
INSERT INTO order_price_hist
    (starting_date,ending_date,time_tax,hollydays_tax,specific_destinatio_tax,order_type_fk)
VALUES
    ('2020-04-01', null, 3, 3, 1, 4);

/*Inserts para tipos de paquetes*/
INSERT INTO category
    (caegory_name)
VALUES
    ('Envelope');
INSERT INTO category
    (caegory_name)
VALUES
    ('Box');

INSERT INTO item_type
    (item_name,max_weight,max_volume,item_type_status,category_fk)
VALUES
    ('Little Envelope', 200, 200, 'ACTIVE', 1);
INSERT INTO item_type
    (item_name,max_weight,max_volume,item_type_status,category_fk)
VALUES
    ('Big Envelope', 400, 400, 'ACTIVE', 1);
INSERT INTO item_type
    (item_name,max_weight,max_volume,item_type_status,category_fk)
VALUES
    ('Small Box', 1000, 2000, 'ACTIVE', 2);
INSERT INTO item_type
    (item_name,max_weight,max_volume,item_type_status,category_fk)
VALUES
    ('Medium Box', 2000, 3000, 'ACTIVE', 2);
INSERT INTO item_type
    (item_name,max_weight,max_volume,item_type_status,category_fk)
VALUES
    ('Large Box', 3000, 5000, 'ACTIVE', 2);

INSERT INTO item_price_hist
    (starting_date,ending_date,base_price,price_km,ensurance_tax,fragily_tax,item_type_fk)
VALUES
    ('2020-04-01', null, 2, 1, 20, 3, 1);
INSERT INTO item_price_hist
    (starting_date,ending_date,base_price,price_km,ensurance_tax,fragily_tax,item_type_fk)
VALUES
    ('2020-04-01', null, 3, 2, 20, 5, 2);
INSERT INTO item_price_hist
    (starting_date,ending_date,base_price,price_km,ensurance_tax,fragily_tax,item_type_fk)
VALUES
    ('2020-04-01', null, 3, 3, 30, 10, 3);
INSERT INTO item_price_hist
    (starting_date,ending_date,base_price,price_km,ensurance_tax,fragily_tax,item_type_fk)
VALUES
    ('2020-04-01', null, 4, 4, 40, 20, 4);
INSERT INTO item_price_hist
    (starting_date,ending_date,base_price,price_km,ensurance_tax,fragily_tax,item_type_fk)
VALUES
    ('2020-03-01', '2020-04-01', 4.5, 4.7, 10, 5, 5);
INSERT INTO item_price_hist
    (starting_date,ending_date,base_price,price_km,ensurance_tax,fragily_tax,item_type_fk)
VALUES
    ('2020-04-01', null, 5, 5, 50, 30, 5);

/*Inserts para oficinas*/
/*Places*/
INSERT INTO place
    (place_address, position_lat, position_long, zip_code)
VALUES
    ('199-101 Williams Ave. Minotola, NJ. USA', 39.514865 , -74.948866, '08341');
INSERT INTO place
    (place_address, position_lat, position_long, zip_code)
VALUES
    ('8000-8098 Jamesway Ln. Greenwood, DE. USA', 38.799898 , -75.613486, '19950');
INSERT INTO place
    (place_address, position_lat, position_long, zip_code)
VALUES
    ('401 S 16th St. Philadelphia, PA. USA', 39.945754 , -75.168330, '19146');
INSERT INTO place
    (place_address, position_lat, position_long, zip_code)
VALUES
    ('290-312 Garden St. Wethersfield, CT. USA', 41.715707 , -72.659929, '06109');
INSERT INTO place
    (place_address, position_lat, position_long, zip_code)
VALUES
    ('44-2 Polo St. Pawtucket, RI. USA', 41.867037 , -71.366997, '02860');
INSERT INTO place
    (place_address, position_lat, position_long, zip_code)
VALUES
    ('68 Stockton St. Boston, MA . USA', 42.282270 , -71.075619, '02124');
INSERT INTO place
    (place_address, position_lat, position_long, zip_code)
VALUES
    ('11 Woodville St. Everett, MA. USA', 42.414005 , -71.064397, '02149');
INSERT INTO place
    (place_address, position_lat, position_long, zip_code)
VALUES
    ('483-583 Somerville St. Manchester, NH. USA', 42.976454 , -71.450433, '03103');
INSERT INTO place
    (place_address, position_lat, position_long, zip_code)
VALUES
    ('199-145 W Brighton Ave. Syracuse, NY . USA', 43.020441 , -76.145704, '13205');
INSERT INTO place
    (place_address, position_lat, position_long, zip_code)
VALUES
    ('159-109 Sumpter St. Brooklyn, NY. USA', 40.680038 , -73.919799, '11233');
INSERT INTO place
    (place_address, position_lat, position_long, zip_code)
VALUES
    ('181-175 Orville Dr. Bohemia, NY . USA', 40.771644 , -73.101440, '11716');
INSERT INTO place
    (place_address, position_lat, position_long, zip_code)
VALUES
    ('200-230 W Church St. Somerset, PA. USA', 40.006727, -79.081517, '15501');
/*Offices*/
INSERT INTO office
    (office_name, phone_code, phone_number, office_status, place_fk)
VALUES
    ('Las Carmelitas', '+1641', '1598423', 'ACTIVE', 1);
INSERT INTO office
    (office_name, phone_code, phone_number, office_status, place_fk)
VALUES
    ('Los Laureles', '+1641', '1348563', 'ACTIVE', 2);
INSERT INTO office
    (office_name, phone_code, phone_number, office_status, place_fk)
VALUES
    ('Las Acacias', '+1641', '2478569', 'ACTIVE', 3);
INSERT INTO office
    (office_name, phone_code, phone_number, office_status, place_fk)
VALUES
    ('Las Almendras', '+1641', '2635941', 'ACTIVE', 4);
INSERT INTO office
    (office_name, phone_code, phone_number, office_status, place_fk)
VALUES
    ('Los Samanes', '+1641', '1457854', 'ACTIVE', 5);
INSERT INTO office
    (office_name, phone_code, phone_number, office_status, place_fk)
VALUES
    ('Las Alfombras', '+1641', '1452368', 'ACTIVE', 6);
INSERT INTO office
    (office_name, phone_code, phone_number, office_status, place_fk)
VALUES
    ('Las Rosas', '+1641', '1475236', 'ACTIVE', 7);
INSERT INTO office
    (office_name, phone_code, phone_number, office_status, place_fk)
VALUES
    ('Los Tulipanes', '+1641', '1542452', 'ACTIVE', 8);
INSERT INTO office
    (office_name, phone_code, phone_number, office_status, place_fk)
VALUES
    ('Los Arbustos', '+1641', '1423626', 'ACTIVE', 9);
INSERT INTO office
    (office_name, phone_code, phone_number, office_status, place_fk)
VALUES
    ('Los Olivos', '+1641', '2351524', 'ACTIVE', 10);
INSERT INTO office
    (office_name, phone_code, phone_number, office_status, place_fk)
VALUES
    ('Los Pepinos', '+1641', '7586423', 'ACTIVE', 11);
INSERT INTO office
    (office_name, phone_code, phone_number, office_status, place_fk)
VALUES
    ('Las Mariposas', '+1641', '9854785', 'BLOCKED', 12);
