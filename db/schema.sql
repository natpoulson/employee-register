DROP DATABASE IF EXISTS employee_register;
CREATE DATABASE employee_register;

USE employee_register;

CREATE TABLE department (
    id              INT unsigned NOT NULL AUTO_INCREMENT,
    name            VARCHAR(30) NOT NULL,
    PRIMARY KEY     (id)
);

CREATE TABLE role (
    id              INT unsigned NOT NULL AUTO_INCREMENT,
    title           VARCHAR(30) NOT NULL,
    salary          DECIMAL NOT NULL,
    department_id   INT unsigned,
    PRIMARY KEY     (id),
    FOREIGN KEY     (department_id)
        REFERENCES  department(id)
);

CREATE TABLE employee (
    id              INT unsigned NOT NULL AUTO_INCREMENT,
    first_name      VARCHAR(30) NOT NULL,
    last_name       VARCHAR(30) NOT NULL,
    role_id         INT unsigned,
    manager_id      INT unsigned,
    PRIMARY KEY     (id),
    FOREIGN KEY     (role_id)
        REFERENCES  role(id),
    FOREIGN KEY     (manager_id)
        REFERENCES  employee(id)
        ON DELETE SET NULL
);