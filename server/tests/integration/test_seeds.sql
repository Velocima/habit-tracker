TRUNCATE users, habits RESTART IDENTITY

INSERT INTO users (username, email, password_digest) 
VALUES
    ('user@emailaddress.co.uk', '')
    

INSERT INTO habits (email, habit_name, habit_description, habit_frequency, frequency_target, streak) 
VALUES
    ('user@emailaddress.co.uk', 'Test habit 1', 'Test habit 1 description', 'test frequency', 1, 0),
    