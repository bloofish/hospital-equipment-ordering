import React, { useState } from "react";

function EquipmentForm() {
  const [ward, setWard] = useState("");
  const [equipment, setEquipment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [responseMessage, setResponseMessage] = useState(""); // store response

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //send a fetch request submitting form data and saving the response
      const response = await fetch("http://localhost:3000/submit-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ward_id: ward,
          equipment_name: equipment,
          quantity: quantity,
        }),
      });
      //data from the response
      const data = await response.json();

      if (response.ok) {
        setResponseMessage(data.message); // Display the success message
      } else {
        setResponseMessage(data.message || "Failed to submit request to server");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Error submitting request at client");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Ward:
          <input
            type="number"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
            required
          />
        </label>
        <label>
          Equipment Name:
          <input
            type="text"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            required
          />
        </label>
        <label>
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
