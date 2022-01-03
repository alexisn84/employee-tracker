INSERT INTO department (name)
VALUES
    ('Custodial'),
    ('Sales'),
    ('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Janitor', 45000, 152),
    ('Sales Lead', 60000, 250),
    ('Sales Manager', 80000, 275),
    ('A/R', 75000, 840);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ('Sally', 'Baker', 5);
