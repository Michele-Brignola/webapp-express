const connection = require("../database/conn");
const {
  handleFailedQuery,
  handleResourceNotFound,
} = require("../utils/database");

function index(req, res) {
  const moviesSQL = `
  SELECT
    movies.*,
    AVG(reviews.vote) AS avg_vote
  FROM
    movies
    INNER JOIN reviews ON movies.id = reviews.movie_id
  GROUP BY
    movies.id;`;
  connection.query(moviesSQL, (err, result) => {
    if (err) return handleFailedQuery(err, res);
    res.json({ result });
  });
}

function show(req, res) {
  const { id } = req.params;
  const movieSQL = "SELECT * FROM movies WHERE id = ?";
  connection.query(movieSQL, [id], (err, movieRes) => {
    if (err) return handleFailedQuery(err, res);
    const [movie] = movieRes;
    if (!movie) return handleResourceNotFound();

    const reviewSQL = "SELECT * FROM reviews WHERE movie_id = ?";
    connection.query(reviewSQL, [id], (err, reviewsRes) => {
      if (err) return handleFailedQuery(err, reviewsRes);
      movie.reviews = reviewsRes;
      movie.image = buildMovieImgPath(movie.image);
      res.json({ result: movie });
    });
  });
}

function store(req, res) {
  res.json({ message: "WIP" });
}

function storeReview(req, res) {
  const { id } = req.params;
  const { name, vote, text } = req.body;

  const storeReviewSQL = `
    INSERT INTO movies.reviews (movie_id, name, vote, text)
    VALUES (?, ?, ?, ?)
  `;

  connection.query(storeReviewSQL, [id, name, vote, text], (err, resultStore) => {
    if (err) return res.status(500).json({ error: err.message });

    const showReviewSQL = `SELECT * FROM reviews WHERE id = ?`;
    connection.query(showReviewSQL, [resultStore.insertId], (err, resultShow) => {
      if (err) return res.status(500).json({ error: err.message });
      const [review] = resultShow;
      res.json(review);
    });
  });
}

function update(req, res) {
  res.json({ message: "WIP" });
}

function modify(req, res) {
  res.json({ message: "WIP" });
}

function destroy(req, res) {
  res.json({ message: "WIP" });
}

module.exports = { index, show, store, storeReview, update, modify, destroy };

function buildMovieImgPath(image) {
  return process.env.APP_URL + ":" + process.env.APP_PORT + "/img/" + image;
}
