/* ARCHIVO DE INSERTS*/

/*Insert de Roles*/
INSERT INTO rol
    (rol_name)
VALUES
    ('CLIENT'),
    ('ADMIN');


/*Insert para tipo de ordenes*/
INSERT INTO order_type
    (order_name,days_to_deliver,order_type_status)
VALUES
    ('Bronce', 5, 'ACTIVE'),
    ('Silver', 3, 'ACTIVE'),
    ('Gold', 2, 'ACTIVE'),
    ('Premium', 1, 'ACTIVE');

INSERT INTO order_price_hist
    (starting_date,ending_date,time_tax,holidays_tax,specific_destination_tax,order_type_fk)
VALUES
    ('2020-04-01', null, 0, 2, 1, 1),
    ('2020-04-01', null, 1, 1, 1, 2),
    ('2020-04-01', null, 2, 2, 1, 3),
    ('2020-03-01', '2020-04-01', 2, 2, 1, 4),
    ('2020-04-01', null, 3, 3, 1, 4);

/*Inserts para precio de paquetes paquetes*/

INSERT INTO item_price_hist
    (starting_date,ending_date,base_price,price_km)
VALUES
    ('2020-04-01', '2020-05-01', 3, 1),
    ('2020-05-01', null, 2, 1.5);

/*Inserts para Caracteristicas de items*/
/*Tabla characteristic*/
INSERT INTO characteristic
    (cha_name,cha_status)
VALUES
    ('Flammable', 'ACTIVE'),
    ('Animal', 'ACTIVE'),
    ('Food', 'ACTIVE'),
    ('Fragile', 'ACTIVE'),
    ('Insured', 'ACTIVE');
/*Tabla char_price_hist*/
INSERT INTO char_price_hist
    (starting_date,ending_date,cha_tax,characteristic_fk)
VALUES
    ('2020-05-01', null, 5, 1),
    ('2020-05-01', null, 4, 2),
    ('2020-05-01', null, 3, 3),
    ('2020-05-01', null, 3, 4),
    ('2020-05-01', '2020-06-01', 2, 5),
    ('2020-06-01', null, 3, 5);

/*Inserts para oficinas*/
/*Places*/
INSERT INTO place
    (place_address, position_lat, position_long, zip_code)
VALUES
    ('199-101 Williams Ave. Minotola, NJ. USA', 39.514865 , -74.948866, '08341'),
    ('8000-8098 Jamesway Ln. Greenwood, DE. USA', 38.799898 , -75.613486, '19950'),
    ('401 S 16th St. Philadelphia, PA. USA', 39.945754 , -75.168330, '19146'),
    ('290-312 Garden St. Wethersfield, CT. USA', 41.715707 , -72.659929, '06109'),
    ('44-2 Polo St. Pawtucket, RI. USA', 41.867037 , -71.366997, '02860'),
    ('68 Stockton St. Boston, MA . USA', 42.282270 , -71.075619, '02124'),
    ('11 Woodville St. Everett, MA. USA', 42.414005 , -71.064397, '02149'),
    ('483-583 Somerville St. Manchester, NH. USA', 42.976454 , -71.450433, '03103'),
    ('199-145 W Brighton Ave. Syracuse, NY . USA', 43.020441 , -76.145704, '13205'),
    ('159-109 Sumpter St. Brooklyn, NY. USA', 40.680038 , -73.919799, '11233'),
    ('181-175 Orville Dr. Bohemia, NY . USA', 40.771644 , -73.101440, '11716'),
    ('200-230 W Church St. Somerset, PA. USA', 40.006727, -79.081517, '15501'),
    ('New Jersey Turnpike Newark Bay Extension, Oak Island Junction, Newark, Essex County, New Jersey, 07114, USA', 40.7027585,	-74.1421899, null);

/*Offices*/
INSERT INTO office
    (office_name, phone_number, office_status, place_fk)
VALUES
    ('Las Carmelitas', '+1 (641) 1598-423', 'ACTIVE', 1),
    ('Los Laureles', '+1 (641) 1348-563', 'ACTIVE', 2),
    ('Las Acacias', '+1 (641) 2478-569', 'ACTIVE', 3),
    ('Las Almendras', '+1 (641) 2635-941', 'ACTIVE', 4),
    ('Los Samanes', '+1 (641) 1457-854', 'ACTIVE', 5),
    ('Las Alfombras', '+1 (641) 1452-368', 'ACTIVE', 6),
    ('Las Rosas', '+1 (641) 1475-236', 'ACTIVE', 7),
    ('Los Tulipanes', '+1 (641) 1542-452', 'ACTIVE', 8),
    ('Los Arbustos', '+1 (641) 1423-626', 'ACTIVE', 9),
    ('Los Olivos', '+1 (641) 2351-524', 'ACTIVE', 10),
    ('Los Pepinos', '+1 (641) 7586-423', 'ACTIVE', 11),
    ('Las Mariposas', '+1 (641) 9854-785', 'BLOCKED', 12);

/*Simulation*/
INSERT INTO simulation
    (starting_date,ending_date,config_time)
VALUES
    ('2020-06-13', null, 5);

/*Discount*/
INSERT INTO discount
    (dis_name, dis_percentage, status)
VALUES
    ('WELCOME', 10, 'ACTIVE');

/*Usuario administrador del BO*/
INSERT INTO PERSON (
	document, first_name, middle_name, last_name, second_last_name, gender, phone_number, date_of_birth, def_language, picture_url, receive_notifications)
	VALUES ('111111111', 'John', null, 'Doe', null, 'M', '+1 (222) 222-2222', '1995-07-06', 'EN', null, false);

INSERT INTO USERDATA (user_email, user_password, registration_date, registration_type, user_status, person_fk, rol_fk)
VALUES ('admin@gmail.com', '$2a$10$pyqO/LPmeR98I8nUtKey/Oq2PeMmMnc.BlnbWA5sr8Fz18f/42NAu', '2020-07-06', 'REGULAR', 'ACTIVE', 1, 2);

/*Commercial ally*/
INSERT INTO COMMERCIAL_ALLY (COMMERCIAL_ALLY_ID, NAME, EMAIL, PHONE_NUMBER, MANAGER_NAME, MANAGER_LAST_NAME, DESCRIPTION, STATUS)
VALUES ('de514f87-4f91-4de4-92ea-5799731338e3', 'Buhocenter', 'buhocenter@gmail.com', '+1 (123) 456-7890', 'John', 'Doe', 'Online shopping site', 'ACTIVE');
INSERT INTO WAREHOUSE (NAME, STATUS, COMMERCIAL_ALLY_FK, PLACE_FK)
VALUES ('Main Warehouse', 'ACTIVE', 'de514f87-4f91-4de4-92ea-5799731338e3', 13);
