import React, { useState } from "react";
import EquipmentForm from "./EquipmentForm";
import OrderManagement from "./OrderManagement";
import SignIn from "./SignIn";

function App() {
  const [wardId, setWardId] = useState(1);

  return (
    <div>
      <h1>Hospital Equipment Ordering</h1>
      <SignIn setWardId={setWardId} />
      <EquipmentForm ward={wardId} />
      <OrderManagement ward={wardId} />
    </div>
  );
}

export default App;
