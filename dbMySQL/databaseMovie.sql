create  TABLE movie(
id  BINARY(16) DEFAULT (UNHEX(REPLACE(UUID(), '-', '')))
title VARCHAR(255) not null,
yeara int NOT NULL,
director VARCHAR(255) not null,
duration int NOT null,
poster TEXT,
rate DECIMAL(2,1) unsigned not null,
genre
);

CREATE table genre(
id int auto_increment PRIMARY key,
name VARCHAR(255) not null UNIQUE,
);

create table movie_genres (
movie_id  BINARY(16) references movies(id),
genre_id int REFERENCES genre(id),
PRIMARY KEY (movie_id , genre_id)
);

insert into genre (name) values 
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Sci-Fi'),
('Romance')
;

INSERT INTO movie (id, title, yeara, director, duration, poster, rate) VALUES
(UNHEX(REPLACE(UUID(), '-', '')), 'The Avengers', 2012, 'Joss Whedon', 143, 'https://img.fruugo.com/product/7/41/14532417_max.jpg', 8.0),
(UNHEX(REPLACE(UUID(), '-', '')), 'Jurassic Park', 1993, 'Steven Spielberg', 127, 'https://vice-press.com/cdn/shop/products/Jurassic-Park-Editions-poster-florey.jpg?v=1654518755&width=1024', 8.1),
(UNHEX(REPLACE(UUID(), '-', '')), 'Titanic', 1997, 'James Cameron', 195, 'https://i.pinimg.com/originals/42/42/65/4242658e6f1b0d6322a4a93e0383108b.png', 7.8),
(UNHEX(REPLACE(UUID(), '-', '')), 'Interstellar', 2010, 'Christopher Nolan', 180, 'https://m.media-amazon.com/images/I/91obuWzA3XL._AC_UF1000,1000_QL80_.jpg', 8.8);


INSERT INTO movie_genres (movie_id, genre_id) VALUES
((SELECT id FROM movie WHERE title = 'The Avengers'), (SELECT id FROM genre WHERE name = 'Action')),
((SELECT id FROM movie WHERE title = 'The Avengers'), (SELECT id FROM genre WHERE name = 'Adventure')),
((SELECT id FROM movie WHERE title = 'The Avengers'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),

((SELECT id FROM movie WHERE title = 'Jurassic Park'), (SELECT id FROM genre WHERE name = 'Adventure')),
((SELECT id FROM movie WHERE title = 'Jurassic Park'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),

((SELECT id FROM movie WHERE title = 'Titanic'), (SELECT id FROM genre WHERE name = 'Drama')),
((SELECT id FROM movie WHERE title = 'Titanic'), (SELECT id FROM genre WHERE name = 'Romance')),

((SELECT id FROM movie WHERE title = 'Interstellar'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),
((SELECT id FROM movie WHERE title = 'Interstellar'), (SELECT id FROM genre WHERE name = 'Drama'))
;