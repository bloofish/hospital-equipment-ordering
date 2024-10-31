import React, { useState } from 'react';
import EquipmentForm from './EquipmentForm';
import OrderManagement from './OrderManagement';

function App() {
  const [wardId, setWardId] = useState('');

  return <div>
  <h1>Hospital Equipment Ordering</h1>
  <EquipmentForm setWardId={setWardId} />
  <OrderManagement ward={wardId} />
</div>;
}

export default App;