import React, { useState } from "react";
import "./style.css";

function EquipmentForm({ward, fetchOrders}) {
  const [equipment, setEquipment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [responseMessage, setResponseMessage] = useState(""); // store response

  const ADDRESS = "http://192.168.1.154:3000";

  
  const sanitizeInput = (input) => {
    return input.replace(/[^\w\s]/gi, "").trim(); // alphanumeric only
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanEquipment = sanitizeInput(equipment);
    const sanQuantity = Math.abs(parseInt(quantity, 10));

    if (!sanEquipment || sanQuantity <= 0) {
      setResponseMessage("Invalid input: Check equipment name or quantity.");
      return;
    }

    try {
      //send a fetch request submitting form data and saving the response
      const response = await fetch(`${ADDRESS}/submit-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },  
        body: JSON.stringify({
          ward_id: ward,
          equipment_name: sanEquipment,
          quantity: sanQuantity,
        }),
      });
      //data from the response
      const data = await response.json();

      if (response.ok) {
        fetchOrders();
        setResponseMessage("");
      } else {
        setResponseMessage(data.message || "Failed to submit request to server");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Error submitting request at client");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="list-item"> 
        <label className="paragraph">
          Equipment Name:
          <input
            type="text"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            required
          />
        </label>
        <label className="paragraph">
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
        </label>
        <button type="submit">Submit Request</button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default EquipmentForm;
