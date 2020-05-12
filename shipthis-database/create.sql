CREATE TABLE rol(
    rol_id SERIAL,
    rol_name VARCHAR(100),

    CONSTRAINT pk_rol PRIMARY KEY (rol_id)
);

CREATE TABLE userdata(
    user_id SERIAL,
    user_email VARCHAR(100) NOT NULL,
    user_password VARCHAR(100) NOT NULL,
    registration_date DATE NOT NULL,
    user_status VARCHAR(50) NOT NULL,
    rol_id_fk INTEGER NOT NULL,

    CONSTRAINT pk_user PRIMARY KEY (user_id),
    CONSTRAINT validate_status_user CHECK (user_status IN ('active','blocked','reseted')),
    CONSTRAINT user_fk_rol FOREIGN KEY (rol_id_fk) REFERENCES rol (rol_id) ON DELETE CASCADE
);

CREATE TABLE person(
    person_id SERIAL,
    user_fk INTEGER NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    second_last_name VARCHAR(100),
    phone_code INTEGER,
    phone_number INTEGER,
    date_of_birth DATE NOT NULL,
    current_conn_date DATE,
    previous_conn_date DATE,
    def_language VARCHAR(20),
    profile_picture BYTEA,
    receive_notifications BOOLEAN DEFAULT FALSE,

    CONSTRAINT pk_person PRIMARY KEY (person_id, user_fk),
    CONSTRAINT person_fk_user FOREIGN KEY (user_fk) REFERENCES userdata (user_id) ON DELETE CASCADE
);

CREATE TABLE place(
    place_id SERIAL,
    place_address VARCHAR(200),
    position_lat NUMERIC,
    position_long NUMERIC,
    zip_code INTEGER,

    CONSTRAINT pk_place PRIMARY KEY (place_id)
);

CREATE TABLE category(
    category_id SERIAL,
    categoty_name VARCHAR(200) NOT NULL,

    CONSTRAINT pk_category PRIMARY KEY (category_id)
);

CREATE TABLE item_type(
    item_type_id SERIAL,
    item_name VARCHAR(100) NOT NULL,
    max_weight INTEGER NOT NULL,
    max_volume INTEGER NOT NULL,
    item_type_status VARCHAR(50) NOT NULL,
    category_fk INTEGER NOT NULL,

    CONSTRAINT pk_item_type PRIMARY KEY (item_type_id),
    CONSTRAINT validate_status_item CHECK (item_type_status IN ('active','block')),
    
    CONSTRAINT item_type_fk_category FOREIGN KEY (category_fk) REFERENCES category (category_id) ON DELETE CASCADE
);

CREATE TABLE item_price_hist(
    item_type_fk INTEGER NOT NULL,
    starting_date DATE NOT NULL,
    ending_date DATE,
    base_price NUMERIC NOT NULL,
    price_km NUMERIC NOT NULL,
    ensurance_tax NUMERIC NOT NULL,
    fragily_tax NUMERIC NOT NULL,

    CONSTRAINT item_price_hist_pk PRIMARY KEY (item_type_fk,starting_date),
    CONSTRAINT item_hist_fk_item_type FOREIGN KEY (item_type_fk) REFERENCES item_type (item_type_id) ON DELETE CASCADE
);

CREATE TABLE order_type(
    order_type_id SERIAL,
    order_name VARCHAR(100) NOT NULL,
    days_to_deliver INTEGER NOT NULL,
    order_type_status VARCHAR(50) NOT NULL,
    category_fk INTEGER NOT NULL,

    CONSTRAINT pk_order_type PRIMARY KEY (order_type_id),
    CONSTRAINT validate_status_order_type CHECK (order_type_status IN ('active','block')),
    CONSTRAINT order_type_fk_category FOREIGN KEY (category_fk) REFERENCES category (category_id) ON DELETE CASCADE
);


CREATE TABLE order_price_hist(
    order_type_fk INTEGER NOT NULL,
    starting_date DATE NOT NULL,
    ending_date DATE,
    time_tax NUMERIC NOT NULL,
    ensurance_tax NUMERIC NOT NULL,
    fragily_tax NUMERIC NOT NULL,

    CONSTRAINT order_price_hist_pk PRIMARY KEY (order_type_fk,starting_date),
    CONSTRAINT order_hist_fk_order_type FOREIGN KEY (order_type_fk) REFERENCES order_type (order_type_id) ON DELETE CASCADE
);

CREATE TABLE office(
    office_id SERIAL,
    office_name VARCHAR(100) NOT NULL,
    phone_code VARCHAR(10) NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    place_fk INTEGER NOT NULL,
    office_status VARCHAR(50) NOT NULL,

    CONSTRAINT office_pk PRIMARY KEY (office_id),
    CONSTRAINT office_fk_place FOREIGN KEY (place_fk) REFERENCES place (place_id) ON DELETE CASCADE,
    CONSTRAINT validate_status_office CHECK (office_status IN ('active','block'))
);

