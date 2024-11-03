import React, { useState , useEffect} from "react";
import EquipmentForm from "./EquipmentForm";
import OrderManagement from "./OrderManagement";
import SignIn from "./SignIn";
import "./style.css";

const ADDRESS = "http://192.168.1.154:3000";

function App() {
  const [wardId, setWardId] = useState(1);
  const [isAdmin, setIsAdmin] = useState(0);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${ADDRESS}/orders/${wardId}`);
      let data = await response.json();
      data = data.sort((a, b) => a.id - b.id);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [wardId]);

  return (
    <div className="container">
      <h1 style={{paddingLeft: "5px"}}>Hospital Equipment Ordering</h1>
      <SignIn setWardId={setWardId} setIsAdmin={setIsAdmin} />
      <EquipmentForm ward={wardId} fetchOrders={fetchOrders} />
      <OrderManagement ward={wardId} isAdmin={isAdmin} orders={orders} fetchOrders={fetchOrders}/>
    </div>
  );
}

export default App;
