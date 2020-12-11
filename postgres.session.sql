INSERT INTO auth_user (
    id,
    password,
    last_login,
    is_superuser,
    username,
    first_name,
    last_name,
    email,
    is_staff,
    is_active,
    date_joined
  )
VALUES (
    id:integer,
    'password:character varying',
    'last_login:timestamp with time zone',
    is_superuser:boolean,
    'username:character varying',
    'first_name:character varying',
    'last_name:character varying',
    'email:character varying',
    is_staff:boolean,
    is_active:boolean,
    'date_joined:timestamp with time zone'
  );