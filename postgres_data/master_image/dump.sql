CREATE SCHEMA registrator;

CREATE TABLE registrator.users(
    id SERIAL PRIMARY KEY,
    login TEXT,
    password VARCHAR(60),
    salt VARCHAR(29),
    token text,
    full_name TEXT
);


ALTER TABLE registrator.users ADD CONSTRAINT login_unq UNIQUE(login);



CREATE FUNCTION registrator.register(myLogin text, myPassword text, mySalt text, myName text)
RETURNS boolean
AS $$
DECLARE 
    res boolean;
BEGIN
    res := false;

    INSERT INTO registrator.users(login, password, salt, full_name)
        VALUES (myLogin, myPassword, mySalt, myName)
        ON CONFLICT DO NOTHING
        RETURNING true INTO res;
    RETURN res;
END; $$
LANGUAGE plpgsql SECURITY DEFINER;





CREATE FUNCTION registrator.salt_by_login(myLogin text)
RETURNS text
AS $$
DECLARE 
    res text;
BEGIN
    SELECT salt FROM registrator.users WHERE login = myLogin INTO res;
    RETURN res;
END; $$
LANGUAGE plpgsql SECURITY DEFINER;




CREATE FUNCTION registrator.login(myLogin text, myPassword text)
RETURNS text
AS $$
DECLARE 
    res text;
BEGIN
    UPDATE registrator.users SET token = MD5(NOW()::text) WHERE login = myLogin AND password = myPassword
    RETURNING token INTO res;
    RETURN res;
END; $$
LANGUAGE plpgsql SECURITY DEFINER;


CREATE FUNCTION registrator.check_token(myToken text)
RETURNS boolean 
AS $$
DECLARE
    res boolean;
BEGIN
    SELECT true FROM registrator.users WHERE token = myToken INTO res;
    RETURN res;
END; $$
LANGUAGE plpgsql SECURITY DEFINER;


GRANT USAGE ON SCHEMA registrator TO registrator;

GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA registrator TO registrator;



CREATE SCHEMA taskworker;

CREATE TABLE taskworker.message(
    id SERIAL PRIMARY KEY,
    sender_id integer REFERENCES registrator.users(id),
    to_id integer REFERENCES registrator.users(id),
    msg TEXT,
    date timestamp DEFAULT NOW()
);


CREATE TABLE taskworker.friend(
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES registrator.users(id),
    friend_id integer REFERENCES registrator.users(id)
);


CREATE FUNCTION taskworker.send_message(myToken text, myTo text, myMessage text)
RETURNS void
AS $$
DECLARE
    my_id integer;
    friend integer;
BEGIN   
    SELECT id FROM registrator.users WHERE token = myToken INTO my_id;
    SELECT id FROM registrator.users WHERE login = myTo INTO friend;

    IF coalesce(my_id, -1) = -1 OR coalesce(friend, -1) = -1 THEN
        RETURN;
    END IF;

    INSERT INTO taskworker.message(sender_id, to_id, msg)
    VALUES (my_id, friend, myMessage);
END; $$
LANGUAGE plpgsql SECURITY DEFINER;


CREATE FUNCTION taskworker.add_friend(myToken text, myLogin text)
RETURNS void
AS $$
DECLARE
    frinedid integer;
    my_id integer;
BEGIN
    SELECT id FROM registrator.users WHERE token = myToken INTO my_id;
    SELECT id FROM registrator.users WHERE login = myLogin INTO frinedid;

    IF coalesce(my_id, -1) = -1 OR coalesce(frinedid, -1) = -1 THEN
        RETURN;
    END IF;

    INSERT INTO taskworker.friend(user_id, friend_id)
    VALUES (my_id, frinedid);

END; $$
LANGUAGE plpgsql SECURITY DEFINER;

CREATE FUNCTION taskworker.delete_friend(myToken text, myFriend text)
RETURNS void
AS $$
    DECLARE
    frinedid integer;
    my_id integer;
BEGIN
    SELECT id FROM registrator.users WHERE token = myToken INTO my_id;
    SELECT id FROM registrator.users WHERE login = myFriend INTO frinedid;

    IF coalesce(my_id, -1) = -1 OR coalesce(frinedid, -1) = -1 THEN
        RETURN;
    END IF;

    DELETE FROM taskworker.friend WHERE user_id = my_id AND friend_id = frinedid;
END; $$
LANGUAGE plpgsql SECURITY DEFINER;


GRANT USAGE ON SCHEMA taskworker TO taskworker;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA taskworker TO taskworker;

GRANT USAGE ON SCHEMA taskworker TO selector;
GRANT USAGE ON SCHEMA registrator TO selector;
GRANT EXECUTE ON FUNCTION registrator.check_token(text) TO selector;
GRANT SELECT ON ALL TABLES IN SCHEMA registrator TO selector;
GRANT SELECT ON ALL TABLES IN SCHEMA taskworker TO selector;