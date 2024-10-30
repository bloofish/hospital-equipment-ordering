# hospital-equipment-ordering
Simple web app for hospital staff to order equipment.

hospitaldb setup

CREATE TABLE requests (
  id SERIAL PRIMARY KEY,
  ward_id INTEGER NOT NULL,
  equipment_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL
);
