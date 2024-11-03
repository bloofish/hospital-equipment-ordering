const express = require("express");
const cors = require("cors");
const app = express();
const { Pool } = require("pg");
const validator = require("validator"); // New validation library
require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json()); //parsing json

app.use(
  cors({
    origin: true, //allow requests from all connections
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

app.get("/orders/:ward", async (req, res) => {
  let ward = validator.toInt(String(req.params.ward)); //validating input
  if (!Number.isInteger(ward)) {
    return res.status(400).json({ message: "Invalid input" });
  }
  try {
    const query = "SELECT * FROM requests WHERE ward_id =$1";
    const values = [ward];
    const result = await pool.query(query, values);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to retrieve orders" });
  }
});

app.post("/submit-request", async (req, res) => {
  let { ward_id, equipment_name, quantity } = req.body;

  ward_id = validator.toInt(String(ward_id));
  equipment_name = validator.escape(validator.trim(equipment_name));
  quantity = validator.toInt(String(quantity));

  if (!Number.isInteger(ward_id) || !Number.isInteger(quantity) || !equipment_name) {
    return res.status(400).json({ message: "Invalid input"});
  }

  try {
    //construct query to be sent to db, asking for response
    const query =
      "INSERT INTO requests (ward_id, equipment_name, quantity, status) VALUES ($1, $2, $3, $4) RETURNING *"; //not secure?
    const values = [ward_id, equipment_name, quantity, "pending"];
    //send query and save response
    const result = await pool.query(query, values);
    //respond to client with result
    res.status(201).json({
      message: "Request submitted successfully",
      request: result.rows[0],
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ message: "Failed to submit request to database" });
  }
});

app.delete("/orders/delete/:id", async (req, res) => {
  let id = validator.toInt(String(req.params.id)); //validating input
  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "Invalid input" });
  }
  try {
    const query = "DELETE FROM requests WHERE id = $1 RETURNING *";
    const values = [id];
    const result = await pool.query(query, values);
    res.status(200).json({
      message: "Request deleted successfully",
      request: result,
    });
  } catch (error) {
    console.error("Error deleting:", error);
    res.status(500).json({ message: "Failed to delete data" });
  }
});

//used to update the status of a specific table id
app.post("/orders/:update/:id", async (req, res) => {
  let { update, id } = req.params;
  update = validator.escape(validator.trim(update));
  id = validator.toInt(String(id));

  if (!Number.isInteger(id) || !update) {
    return res.status(400).json({ message: "Invalid input"});
  }
  try {
    const query = "UPDATE requests SET status = $1 WHERE id = $2 RETURNING *";
    const values = [update, id];
    const result = await pool.query(query, values);
    res.status(200).json({
      message: "Order updated successfully",
      request: result,
    });
  } catch (error) {
    console.error("Error updating:", error);
    res.status(500).json({ message: "Failed to update" });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

//running the server on localhost
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://192.168.1.154:${PORT}`);
});
