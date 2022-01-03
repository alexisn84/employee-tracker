INSERT INTO department (name)
VALUES
    ('Custodial'),
    ('Sales'),
    ('Accounting');

INSERT INTO role (title, salary, department_id)
VALUES
    ('Janitor', 45000, 1),
    ('Sales Lead', 60000, 2),
    ('Sales Manager', 80000, 2),
    ('Billing', 75000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Sally', 'Baker', 4, null),
    ('Shawn', 'Johnson', 2, 3),
    ('Billy', 'Bob', 3, null),
    ('Mary', 'Colon', 1, null);
