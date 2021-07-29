INSERT INTO users (email, name, password_digest) 
VALUES
    ('polina@polina.com', 'Polina', 'a1b2c3d4e5f6jkl'),
    ('ridwan@ridwan.co.uk', 'Ridwan', 'f1g2h3j4k5lavsb'),
    ('max@max.co.uk', 'Max', '1w2e3r4t5y6u7i');


INSERT INTO habits (email, habit_name, habit_description, habit_frequency, frequency_target) 
VALUES
    ('polina@polina.com', 'Drink a glass of water', 'Drink a glass of water 10 times daily', 'daily', 10),
    ('ridwan@ridwan.co.uk', 'Running 5k', 'Run 5k once a week', 'weekly', 1),
    ('ridwan@ridwan.co.uk', '8 hours of sleep', 'Sleep 8 hours daily', 'daily', 1),
    ('max@max.co.uk', 'Eat 5 portions of fruit and veg', 'Eat 5 portioms of fruit and veg daily', 'daily', 1);

INSERT INTO completions (completion_date, habit_id)
VALUES
    ('2021-07-19', 1),
    ('2021-07-21', 2),
    ('2021-07-23', 3),
    ('2021-07-25', 4);