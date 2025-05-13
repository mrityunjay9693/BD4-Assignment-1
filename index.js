const express = require('express');
require("pg");
let cors = require('cors');
let sqlite3 = require('sqlite3').verbose();
let { open } = require('sqlite');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

let db;

(async () => {
  db = await open({
    filename: './bd4_assignment1_database.sqlite',
    driver: sqlite3.Database,
  });
})();
/**
 * Exercise 1: Get All Restaurants
 * Objective: Fetch all restaurants from the database.
 * Query Parameters: None
 * Tasks: Implement a function to fetch all restaurants.
 * Example Call: http://localhost:3000/restaurants
 */
//function to fetch all restaurants
async function fetchAllRestaurants() {
  let query = 'SELECT * FROM  restaurants';
  let response = await db.all(query, []);
  return { restaurants: response };
}

//Endpoint
app.get('/restaurants', async (req, res) => {
  try {
    let results = await fetchAllRestaurants();

    if (results.restaurants.length === 0) {
      return res.status(404).json({ message: 'No Restaurants Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 2: Get Restaurant by ID
 * Objective: Fetch a specific restaurant by its ID.
 * Query Parameters: id (integer)
 * Tasks: Implement a function to fetch a restaurant by its ID.
 * Example Call: http://localhost:3000/restaurants/details/1
 */
//function to fetch a specific restuarant by its id
async function fetchRestaurantsById(id) {
  let query = 'SELECT * FROM restaurants WHERE id = ?';
  let response = await db.all(query, [id]);
  return { restaurants: response };
}

//Endpoint
app.get('/restaurants/details/:id', async (req, res) => {
  let id = req.params.id;

  try {
    let results = await fetchRestaurantsById(id);

    if (results.restaurants.length === 0) {
      return res.status(404).json({ message: 'No Restaurants Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 3: Get Restaurants by Cuisine
 * Objective: Fetch restaurants based on their cuisine.
 * Query Parameters: cuisine (string)
 * Tasks: Implement a function to fetch restaurants by cuisine.
 * Example Call: http://localhost:3000/restaurants/cuisine/Indian
 */
//function to fetch restaurants by cuisine.
async function fetchRestaurantsByCuisine(cuisine) {
  let query = 'SELECT * FROM restaurants WHERE cuisine = ?';
  let response = await db.all(query, [cuisine]);
  return { restaurants: response };
}

//Endpoint
app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
  let cuisine = req.params.cuisine;

  try {
    let results = await fetchRestaurantsByCuisine(cuisine);
    if (results.restaurants.length === 0) {
      return res.status(404).json({ message: 'No Restaurants Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 4: Get Restaurants by Filter
 * Objective: Fetch restaurants based on filters such as veg/non-veg, outdoor seating, luxury, etc.
 * Query Parameters: i)isVeg (string)
                    ii)hasOutdoorSeating (string)
                   iii)isLuxury (string)
                   
 * Tasks: Implement a function to fetch restaurants by these filters.
 * Example Call: http://localhost:3000/restaurants/filter?isVeg=true&hasOutdoorSeating=true&isLuxury=false
 */
//function
async function fetchAllRestaurantsByFilters(
  isVeg,
  hasOutdoorSeating,
  isLuxury
) {
  let query =
    'SELECT * FROM restaurants WHERE isVeg = ? AND hasOutdoorSeating = ? AND isLuxury = ?';
  let response = await db.all(query, [isVeg, hasOutdoorSeating, isLuxury]);
  return { restaurants: response };
}

//Endpoint
app.get('/restaurants/filter', async (req, res) => {
  let isVeg = req.query.isVeg;
  let hasOutdoorSeating = req.query.hasOutdoorSeating;
  let isLuxury = req.query.isLuxury;

  try {
    let results = await fetchAllRestaurantsByFilters(
      isVeg,
      hasOutdoorSeating,
      isLuxury
    );
    if (results.restaurants.length === 0) {
      return res.status(404).json({ message: 'No Restaurants Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 5: Get Restaurants Sorted by Rating
 * Objective: Fetch restaurants sorted by their rating ( highest to lowest ).
 * Query Parameters: None
 * Tasks: Implement a function to fetch restaurants sorted by rating.
 * Example Call: http://localhost:3000/restaurants/sort-by-rating
 */
//function to fetch restaurants sorted by rating
async function fetchRestaurantsRating() {
  let query = 'SELECT * FROM restaurants ORDER BY rating DESC';
  let response = await db.all(query, []);
  return { restaurants: response };
}

//Endpoint
app.get('/restaurants/sort-by-rating', async (req, res) => {
  try {
    let results = await fetchRestaurantsRating();
    if (results.restaurants.length === 0) {
      return res.status(404).json({ message: 'No Restaurants Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 6: Get All Dishes
 * Objective: Fetch all dishes from the database.
 * Query Parameters: None
 * Tasks: Implement a function to fetch all dishes.
 * Example Call: http://localhost:3000/dishes
 */
async function fetchAllDishes() {
  let query = 'SELECT * FROM dishes';
  let response = await db.all(query, []);
  return { dishes: response };
}

//Endpoint
app.get('/dishes', async (req, res) => {
  try {
    let results = await fetchAllDishes();
    if (results.dishes.lenth === 0) {
      return res.status(404).json({ message: 'No Dishes Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 7: Get Dish by ID
 * Objective: Fetch a specific dish by its ID.
 * Query Parameters: id (integer)
 * Tasks: Implement a function to fetch a dish by its ID.
 * Example Call: http://localhost:3000/dishes/details/1
 */
//function to fetch dishes by id
async function fetchDishesById(id) {
  let query = 'SELECT * FROM dishes WHERE id =?';
  let response = await db.all(query, [id]);
  return { dishes: response };
}

//Endpoint
app.get('/dishes/details/:id', async (req, res) => {
  let id = req.params.id;

  try {
    let results = await fetchDishesById(id);
    if (results.dishes.length === 0) {
      return res.status(404).json({ message: 'No Dishes Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 8: Get Dishes by Filter
 * Objective: Fetch dishes based on filters such as veg/non-veg.
 * Query Parameters: isVeg
 * Tasks: Implement a function to fetch dishes by these filters.
 * Example Call: http://localhost:3000/dishes/filter?isVeg=true
 */
//function to fetch all dishes by isVeg
async function fetchDishesByFilter(isVeg) {
  let query = 'SELECT * FROM dishes WHERE isVeg = ?';
  let response = await db.all(query, [isVeg]);
  return { dishes: response };
}

//Endpoint
app.get('/dishes/filter', async (req, res) => {
  let isVeg = req.query.isVeg;
  try {
    let results = await fetchDishesByFilter(isVeg);
    if (results.dishes.length === 0) {
      return res.status(404).json({ message: 'No Dishes Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Exercise 9: Get Dishes Sorted by Price
 * Objective: Fetch dishes sorted by their price ( lowest to highest ).
 * Query Parameters: None
 * Tasks: Implement a function to fetch dishes sorted by price.
 * Example Call: http://localhost:3000/dishes/sort-by-price
 */
//function to get dishes sorted by price
async function fetchDishsesBySorted() {
  let query = 'SELECT * FROM dishes ORDER BY price';
  let response = await db.all(query, []);
  return { dishes: response };
}

//Endpoint
app.get('/dishes/sort-by-price', async (req, res) => {
  try {
    let results = await fetchDishsesBySorted();
    if (results.dishes.length === 0) {
      return res.status(404).json({ message: 'No Dishes Found.' });
    }
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log('Server running at port 3000');
});
