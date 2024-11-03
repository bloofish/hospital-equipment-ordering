import React, { useState, useEffect } from "react";
import "./style.css";


function OrderManagement({ ward, isAdmin , orders, fetchOrders}) {

    const ADDRESS = "http://192.168.1.154:3000";



  const deleteOrder = async (deleteOrderId) => {
    try {
      const response = await fetch(
        `${ADDRESS}/orders/delete/${deleteOrderId}`,
        { method: "DELETE" }
      );
      const data = await response.json();
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  //fetch post to change status of an order
  const updateOrder = async (updateOrderId, update) => {
    try {
      const response = await fetch(
        `${ADDRESS}/orders/${update}/${updateOrderId}`,
        { method: "POST" }
      );
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
    <div className="container">
      <div className="header-container">
        <h3 className="header">Ward {ward} orders</h3>
        <button onClick={() => fetchOrders()}>Refresh</button>
      </div>
      <ul style={{ padding: 0, margin: 0, listStyleType: "none" }}>
        <li className="list-item">
          <p className="paragraph" style={{ width: "50px" }}>
            ID:
          </p>
          <p className="paragraph" style={{ width: "200px" }}>
            Equipment:
          </p>
          <p className="paragraph" style={{ width: "100px" }}>
            Quantity:
          </p>
          <p className="paragraph" style={{ width: "100px" }}>
            Status:
          </p>
        </li>
        {orders.map((order) => (
          <li key={order.id} className="list-item">
            <p className="paragraph" style={{ width: "50px" }}>
              {order.id}
            </p>
            <p className="paragraph" style={{ width: "200px" }}>
              {order.equipment_name}
            </p>
            <p className="paragraph" style={{ width: "100px" }}>
              {order.quantity}
            </p>
            <p className="paragraph" style={{ width: "100px" }}>
              {order.status}
            </p>
            {order.status === "pending" && isAdmin === "1" && (
              <button onClick={() => updateOrder(order.id, "sent")}>
                Sent
              </button>
            )}
            {(order.status === "sent" || isAdmin === "1") && (
              <button onClick={() => updateOrder(order.id, "delivered")}>
                Delivered
              </button>
            )}
            {(order.status === "pending" || isAdmin === "1") && (
              <button onClick={() => updateOrder(order.id, "cancel")}>
                Cancel
              </button>
            )}
            {(order.status === "delivered" ||
              order.status === "cancel" ||
              isAdmin === "1") && (
              <button onClick={() => deleteOrder(order.id)}>Delete</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderManagement;
