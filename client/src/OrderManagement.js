import React, { useState, useEffect } from 'react';

function OrderManagement({ward}) {    
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:3000/orders/${ward}`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    if (ward) { //check ward exists before fetching
        fetchOrders();
      }
    }, [ward]); //dependency to rerun if ward changes

  return (
    <div>
      <h2>Order Management for Ward {ward}</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>Equipment: {order.equipment_name}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Status: {order.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderManagement;
