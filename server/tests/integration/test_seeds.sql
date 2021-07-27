TRUNCATE users, habits RESTART IDENTITY

INSERT INTO users (email, name, password_digest) 
VALUES
    ('user1@email.co.uk', 'User1', '')
    ('user2@email.co.uk', 'User2', '')
    ('user3@email.co.uk', 'User3', '')
    

INSERT INTO habits (email, habit_name, habit_description, habit_frequency, frequency_target, streak) 
VALUES
    ('user1@email.co.uk', 'Test habit 1', 'Test habit 1 description', 'daily', 1, 0),
    ('user2@email.co.uk', 'Test habit 2', 'Test habit 2 description', 'weekly', 2, 0),
    ('user3@email.co.uk', 'Test habit 3', 'Test habit 3 description', 'monthly', 3, 0),
