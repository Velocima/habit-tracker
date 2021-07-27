INSERT INTO users (email, name, password_digest) 
VALUES
    ('polina@polina.com', 'Polina', 'a1b2c3d4e5f6jkl'),
    ('ridwan@ridwan.co.uk', 'Ridwan', 'f1g2h3j4k5lavsb'),
    ('max@max.co.uk', 'Max', '1w2e3r4t5y6u7i');


INSERT INTO habits (id, email, habit_name, habit_description, habit_frequency, frequency_target) 
VALUES
    (1, 'polina@polina.com', 'Drink 2 litres of water', 'I need to get enough water daily, 2 litres is an optimal amount', 'daily', 1),
    (2, 'ridwan@ridwan.co.uk', 'Running 5k', 'I want to run 5k once a week', 'weekly', 1),
    (3, 'ridwan@ridwan.co.uk', '8 hours of sleep', 'I want get 8 hours of sleep to feel healthy', 'daily', 1),
    (4, 'max@max.co.uk', 'Eat 5 portions of fruit and veg', 'I need to eat anought fibre in the form of 5 portions of fruit and veg', 'daily', 1);

INSERT INTO completions (completion_date, habit_id)
VALUES
    (1627377751, 1),
    (1627200409, 2),
    (1626595609, 3),
    (1625120110, 4);