CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(50) NOT NULL,
    price_range INT CHECK (price_range >= 1 AND price_range <= 5)
);

CREATE TABLE reviews (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    restaurant_id BIGINT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id),
    name VARCHAR(50) NOT NULL,
    review text NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5)
);

select *
from restaurants
    left join(
        select restaurant_id,
            count(*),
            TRUNC(AVG(rating, 1)) as average_rating
        from reviews
        group by restaurant_id
    ) reviews on restaurants.id = reviews.restaurant_id;