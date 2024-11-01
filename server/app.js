const express = require("express");
const cors = require("cors");
const app = express();
const { Pool } = require("pg");
require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json()); //parsing json

app.use(
  cors({
    origin: "http://localhost:3001", //allow requests from 3001 FIX THIS
  })
);

//db connection Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get('/orders/:ward', async (req, res) => {
  const {ward} = req.params;
  try{
    const query = 'SELECT * FROM requests WHERE ward_id =$1';
    const values = [ward];
    const result = await pool.query(query, values);

    res.status(200).json(result.rows);
  }
  catch(error){
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to retrieve orders' });
  }
})

app.post("/submit-request", async (req, res) => {

  const { ward_id, equipment_name, quantity } = req.body;

  if (!Number.isInteger(Number(ward_id)) || !Number.isInteger(Number(quantity))) {
    return res.status(400).json({ message: 'Invalid. ward_id and quantity must be numbers' });
  }

  try {
    //construct query to be sent to db, asking for response
    const query =
      "INSERT INTO requests (ward_id, equipment_name, quantity, status) VALUES ($1, $2, $3, $4) RETURNING *"; //not secure?
    const values = [ward_id, equipment_name, quantity, "pending"];
    //send query and save response
    const result = await pool.query(query, values);
    //respond to client with result
    res
      .status(201)
      .json({
        message: "Request submitted successfully",
        request: result.rows[0],
      });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Failed to submit request to database" });
  }
});

app.delete("/orders/delete/:id", async (req, res) => {
  const { id } = req.params;
  try{
    const query = "DELETE FROM requests WHERE id = $1 RETURNING *";
    const values = [id];
    const result = await pool.query(query, values);
    res
      .status(200)
      .json({
        message: "Request deleted successfully",
        request: result,
      });
  }
  catch(error){
    console.error("Error deleting:", error);
    res.status(500).json({message: "Failed to delete data"});
  }
})

app.post("/orders/:update/:id", async (req, res) => {
  const { update, id } = req.params;
  try{
    const query = "UPDATE requests SET status = $1 WHERE id = $2 RETURNING *";
    const values = [update, id];
    const result = await pool.query(query, values);
    res
      .status(200)
      .json({
        message: "Order updated successfully",
        request: result,
      });
  }
  catch(error){
    console.error("Error updating:", error);
    res.status(500).json({message: "Failed to update"});
  }
})

app.get("/", (req, res) => {
  res.send("Server is running");
});

//running the server on localhost
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
