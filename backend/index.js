const express = require("express");
const pool = require("./db");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.get("/api/movies", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM movies");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// add a movie to movies
app.post("/api/movies", async (req, res) => {
  console.log("Received request to add movie:", req.body);
  try {
    const { movie_key, name, description, genres, rate, length, img } =
      req.body;
    const result = await pool.query(
      "INSERT INTO movies (movie_key, name, description, genres, rate, length, img) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [movie_key, name, description, genres, rate, length, img]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// get movie by id

app.get("/api/movies/:id", async (req, res) => {
  console.log("Get route hit with ID:", req.params.id);
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT id, movie_key, name, description, genres, rate, length FROM movies WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Movie not found");
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// delete movie
app.delete("/api/movies/:id", async (req, res) => {
  console.log("DELETE route hit with ID:", req.params.id);
  try {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM movies WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send("Movie not found");
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

app.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});
