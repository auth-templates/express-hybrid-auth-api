\connect flexible_leaves

\echo 'Wiping out existing data from all tables...'
TRUNCATE TABLE leave_requests, leave_balances, leave_types, users RESTART IDENTITY CASCADE;

\echo 'Importing data into users table...'
\copy users(id, name, email, password_hash, role, created_at) FROM '/data/users.csv' WITH (FORMAT csv, HEADER true);

\echo 'Importing data into leave_types table...'
\copy leave_types(id, name, description, created_at) FROM '/data/leave_types.csv' WITH (FORMAT csv, HEADER true);

\echo 'Importing data into leave_requests table...'
\copy leave_requests(id, user_id, leave_type_id, start_date, end_date, status, reason, created_at) FROM '/data/leave_requests.csv' WITH (FORMAT csv, HEADER true);

\echo 'Importing data into leave_balances table...'
\copy leave_balances(id, user_id, leave_type_id, balance, updated_at) FROM '/data/leave_balances.csv' WITH (FORMAT csv, HEADER true);