CREATE TABLE ordersheet(
    order_id SERIAL,
    person_fk INTEGER NOT NULL,
    user_fk INTEGER NOT NULL,
    origin_office_fk INTEGER NOT NULL,
    order_type_fk INTEGER NOT NULL,
    order_type_date_fk DATE NOT NULL,
    tracking_number VARCHAR(20) NOT NULL UNIQUE,
    creation_date DATE NOT NULL,
    order_status VARCHAR(20) NOT NULL,
    rec_fullname VARCHAR(100) NOT NULL,
    rec_phone_code VARCHAR(10),
    rec_phone_number VARCHAR(10),
    delivery_date DATE,
    date_to_be_delivered DATE,
    ignore_hollydays BOOLEAN DEFAULT FALSE,
    destination_office_fk INTEGER,
    destination_place_fk INTEGER,

    CONSTRAINT order_pk PRIMARY KEY (order_id,person_fk,user_fk,origin_office_fk),
    CONSTRAINT order_fk_person FOREIGN KEY (person_fk,user_fk) REFERENCES person (person_id,user_fk) ON DELETE CASCADE,
    CONSTRAINT order_fk_origin_office FOREIGN KEY (origin_office_fk) REFERENCES office (office_id) ON DELETE CASCADE,
    CONSTRAINT order_type_fk_order FOREIGN KEY (order_type_fk,order_type_date_fk) REFERENCES order_price_hist (order_type_fk,starting_date) ON DELETE CASCADE,
    CONSTRAINT order_fk_destination_office FOREIGN KEY (destination_office_fk) REFERENCES office (office_id) ON DELETE CASCADE,
    CONSTRAINT order_fk_destination_place FOREIGN KEY (destination_place_fk) REFERENCES place (place_id) ON DELETE CASCADE,
    CONSTRAINT validate_status_order CHECK (order_status IN ('delivery','transit','delivered'))
);

CREATE TABLE item(
    item_id SERIAL,
    order_id_fk INTEGER NOT NULL,
    order_person_fk INTEGER NOT NULL,
    order_user_fk INTEGER NOT NULL,
    office_fk INTEGER NOT NULL,
    item_type_fk INTEGER NOT NULL,
    item_price_date_fk DATE NOT NULL,
    item_weight NUMERIC,
    item_volumen NUMERIC,
    is_insured BOOLEAN DEFAULT FALSE,
    is_fragile BOOLEAN DEFAULT FALSE,
    facturation_date DATE,
    facturation_amount NUMERIC,

    CONSTRAINT item_pk PRIMARY KEY (item_id,order_id_fk,order_person_fk,order_user_fk,office_fk,item_type_fk,item_price_date_fk),
    CONSTRAINT item_fk_order FOREIGN KEY (order_id_fk,order_person_fk,order_user_fk,office_fk) REFERENCES ordersheet (order_id,person_fk,user_fk,origin_office_fk) ON DELETE CASCADE,
    CONSTRAINT item_fk_item_type FOREIGN KEY (item_type_fk,item_price_date_fk) REFERENCES item_price_hist (item_type_fk,starting_date) ON DELETE CASCADE
);

CREATE TABLE trajectory(
    trajectory_id SERIAL,
    order_id_fk INTEGER NOT NULL,
    order_person_fk INTEGER NOT NULL,
    order_user_fk INTEGER NOT NULL,
    office_fk INTEGER NOT NULL,
    linear_distance NUMERIC,
    efective_distance NUMERIC,
    
    CONSTRAINT trajectory_pk PRIMARY KEY (trajectory_id),
    CONSTRAINT trajectory_fk_ordersheet FOREIGN KEY (order_id_fk,order_person_fk,order_user_fk,office_fk) REFERENCES ordersheet (order_id,person_fk,user_fk,origin_office_fk) ON DELETE CASCADE
);

CREATE TABLE check_point(
    trajectory_fk INTEGER NOT NULL,
    check_point_order INTEGER NOT NULL,
    place_fk INTEGER NOT NULL,
    time_mark TIMESTAMP,

    CONSTRAINT check_point_pk PRIMARY KEY (trajectory_fk, check_point_order),
    CONSTRAINT check_point_fk_trajectory FOREIGN KEY (trajectory_fk) REFERENCES trajectory (trajectory_id) ON DELETE CASCADE,
    CONSTRAINT check_point_fk_place FOREIGN KEY (place_fk) REFERENCES place (place_id) ON DELETE CASCADE
);

CREATE TABLE comment_box(
    comment_id SERIAL,
    time_mark TIMESTAMP NOT NULL,
    comment_message VARCHAR(500) NOT NULL,

    CONSTRAINT comment_pk PRIMARY KEY (comment_id)
);
