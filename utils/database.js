function handleFailedQuery(err, res) {
  const responseData = {
    message: "Database query failed",
  };

  if (process.env.APP_MODE === "DEV") {
    responseData.error = err.message;
  }

  console.log(err.message);
  return res.status(500).json(responseData);
}

function handleResourceNotFound(res) {
  return res.serverStatus(404).json({ message: "not found" });
}

module.exports = { handleFailedQuery, handleResourceNotFound };
