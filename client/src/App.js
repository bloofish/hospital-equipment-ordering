import React, { useState } from "react";
import EquipmentForm from "./EquipmentForm";
import OrderManagement from "./OrderManagement";
import SignIn from "./SignIn";
import "./style.css";

function App() {
  const [wardId, setWardId] = useState(1);
  const [isAdmin, setIsAdmin] = useState(0);

  return (
    <div className="container">
      <h1>Hospital Equipment Ordering</h1>
      <SignIn setWardId={setWardId} setIsAdmin={setIsAdmin} />
      <EquipmentForm ward={wardId} />
      <OrderManagement ward={wardId} isAdmin={isAdmin} />
    </div>
  );
}

export default App;
