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
    ('tAsmRXdNNI8Nb0eGLTKmaZ6TkSVH8SHT7yCVxGVmn0J73K5816TclX4c1ZeLTs32', 39.514865 , -74.948866, 'SlGhyehXks7mB+gL+DeeaQ=='),
    ('x00gMNuOdQQw/KA4r9Ys2xq/jFuhH3nNAGZr4q/TDOLxxKMUtkjhw6aBNb7r1+m1', 38.799898 , -75.613486, 'ntX+rOTdFKl5oA880KQ3UA=='),
    ('fLEqipOghqzg3t/XfMaw3p1L5DMbxCw7PO65JRn0aoRYcaR/F5f4wp76MVJJw5Nm', 39.945754 , -75.168330, '3rJdxvLGQ6WRsbWjO/CoIQ=='),
    ('WXaxAoZx0HJ0KUQlWX8Bv5DkFvnU3vDFhcdAPr9HzP/HtzXipHB8x0dgoPNwwkle', 41.715707 , -72.659929, 'qG1Xmab+XRSkPfi1TbRFcA=='),
    ('8X1MEL+J81DNtatK608N25dWQxdQas30tGQlW+93BMftZQvyDJrp6zT6LymfD+8D', 41.867037 , -71.366997, 'LfWKj8qP0FOXhsi1M5dWMQ=='),
    ('42MSptj3sLGkiSjZ+cp/OwSsOH40QA0juEBSmmazdkOe6GOkfTeiyqxqaB8FPtq0', 42.282270 , -71.075619, 'Unz3s53lRPlnSAQv8loR8g=='),
    ('wGUucGka7uFNNoEZcYFWyVMKo5Mv+neRvuw/LYqnzG9yBge4n0RLKbBUPgmFinl6', 42.414005 , -71.064397, 'hwL+qyrbDlji5IrkgH8XIw=='),
    ('axVxERgI40zcrcUq0k24yXyfTPbsjXXMVqWxi1nZBQDzPAI4iqbjflppnh3M7wpg', 42.976454 , -71.450433, 'PyC6UsnQ1YSKtGqUwPiMQg=='),
    ('0txF8qPItL83lO3d0zG7wwoB2UnrsfrcW0kZ7bPpDDsTDgRK2J0TGvHHZAlSKB+A', 43.020441 , -76.145704, 'mb3SJwGUZJFRVYXs7sf74A=='),
    ('cSTuk6ce62TdoPOt79lVTidUtnPciJWcAtvBUjEsZDejAjtiD2HgddH2PgVPaClt', 40.680038 , -73.919799, 'uhS+tU5LAc+BkDB/V4FCyA=='),
    ('fs2uukrnTiGqcxTLtl22IUpPovm5nOLmawudM029Cyq/JmeEjALDgcO0wXq+FUIg', 40.771644 , -73.101440, '1+Dhb5bHDSP6h+4oq7I/AA=='),
    ('mr+L1a5ienRzlfnKzPGf2sx4+FZqiWHBV9PUDgFa6H/a7dk5qUd/I2QDOi3QQtWv', 40.006727, -79.081517, 'Rsc0HlAsrpfvJHuzN+8Lsw=='),
    ('B2uDvwOm0fP/rqKA9YXQ099tihrIaOHoLX9BTOx9vw4f2DyPZ91HLn6dK3VFOAQB24A6R1Yvo6duPlNbD0iQ5F3kraOGBARn0kBnrd8QsbzGkBWI+OUIiEVKLyJqGomxtTJqB0h5vQ92zXf/7Q1JqQ==', 40.7027585,	-74.1421899, null);

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
	VALUES ('zCttyOeNN1kdiOSLI5Qgxw==', 'gKxVviFhfPvPvXquprKfSA==', null, 'NMQNE6PUrDpvPa7s3IGo4g==', null, 'M', '1UL47ztekwel+OkzObvJcYwrxbK3feh7IgwrhBX1wDw=', '1995-07-06', 'EN', null, false);

INSERT INTO USERDATA (user_email, user_password, registration_date, registration_type, user_status, person_fk, rol_fk)
VALUES ('/Kn0WPj4TPeUK6NNcsZLbw==', '$2a$10$pyqO/LPmeR98I8nUtKey/Oq2PeMmMnc.BlnbWA5sr8Fz18f/42NAu', '2020-07-06', 'REGULAR', 'ACTIVE', 1, 2);

/*Commercial ally*/
INSERT INTO COMMERCIAL_ALLY (COMMERCIAL_ALLY_ID, NAME, EMAIL, PHONE_NUMBER, MANAGER_NAME, MANAGER_LAST_NAME, DESCRIPTION, STATUS)
VALUES ('de514f87-4f91-4de4-92ea-5799731338e3', 'wkouPpkT005+Ep85aWXR4A==', 'UMsEsb6BHZYNltgwprkVNK/YUFyXoL20RQPtx3WxBDg=', 'Krcly+RjTkiFbXGFR4oAj1/UlhyotONjUCzgarDu8Jk=', 'gKxVviFhfPvPvXquprKfSA==', 'NMQNE6PUrDpvPa7s3IGo4g==', 'xeFgnqh5cmgAZNlfP9dCFrixtcMKioQpnQjzFkUXSNI=', 'ACTIVE');
INSERT INTO WAREHOUSE (NAME, STATUS, COMMERCIAL_ALLY_FK, PLACE_FK)
VALUES ('Main Warehouse', 'ACTIVE', 'de514f87-4f91-4de4-92ea-5799731338e3', 13);
