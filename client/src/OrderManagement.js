import React, { useState, useEffect } from "react";
import "./style.css";


function OrderManagement({ ward, isAdmin }) {
  const [orders, setOrders] = useState([]);
  const [deleteOrderId, setDeleteOrderId] = useState();
  const [cancelOrderId, setCancelOrderId] = useState();
  const [update, setUpdate] = useState();

  const styles = {
    container: {
      padding: "1px",
      maxWidth: "700px",
      background: "#bcd0d6",
      borderRadius: "5px",
    },
    header: {
      paddingRight: "10px",
      color: "#6200ea",
      margin: "0px",
    },
    headerContainer: {
      padding: "5px",
      display: "flex",
      alignItems: "center",
      marginBottom: "0px",
    },
    listItem: {
      display: "flex",
      alignItems: "center",
      gap: "0px",
      padding: "0px",
      border: "0px solid #ddd",
      borderRadius: "0px",
      marginBottom: "0px",
    },
    paragraph: {
      padding: "2px",
      margin: "0",
      border: "1px solid #ddd",
    },
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${ward}`);
      let data = await response.json();
      data = data.sort((a, b) => a.id - b.id);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const deleteOrder = async (deleteOrderId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/orders/delete/${deleteOrderId}`,
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
        `http://localhost:3000/orders/${update}/${updateOrderId}`,
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
        <button onClick={fetchOrders}>Refresh</button>
      </div>
      <ul style={{ padding: 0, margin: 0, listStyleType: "none" }}>
        <li className="list-item">
          <p className="paragraph" style={{ width: "50px" }}>
            ID:
          </p>
          <p className="paragraph" style={{ width: "150px" }}>
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
            <p className="paragraph" style={{ width: "150px" }}>
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
