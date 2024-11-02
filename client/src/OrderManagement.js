import React, { useState, useEffect } from "react";

function OrderManagement({ ward, isAdmin }) {
  const [orders, setOrders] = useState([]);
  const [deleteOrderId, setDeleteOrderId] = useState();
  const [cancelOrderId, setCancelOrderId] = useState();
  const [update, setUpdate] = useState();



  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${ward}`);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };


  const deleteOrder = async (deleteOrderId) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/delete/${deleteOrderId}`, {method: "DELETE"}); 
      const data = await response.json();
      fetchOrders();
    } catch (error) {
        console.error("Error deleting order:", error);

    }
  };

  //fetch post to change status of an order
  const updateOrder = async (updateOrderId, update) => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${update}/${updateOrderId}`, {method: "POST"}); 
      const data = await response.json();
      fetchOrders();
    } catch (error) {
        console.error("Error updating order:", error);

    }
  };

  useEffect(() => {
    fetchOrders();
  }, [ward]);

  return (
    <div>
      <h2>Order Management for Ward {ward}</h2>
      <button onClick={fetchOrders}>Refresh</button>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <p>ID: {order.id}</p>
            <p>Equipment: {order.equipment_name}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Status: {order.status}</p>
            {(order.status == "pending" && isAdmin == "1") && (
            <button onClick={() => updateOrder(order.id, "sent")}>Sent</button>
            )}
            {(order.status == "sent" || isAdmin == "1") && (
            <button onClick={() => updateOrder(order.id, "delivered")}>Delivered</button>
            )}
            {(order.status == "pending" || isAdmin == "1") && (
            <button onClick={() => updateOrder(order.id, "cancel")}>Cancel</button>
            )}
            {(order.status == "delivered" || order.status == "cancel" || isAdmin == "1") && (
            <button onClick={() => deleteOrder(order.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderManagement;
